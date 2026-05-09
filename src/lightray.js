import { Renderer, Program, Triangle, Mesh } from 'ogl';

export class LightRaysNative {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            raysColor: options.raysColor || '#ffffff',
            raysSpeed: options.raysSpeed || 1.0,
            lightSpread: options.lightSpread || 0.5,
            rayLength: options.rayLength || 3.0,
            mouseInfluence: options.mouseInfluence || 0.1,
            ...options
        };
        this.mouse = { x: 0.5, y: 0.5 };
        this.smoothMouse = { x: 0.5, y: 0.5 };
        this.init();
    }

    hexToRgb(hex) {
        const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
    }

    init() {
        this.renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
        this.gl = this.renderer.gl;
        this.container.appendChild(this.gl.canvas);

        const vert = `attribute vec2 position; varying vec2 vUv; void main() { vUv = position * 0.5 + 0.5; gl_Position = vec4(position, 0.0, 1.0); }`;
        const frag = `
            precision highp float;
            uniform float iTime, raysSpeed, lightSpread, rayLength, mouseInfluence;
            uniform vec2 iResolution, rayPos, rayDir, mousePos;
            uniform vec3 raysColor;
            float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
                vec2 sourceToCoord = coord - raySource;
                vec2 dirNorm = normalize(sourceToCoord);
                float cosAngle = dot(dirNorm, rayRefDirection);
                float spreadFactor = pow(max(cosAngle, 0.0), 1.0 / max(lightSpread, 0.001));
                float dist = length(sourceToCoord);
                float falloff = clamp((iResolution.x * rayLength - dist) / (iResolution.x * rayLength), 0.0, 1.0);
                float base = clamp((0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) + (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)), 0.0, 1.0);
                return base * falloff * spreadFactor;
            }
            void main() {
                vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
                vec2 finalRayDir = rayDir;
                if (mouseInfluence > 0.0) {
                    finalRayDir = normalize(mix(rayDir, normalize((mousePos * iResolution.xy) - rayPos), mouseInfluence));
                }
                float r1 = rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
                float r2 = rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);
                gl_FragColor = vec4(raysColor, (r1 * 0.5 + r2 * 0.4) * 0.8);
            }
        `;

        this.uniforms = {
            iTime: { value: 0 },
            iResolution: { value: [0, 0] },
            rayPos: { value: [0, 0] },
            rayDir: { value: [0, 1] },
            raysColor: { value: this.hexToRgb(this.options.raysColor) },
            raysSpeed: { value: this.options.raysSpeed },
            lightSpread: { value: this.options.lightSpread },
            rayLength: { value: this.options.rayLength },
            mousePos: { value: [0.5, 0.5] },
            mouseInfluence: { value: this.options.mouseInfluence }
        };

        this.program = new Program(this.gl, { vertex: vert, fragment: frag, uniforms: this.uniforms, transparent: true });
        this.mesh = new Mesh(this.gl, { geometry: new Triangle(this.gl), program: this.program });

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.mouse.x = (e.clientX - rect.left) / rect.width;
            this.mouse.y = (e.clientY - rect.top) / rect.height;
        });

        this.resize();
        requestAnimationFrame((t) => this.render(t));
    }

    resize() {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        if (!w || !h) return;
        this.renderer.setSize(w, h);
        this.uniforms.iResolution.value = [w * this.renderer.dpr, h * this.renderer.dpr];
        this.uniforms.rayPos.value = [w * this.renderer.dpr * 0.5, -h * this.renderer.dpr * 0.2];
    }

    render(t) {
        this.uniforms.iTime.value = t * 0.001;
        this.smoothMouse.x += (this.mouse.x - this.smoothMouse.x) * 0.08;
        this.smoothMouse.y += (this.mouse.y - this.smoothMouse.y) * 0.08;
        this.uniforms.mousePos.value = [this.smoothMouse.x, this.smoothMouse.y];
        this.renderer.render({ scene: this.mesh });
        requestAnimationFrame((t) => this.render(t));
    }
}
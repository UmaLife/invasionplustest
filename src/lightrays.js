// lightrays.js
class LightRays {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.props = {
            raysOrigin: options.raysOrigin || 'top-center',
            raysColor: options.raysColor || '#ffffff',
            raysSpeed: options.raysSpeed || 1,
            lightSpread: options.lightSpread || 1,
            rayLength: options.rayLength || 2,
            pulsating: options.pulsating || false,
            fadeDistance: options.fadeDistance || 1.0,
            saturation: options.saturation || 1.0,
            followMouse: options.followMouse !== undefined ? options.followMouse : true,
            mouseInfluence: options.mouseInfluence || 0.1,
            noiseAmount: options.noiseAmount || 0.0,
            distortion: options.distortion || 0.0,
        };

        this.mouse = { x: 0.5, y: 0.5 };
        this.smoothMouse = { x: 0.5, y: 0.5 };
        this.init();
    }

    hexToRgb(hex) {
        const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
    }

    getAnchorAndDir(origin, w, h) {
        const outside = 0.2;
        switch (origin) {
            case 'top-left': return { anchor: [0, -outside * h], dir: [0, 1] };
            case 'top-right': return { anchor: [w, -outside * h], dir: [0, 1] };
            case 'left': return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
            case 'right': return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
            case 'bottom-left': return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
            case 'bottom-center': return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
            case 'bottom-right': return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
            default: return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
        }
    }

    async init() {
        if (typeof ogl === 'undefined') {
            await import('https://unpkg.com/ogl');
        }

        const { Renderer, Program, Triangle, Mesh } = ogl;

        this.renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
        const gl = this.renderer.gl;
        this.container.appendChild(gl.canvas);

        const vert = `attribute vec2 position;varying vec2 vUv;void main(){vUv=position*0.5+0.5;gl_Position=vec4(position,0.0,1.0);}`;
        const frag = `
            precision highp float;
            uniform float iTime;
            uniform vec2 iResolution;
            uniform vec2 rayPos;
            uniform vec2 rayDir;
            uniform vec3 raysColor;
            uniform float raysSpeed;
            uniform float lightSpread;
            uniform float rayLength;
            uniform float pulsating;
            uniform float fadeDistance;
            uniform float saturation;
            uniform vec2 mousePos;
            uniform float mouseInfluence;
            uniform float noiseAmount;
            uniform float distortion;
            varying vec2 vUv;

            float noise(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }

            float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
                vec2 sourceToCoord = coord - raySource;
                vec2 dirNorm = normalize(sourceToCoord);
                float cosAngle = dot(dirNorm, rayRefDirection);
                float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
                float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));
                float distance = length(sourceToCoord);
                float maxDistance = iResolution.x * rayLength;
                float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
                float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
                float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;
                float baseStrength = clamp((0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) + (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)), 0.0, 1.0);
                return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
            }

            void main() {
                vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
                vec2 finalRayDir = rayDir;
                if (mouseInfluence > 0.0) {
                    vec2 mouseScreenPos = mousePos * iResolution.xy;
                    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
                    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
                }
                float r1 = rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
                float r2 = rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);
                vec4 color = vec4(1.0) * (r1 * 0.5 + r2 * 0.4);
                if (noiseAmount > 0.0) { color.rgb *= (1.0 - noiseAmount + noiseAmount * noise(coord * 0.01 + iTime * 0.1)); }
                float brightness = 1.0 - (coord.y / iResolution.y);
                color.rgb *= vec3(0.1 + brightness * 0.8, 0.3 + brightness * 0.6, 0.5 + brightness * 0.5);
                if (saturation != 1.0) {
                    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
                    color.rgb = mix(vec3(gray), color.rgb, saturation);
                }
                gl_FragColor = vec4(color.rgb * raysColor, 1.0);
            }
        `;

        this.uniforms = {
            iTime: { value: 0 },
            iResolution: { value: [0, 0] },
            rayPos: { value: [0, 0] },
            rayDir: { value: [0, 1] },
            raysColor: { value: this.hexToRgb(this.props.raysColor) },
            raysSpeed: { value: this.props.raysSpeed },
            lightSpread: { value: this.props.lightSpread },
            rayLength: { value: this.props.rayLength },
            pulsating: { value: this.props.pulsating ? 1.0 : 0.0 },
            fadeDistance: { value: this.props.fadeDistance },
            saturation: { value: this.props.saturation },
            mousePos: { value: [0.5, 0.5] },
            mouseInfluence: { value: this.props.mouseInfluence },
            noiseAmount: { value: this.props.noiseAmount },
            distortion: { value: this.props.distortion }
        };

        const geometry = new Triangle(gl);
        const program = new Program(gl, { vertex: vert, fragment: frag, uniforms: this.uniforms });
        this.mesh = new Mesh(gl, { geometry, program });

        window.addEventListener('resize', () => this.resize());
        if (this.props.followMouse) {
            window.addEventListener('mousemove', (e) => {
                const rect = this.container.getBoundingClientRect();
                this.mouse.x = (e.clientX - rect.left) / rect.width;
                this.mouse.y = (e.clientY - rect.top) / rect.height;
            });
        }

        this.resize();
        requestAnimationFrame((t) => this.render(t));
    }

    resize() {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        this.renderer.setSize(w, h);
        this.uniforms.iResolution.value = [w * this.renderer.dpr, h * this.renderer.dpr];
        const { anchor, dir } = this.getAnchorAndDir(this.props.raysOrigin, w * this.renderer.dpr, h * this.renderer.dpr);
        this.uniforms.rayPos.value = anchor;
        this.uniforms.rayDir.value = dir;
    }

    render(t) {
        this.uniforms.iTime.value = t * 0.001;
        if (this.props.followMouse) {
            this.smoothMouse.x += (this.mouse.x - this.smoothMouse.x) * 0.08;
            this.smoothMouse.y += (this.mouse.y - this.smoothMouse.y) * 0.08;
            this.uniforms.mousePos.value = [this.smoothMouse.x, this.smoothMouse.y];
        }
        this.renderer.render({ scene: this.mesh });
        requestAnimationFrame((t) => this.render(t));
    }
}

window.LightRays = LightRays;
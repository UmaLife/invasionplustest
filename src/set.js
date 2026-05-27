/* footer.js */
const footerTemplate = `
<footer class="site-footer">
    <div class="footer-logo">
        <img src="static/logo.png" alt="INVASION PLUS">
    </div>

    <div class="footer-logo-text">BREAK THE NORM, FORGE TOMORROW.</div>
        <div class="footer-content">
            <div class="footer-links-group">
                <div class="footer-column">
                    <h3>
                        EXPLORE
                    </h3>

                    <ul>
                        <li>
                            <a href="all-product.html">
                                All Product
                            </a>
                        </li>
                        <li>
                            <a href="cases.html">
                                Cases
                            </a>
                        </li>
                        <li>
                            <a href="cooling.html">
                                Cooling
                            </a>
                        </li>
                        <li>
                            <a href="monitor.html">
                                Monitors
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h3>
                        ABOUT US
                    </h3>

                    <ul>
                        <li>
                            <a href="ContactUs.html">
                                Contact Us
                            </a>
                        </li>
                        <li>
                            <a href="Location.html">
                                Location
                            </a>
                        </li>
                        <li>
                            <a href="AboutUs.html">
                                About Us
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h3>
                        SOFTWARE
                    </h3>

                    <ul>
                        <li>
                            <a href="ContactUs.html">
                                Software 1
                            </a>
                        </li>
                        <li>
                            <a href="Location.html">
                                Software 1
                            </a>
                        </li>
                        <li>
                            <a href="AboutUs.html">
                                Software 1
                            </a>
                        </li>
                    </ul>
                </div>
                
                <div class="footer-social-section">
                    <h3>FOLLOW US</h3>
                    <div class="social-icons">
                        <a href="#"><i class="fa-regular fa-envelope"></i></a>
                        <a href="#"><i class="fa-brands fa-whatsapp"></i></a>
                        <a href="https://www.facebook.com/InvasionPlus" target="_blank">
                            <i class="fa-brands fa-facebook"></i>
                        </a>
                        <a href="https://www.instagram.com/invasionplus" target="_blank">
                            <i class="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://www.tiktok.com/@invasionplus" target="_blank">
                            <i class="fa-brands fa-tiktok"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer-column footer-video">
                <h3>FEATURED CONTENT</h3>

                <div class="video-embed">
                    <iframe 
                        src="https://www.youtube.com/embed/_69uSha2mes"
                        title="Invasion Product Showcase"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                </div>

                <div class="video-meta">
                    <span>LATEST VIDEO</span>
                    <h4>Invasion Product Showcase</h4>
                    <p>Latest builds, performance & innovations.</p>
                </div>
            </div>
        </div>
    </div>
</footer>`;

// This injects the footer at the very end of the body
document.body.insertAdjacentHTML('beforeend', footerTemplate);

//floating button
const floatingSocial = `
<div class="floating-social">

    <div class="social-toggle" onclick="toggleSocialMenu()">
        <i class="fa-solid fa-comment-dots"></i>
    </div>

    <div class="social-menu" id="socialMenu">

        <a href="https://wa.me/60123456789" target="_blank">
            <i class="fa-brands fa-whatsapp"></i>
        </a>

        <a href="https://www.facebook.com/InvasionPlus" target="_blank">
            <i class="fa-brands fa-facebook-f"></i>
        </a>

        <a href="https://www.instagram.com/invasionplus" target="_blank">
            <i class="fa-brands fa-instagram"></i>
        </a>

        <a href="mailto:your@email.com">
            <i class="fa-regular fa-envelope"></i>
        </a>

        <a href="https://www.tiktok.com/@invasionplus" target="_blank">
        <i class="fa-brands fa-tiktok"></i>
        </a>

    </div>

</div>
`;

document.body.insertAdjacentHTML('beforeend', floatingSocial);

function toggleSocialMenu(){
    document.getElementById("socialMenu").classList.toggle("active");
}

//navigation bar
const navbarTemplate = `
    <div class="navbar">
        <div class="menu-icon" onclick="openMenu()">
            <span></span>
            <span></span>
        </div>

        <div class="logo">
            <a href="homepage.html">
            <img src="static/logo1.jpeg"alt="logo">
            </a>
        </div>

        <div class="nav-icons">
            <div class="search-icon" onclick="openSearch()">
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    </div>
<!---Overlay Search-->
    <div id="searchOverlay" class="search-overlay">
    <div class="search-container">

        <i class="fa-solid fa-xmark close-btn" onclick="closeSearch()"></i>

        <div class="search-box">

        <input type="text" placeholder="Search your product" id="searchInput">

        <button class="search-btn">
        <i class="fa-solid fa-magnifying-glass"></i>
        </button>

        </div>

        <div class="search-logo">
            <img src="static/logo.png" alt="Invasion Plus Logo">
        </div>

    </div>
</div>
<!--Menu bar-->
    <div class="side-menu" id="sideMenu">
        <div class="menu-content">
        <h2>MENU</h2>
        <div class="menu-search">
            <input type="text" placeholder="Search your product">
        </div>
        <ul>
            <li id="productMenu" onclick="openProductPanel()">Product</li>
            <li onclick="closeProductPanel()">Software</li>
            <li onclick="closeProductPanel()">Contact</li>
            <li onclick="closeProductPanel()">About Us</li>
        </ul>
        <div class="menu-logo">
            <a href="homepage.html">
            <img src="static/logo.png" alt="logo">
            </a>
        </div>
        <div class="menu-bottom-text">
            BREAK THE NORM, FORGE TOMORROW.
        </div>
        <div class="menu-socials">
            <a href="#"><i class="fa-regular fa-envelope"></i></a>
            <a href="#"><i class="fa-brands fa-whatsapp"></i></a>
            <a href="https://www.facebook.com/InvasionPlus" target="_blank">
                <i class="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/invasionplus" target="_blank">
                <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@invasionplus" target="_blank">
                <i class="fa-brands fa-tiktok"></i>
            </a>
        </div>
        <i class="fa-solid fa-xmark menu-close" onclick="closeMenu()"></i>
        </div>
    </div>
    <div class="product-panel" id="productPanel">
        <div class="panel-content">
        <a href="all-product.html" class="product-item">
            <img src="static/cases.png">
            <span>Cases</span>
        </a>
        <a href="cooling.html" class="product-item">
            <img src="static/cooling.png">
            <span>Cooling</span>
        </a>
        <a href="monitor.html" class="product-item">
            <img src="static/monitor.png">
            <span>Monitor</span>
        </a>

    </div>
    </div>`;

// This injects the navbar at the very top of the <body>
document.body.insertAdjacentHTML('afterbegin', navbarTemplate);

function openSearch(){
    document.getElementById("searchOverlay").classList.add("active");
    document.body.classList.add("page-blur");
}

function closeSearch(){
    document.getElementById("searchOverlay").classList.remove("active");
    document.body.classList.remove("page-blur");
}

function openMenu(){
    document.getElementById("sideMenu").classList.toggle("active");
    document.body.classList.add("page-blur");
}

function closeMenu(){
    document.getElementById("sideMenu").classList.remove("active");
    document.getElementById("productPanel").classList.remove("active");
    document.body.classList.remove("page-blur");
}

function openProductPanel(){

    let menu = document.getElementById("sideMenu");
    let panel = document.getElementById("productPanel");
    let productMenu = document.getElementById("productMenu");

    if(panel.classList.contains("active")){

        panel.classList.remove("active");
        menu.classList.remove("shift");
        productMenu.classList.remove("active");

    } else {

        panel.classList.add("active");
        menu.classList.add("shift");
        productMenu.classList.add("active");

    }
}

function closeProductPanel(){

    document.getElementById("productPanel").classList.remove("active");

    document.getElementById("sideMenu").classList.remove("shift");
}
window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});
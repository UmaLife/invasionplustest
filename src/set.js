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
                            <a href="coolers.html">
                                Cooling
                            </a>
                        </li>
                        <li>
                            <a href="monitors.html">
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
                            <a href="#">
                                Software 1
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Software 1
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Software 1
                            </a>
                        </li>
                    </ul>
                </div>
                
                <div class="footer-social-section">
                    <h3>FOLLOW US</h3>
                    <div class="social-icons">
                        <a href="admin@invasionplus.com"><i class="fa-regular fa-envelope"></i></a>
                        <a href="https://wa.me/60176704896"><i class="fa-brands fa-whatsapp"></i></a>
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

        <a href="https://wa.me/60176704896" target="_blank">
            <i class="fa-brands fa-whatsapp"></i>
        </a>

        <a href="https://www.facebook.com/InvasionPlus" target="_blank">
            <i class="fa-brands fa-facebook-f"></i>
        </a>

        <a href="https://www.instagram.com/invasionplus" target="_blank">
            <i class="fa-brands fa-instagram"></i>
        </a>

        <a href="admin@invasionplus.com">
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

        <i class="fa-solid fa-xmark search-close" onclick="closeSearch()"></i>
        
        <div class="search-logo">
            <img src="static/logo.png" alt="Invasion Plus Logo">
        </div>

        <div class="search-box">

        <input type="text" placeholder="Search your product" id="searchInput">

        <button class="search-btn" onclick="performSearch()">
        <i class="fa-solid fa-magnifying-glass"></i>
        </button>

        </div>

        
            <div class="search-links">

                <div class="search-column">
                    <h4>HOT SELLING</h4>

                    <a href="product2.html?id=e20">E-20</a>
                    <a href="product2.html?id=t1000">T-1000</a>
                    <a href="product2.html?id=xtg49">XTG-49ARCX</a>
                </div>

                <div class="search-column">
                    <h4>NEW ARRIVALS</h4>

                    <a href="#">ATLAS</a>
                    <a href="#">ICE360</a>
                    <a href="#">X3 PRO</a>
                </div>

                <div class="search-column">
                    <h4>CATEGORIES</h4>

                    <a href="cases.html">Cases</a>
                    <a href="cooling.html">Cooling</a>
                    <a href="monitor.html">Monitors</a>
                </div>

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

            <li onclick="closeProductPanel()">
            <a href="software.html"> Software </a>
            </li>

            <li onclick="closeProductPanel()">
            <a href="ContactUs.html">Contact</a>
            </li>

            <li onclick="closeProductPanel()">
            <a href="AboutUs.html">About Us</a>
            </li>
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
            <a href="admin@invasionplus.com"><i class="fa-regular fa-envelope"></i></a>
            <a href="https://wa.me/60176704896"><i class="fa-brands fa-whatsapp"></i></a>
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
        <a href="cases.html" class="product-item">
            <img src="static/cases.png">
            <span>Cases</span>
        </a>
        <a href="coolers.html" class="product-item">
            <img src="static/cooling.png">
            <span>Cooling</span>
        </a>
        <a href="monitors.html" class="product-item">
            <img src="static/monitor.png">
            <span>Monitor</span>
        </a>

    </div>
    </div>`;

// This injects the navbar at the very top of the <body>
document.body.insertAdjacentHTML('afterbegin', navbarTemplate);

function openSearch(){

    document.getElementById("searchOverlay")
        .classList.add("active");

    setTimeout(() => {
    document.getElementById("searchInput").focus();
    }, 300);

    document.querySelector(".nav-logo")
        .style.opacity = "0";
}

function closeSearch(){

    document.getElementById("searchOverlay")
        .classList.remove("active");

    document.querySelector(".nav-logo")
        .style.opacity = "1";
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

function performSearch() {

    const keyword = document
        .getElementById("searchInput")
        .value
        .trim();

    if(keyword === "") return;

    localStorage.setItem("searchKeyword", keyword);

    window.location.href = "products.html";
}

document
.getElementById("searchInput")
.addEventListener("keydown", function(e){

    if(e.key === "Enter"){
        performSearch();
    }

});
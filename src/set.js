/* footer.js */
const footerTemplate = `
<footer class="site-footer">

    <div class="footer-logo">
        <img src="static/bann.png" alt="INVASION PLUS">
    </div>

    <div class="footer-content">

        <!-- Footer Links -->
        <div class="footer-links-group">

            <div class="footer-column">
                <h3>EXPLORE</h3>

                <ul>
                    <li>
                        <a href="all-product.html">All Product</a>
                    </li>
                    <li>
                        <a href="cases.html">Cases</a>
                    </li>
                    <li>
                        <a href="coolers.html">Coolers</a>
                    </li>
                    <li>
                        <a href="monitors.html">Monitors</a>
                    </li>
                </ul>
            </div>


            <div class="footer-column">
                <h3>ABOUT US</h3>

                <ul>
                    <li>
                        <a href="ContactUs.html">Contact Us</a>
                    </li>
                    <li>
                        <a href="AboutUs.html">About Us</a>
                    </li>
                </ul>
            </div>


            <div class="footer-column">
                <h3>SOFTWARE</h3>

                <ul>
                    <li>
                        <a href="software.html">Software</a>
                    </li>
                    <li>
                        <a href="software.html#cases">Cases</a>
                    </li>
                    <li>
                        <a href="software.html#coolers">Coolers</a>
                    </li>
                </ul>
            </div>

        </div>


        <!-- Social Media -->
        <div class="footer-social-section">

            <h3>FOLLOW US</h3>

            <div class="social-icons">

                <a href="mailto:admin@invasionplus.com">
                    <i class="fa-regular fa-envelope"></i>
                </a>

                <a href="https://wa.me/60176704896">
                    <i class="fa-brands fa-whatsapp"></i>
                </a>

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

        <a href="mailto:admin@invasionplus.com">
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
<div class="menu-icon" id="menuIcon" onclick="handleMenuIcon()">    <span></span>        <span></span>
        </div>

        <div class="logo">
            <a href="index.html">
            <img src="static/logo1.jpeg"alt="logo">
            </a>
        </div>

        <div class="nav-icons">
            <div class="search-icon" id="searchIcon" onclick="toggleSearch()">
    <i class="fa-solid fa-magnifying-glass"></i>
</div>
        </div>
    </div>
<!---Overlay Search-->
    <div id="searchOverlay" class="search-overlay">
    <div class="search-container">

        <div class="search-header">

    <div class="search-logo">
        <img src="static/logo.png" alt="Invasion Plus Logo">
    </div>

    <button
        type="button"
        class="search-desktop-close"
        onclick="toggleSearch()"
        aria-label="Close search"
    >
        <i class="fa-solid fa-xmark"></i>
    </button>

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
                    <a href="product2.html?id=XTG-49ARCX">XTG-49ARCX</a>
                </div>

                <div class="search-column">
                    <h4>NEW ARRIVALS</h4>
                    <a href="product2.html?id=atlas">ATLAS</a>
                    <a href="product2.html?id=aerovis">AEROVIS</a>
                    <a href="product2.html?id=XTG-49ARCX">XTG-49ARCX</a>
                </div>

                <div class="search-column">
                    <h4>CATEGORIES</h4>

                    <a href="cases.html">Cases</a>
                    <a href="coolers.html">Coolers</a>
                    <a href="monitors.html">Monitors</a>
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

            <i class="fa-solid fa-xmark menu-close" onclick="closeMenu()"></i>
            <li onclick="closeProductPanel()">
            <a href="AboutUs.html">About Us</a>
            </li>
        </ul>
        <div class="menu-logo">
            <a href="index.html">
            <img src="static/bann.png" alt="logo">
            </a>
        </div>
        <div class="menu-socials">
            <a href="mailto:admin@invasionplus.com"><i class="fa-regular fa-envelope"></i></a>
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
    <div class="product-panel" id="productPanel">
    <button class="product-panel-back" onclick="closeProductPanel()">
        <i class="fa-solid fa-chevron-left"></i>
    </button>

        <div class="panel-content">
        <a href="cases.html" class="product-item">
            <img src="static/1.png">
            <span>Cases</span>
        </a>
        <a href="coolers.html" class="product-item">
            <img src="static/2.png">
            <span>Coolers</span>
        </a>
        <a href="monitors.html" class="product-item">
            <img src="static/3.png">
            <span>Monitors</span>
        </a>

    </div>
    </div>`;

// This injects the navbar at the very top of the <body>
document.body.insertAdjacentHTML('afterbegin', navbarTemplate);
function toggleSearch(){

    const overlay = document.getElementById("searchOverlay");
    const menuIcon = document.getElementById("menuIcon");
    const logo = document.querySelector(".logo");

    if(overlay.classList.contains("active")){

        overlay.classList.remove("active");
        menuIcon.classList.remove("search-active");

        document.body.classList.remove("page-blur");

        if(logo){
            logo.style.opacity = "1";
        }

    }else{

        overlay.classList.add("active");
        menuIcon.classList.add("search-active");

        document.body.classList.add("page-blur");

        if(logo){
            logo.style.opacity = "0";
        }

        setTimeout(()=>{
            document.getElementById("searchInput")?.focus();
        },300);
    }
}

function openSearch() {
    const overlay = document.getElementById("searchOverlay");
    const menuIcon = document.getElementById("menuIcon");

    overlay.classList.add("active");
    document.body.classList.add("page-blur");
    document.getElementById("menuIcon").classList.remove("search-active");

    /* Two bars become X */
    menuIcon.classList.add("search-active");

    setTimeout(() => {
        const input = document.getElementById("searchInput");

        if (input) {
            input.focus();
        }
    }, 300);
}

function closeSearch() {
    const overlay = document.getElementById("searchOverlay");
    const menuIcon = document.getElementById("menuIcon");

    overlay.classList.remove("active");
    document.body.classList.remove("page-blur");

    /* X becomes two bars again */
    menuIcon.classList.remove("search-active");
}

function handleMenuIcon() {
    const overlay = document.getElementById("searchOverlay");

    /* When search is open, clicking X closes search */
    if (overlay.classList.contains("active")) {
        closeSearch();
        return;
    }

    /* Otherwise open/close normal side menu */
    toggleMenu();
}
function toggleMenu(){

    const menu = document.getElementById("sideMenu");
    const icon = document.getElementById("menuIcon");

    menu.classList.toggle("active");
    icon.classList.toggle("active");

    if(menu.classList.contains("active")){
        document.body.classList.add("page-blur");
        document.getElementById("menuIcon").classList.remove("search-active");
    }else{
        document.body.classList.remove("page-blur");
        document.getElementById("productPanel").classList.remove("active");
    }
}

function closeMenu(){

    document.getElementById("sideMenu").classList.remove("active");
    document.getElementById("productPanel").classList.remove("active");
    document.getElementById("menuIcon").classList.remove("active");
    document.body.classList.remove("page-blur");
}

function openProductPanel(){

    if(window.innerWidth <= 768){

        document.getElementById("productPanel").classList.add("active");
        return;
    }

    // Desktop (keep your current behavior)
    let menu = document.getElementById("sideMenu");
    let panel = document.getElementById("productPanel");
    let productMenu = document.getElementById("productMenu");

    if(panel.classList.contains("active")){

        panel.classList.remove("active");
        menu.classList.remove("shift");
        productMenu.classList.remove("active");

    }else{

        panel.classList.add("active");
        menu.classList.add("shift");
        productMenu.classList.add("active");

    }
}
function closeProductPanel(){

    const panel = document.getElementById("productPanel");

    if(window.innerWidth <= 768){

        panel.classList.remove("active");
        return;
    }

    panel.classList.remove("active");
    document.getElementById("sideMenu").classList.remove("shift");
}

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
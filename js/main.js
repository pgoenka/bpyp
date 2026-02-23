// App Initialization
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle 
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // 2. Trigger Dynamic Rendering (Fixed function call)
    if (typeof initRouter === 'function') {
        initRouter();
    } else {
        console.error("Router not found. Check if js/router.js is linked correctly.");
    }
});
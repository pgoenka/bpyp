document.addEventListener('DOMContentLoaded', () => {
    // 1. Splash Screen Logic
    const splash = document.getElementById('splash-screen');
    if (splash) {
        // Detect if this is a hard reload
        const navEntries = performance.getEntriesByType('navigation');
        const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';
        
        // Show if first time in session OR if user refreshed
        if (!sessionStorage.getItem('splashShown') || isReload) {
            setTimeout(() => {
                splash.classList.add('splash-hidden');
                sessionStorage.setItem('splashShown', 'true');
            }, 1800); // 1.8 seconds display time
        } else {
            // Hide instantly on standard navigation
            splash.style.display = 'none';
        }
    }

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    // 3. Trigger Dynamic Rendering
    if (typeof initRouter === 'function') {
        initRouter();
    } else {
        console.error("Router not found. Check if js/router.js is linked correctly.");
    }
});
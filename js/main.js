document.addEventListener('DOMContentLoaded', () => {
    // 1. Splash Screen Logic
    const splash = document.getElementById('splash-screen');
    if (splash) {
        const navEntries = performance.getEntriesByType('navigation');
        const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';
        
        if (!sessionStorage.getItem('splashShown') || isReload) {
            setTimeout(() => {
                splash.classList.add('splash-hidden');
                sessionStorage.setItem('splashShown', 'true');
            }, 1800);
        } else {
            splash.style.display = 'none';
        }
    }

    // 2. Global Mobile Menu Toggle (Overlay Mode)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('show');
            hamburger.textContent = isOpen ? '✖' : '☰'; 
            
            // LOCK OR UNLOCK SCROLLING
            document.body.style.overflow = isOpen ? 'hidden' : ''; 
        });

        // Close menu if a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                hamburger.textContent = '☰';
                
                // UNLOCK SCROLLING
                document.body.style.overflow = ''; 
            });
        });
    }

    // 3. Trigger Dynamic Rendering
    if (typeof initRouter === 'function') {
        initRouter();
    } else {
        console.error("Router not found. Check if js/router.js is linked correctly.");
    }
});
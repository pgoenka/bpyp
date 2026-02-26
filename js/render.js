const sanitize = (str) => {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};

const app = document.getElementById('app-content');

function routeRender(page, data) {
    app.innerHTML = ''; 
    
    // Clean up the floating button if we navigate to another page
    const existingNavBtn = document.getElementById('mobile-committee-nav');
    if (existingNavBtn) existingNavBtn.remove();
    
    if (page === 'home') renderHome(data);
    if (page === 'travel') renderTravel(data);
    if (page === 'committees') renderCommittees(data);
    if (page === 'contact') renderContact(data);
    if (page === 'committee-details') renderCommitteeDetails(data); 
}

function renderHome(data) {
    app.innerHTML = `
        <section class="interactive-hero home-snap-section" id="home-hero">
            <div class="hero-content">
                <img src="assets/images/logo.svg" alt="BPYP Logo" style="height: 200px; filter: brightness(0) invert(1); margin-bottom: -2rem;">
                <h1>${sanitize(data.hero.eventName)}</h1>
                <p>${sanitize(data.hero.tagline)} | ${sanitize(data.hero.dates)}</p>
                
                <div style="margin-top: 2rem; margin-bottom: 3rem;">
                    <a href="${data.hero.primaryCta.link}" class="btn">${sanitize(data.hero.primaryCta.text)}</a>
                    <a href="${data.hero.secondaryCta.link}" class="btn btn-outline">${sanitize(data.hero.secondaryCta.text)}</a>
                </div>

                <nav class="portal-nav">
                    <button class="home-hamburger" id="home-menu-toggle" aria-label="Open Menu">☰ MENU</button>
                    
                    <div class="home-nav-links" id="home-nav-links">
                        <button class="close-menu-btn" id="home-menu-close" aria-label="Close Menu">✖</button>
                        <a href="travel.html">Travel</a>
                        <a href="committees.html">Committees</a>
                        <a href="contact.html">Contact</a>
                    </div>
                </nav>
            </div>
        </section>

        <section class="about-section home-snap-section">
            <h2 class="home-section-title">${sanitize(data.about.title)}</h2>
            <div class="about-content text-center">
                ${data.about.paragraphs.map(p => `<p>${sanitize(p)}</p>`).join('')}
            </div>
        </section>
        
        <section class="highlights-section home-snap-section">
            <h2 class="home-section-title">Highlights</h2>
            <div class="grid highlights-grid">
                ${data.highlights.map(h => `
                    <div class="card text-center" style="display: flex; flex-direction: column; justify-content: center;">
                        <h3 style="color: var(--accent-red); margin-bottom: 0.5rem;">${sanitize(h.title)}</h3>
                        <p style="margin-bottom: 0;">${sanitize(h.desc)}</p>
                    </div>`).join('')}
            </div>
        </section>
    `;

    // Add Interactive Mouse Spotlight Effect & Mobile Menu Logic
    setTimeout(() => {
        const hero = document.getElementById('home-hero');
        if (hero) {
            hero.addEventListener('mousemove', (e) => {
                const rect = hero.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                hero.style.setProperty('--cursor-x', `${x}px`);
                hero.style.setProperty('--cursor-y', `${y}px`);
            });
        }

        // Full-Screen Menu Logic
        const homeHamburger = document.getElementById('home-menu-toggle');
        const homeClose = document.getElementById('home-menu-close');
        const homeNavLinks = document.getElementById('home-nav-links');
        
        if (homeHamburger && homeNavLinks && homeClose) {
            // Open Menu & Lock Scroll
            homeHamburger.addEventListener('click', () => {
                homeNavLinks.classList.add('show');
                document.body.style.overflow = 'hidden'; // Locks the background
            });
            // Close Menu & Unlock Scroll
            homeClose.addEventListener('click', () => {
                homeNavLinks.classList.remove('show');
                document.body.style.overflow = ''; // Unlocks the background
            });
            // Close if a link is clicked & Unlock Scroll
            homeNavLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    homeNavLinks.classList.remove('show');
                    document.body.style.overflow = ''; // Unlocks the background
                });
            });
        }
    }, 100);
}

function renderTravel(data) {
    let html = `
        <section class="hero" style="padding: 4rem 2rem; margin-bottom: 3rem;">
            <h1 style="font-size: 3.5rem; color: var(--accent-red);">${sanitize(data.hero.title)}</h1>
            <p style="font-size: 1.2rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto;">${sanitize(data.hero.subtitle)}</p>
        </section>

        <section style="margin-bottom: 4rem; text-align: center;">
            <p style="font-size: 1.15rem; color: var(--text-primary); max-width: 800px; margin: 0 auto; line-height: 1.8;">
                ${sanitize(data.intro)}
            </p>
        </section>

        <section style="margin-bottom: 5rem;">
            <h2 style="text-align: center; margin-bottom: 2rem;">Major Routes</h2>
            <div class="grid">
                ${data.routes.map(r => `
                    <div class="card">
                        <h3 style="color: var(--accent-red); font-size: 1.5rem; margin-bottom: 1rem;">${sanitize(r.title)}</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">${sanitize(r.details)}</p>
                    </div>
                `).join('')}
            </div>
        </section>

        <section style="margin-bottom: 5rem;">
            <h2 style="text-align: center; margin-bottom: 2rem;">Train Schedules</h2>
            
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Delhi &rarr; Loharu (Arrivals)</h3>
            <div class="table-wrapper">
                <table class="styled-table">
                    <thead>
                        <tr><th>Train Name / No.</th><th>From</th><th>Departure</th><th>To</th><th>Arrival</th></tr>
                    </thead>
                    <tbody>
                        ${data.trainsOutbound.map(t => `
                            <tr>
                                <td style="font-weight: 600;">${sanitize(t.train)}</td>
                                <td>${sanitize(t.from)}</td>
                                <td style="color: var(--accent-red);">${sanitize(t.departure)}</td>
                                <td>${sanitize(t.to)}</td>
                                <td>${sanitize(t.arrival)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <h3 style="color: var(--text-primary); margin-top: 3rem; margin-bottom: 1rem;">Loharu &rarr; Delhi (Departures)</h3>
            <div class="table-wrapper">
                <table class="styled-table">
                    <thead>
                        <tr><th>Train Name / No.</th><th>From</th><th>Departure</th><th>To</th><th>Arrival</th></tr>
                    </thead>
                    <tbody>
                        ${data.trainsInbound.map(t => `
                            <tr>
                                <td style="font-weight: 600;">${sanitize(t.train)}</td>
                                <td>${sanitize(t.from)}</td>
                                <td style="color: var(--accent-red);">${sanitize(t.departure)}</td>
                                <td>${sanitize(t.to)}</td>
                                <td>${sanitize(t.arrival)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </section>

        <section style="margin-bottom: 4rem;">
            <h2 style="text-align: center; margin-bottom: 2rem;">Travel Tips</h2>
            <div class="grid">
                ${data.tips.map(t => `
                    <div class="card" style="padding: 1.5rem;">
                        <h4 style="color: var(--text-primary); margin-bottom: 0.5rem; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px;">${sanitize(t.title)}</h4>
                        <p style="color: var(--text-muted); font-size: 0.95rem;">${sanitize(t.desc)}</p>
                    </div>
                `).join('')}
            </div>
        </section>

        <section style="background: rgba(255, 30, 30, 0.05); border: 1px solid rgba(255, 30, 30, 0.2); padding: 2rem; border-radius: 8px; text-align: center;">
            <p style="color: var(--text-secondary); font-size: 0.95rem; margin: 0;">
                <strong style="color: var(--accent-red);">NOTE:</strong> ${sanitize(data.disclaimer)}
            </p>
        </section>
    `;
    app.innerHTML = html;
}

function renderContact(data) {
    let html = `
        <section class="hero" style="padding: 4rem 2rem; margin-bottom: 3rem;">
            <h1 style="font-size: 3.5rem; color: var(--accent-red);">Contact Us</h1>
            <p style="font-size: 1.2rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto; font-family: var(--font-body);">Have a question or need assistance? Reach out to the Secretariat.</p>
        </section>

        <section class="grid" style="align-items: flex-start; margin-bottom: 5rem;">
            
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div class="card" style="padding: 2.5rem;">
                    <h3 style="color: var(--accent-red); margin-bottom: 1.5rem; text-transform: uppercase; font-size: 1.2rem; letter-spacing: 1px;">Get in Touch</h3>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; font-family: var(--font-body);">Phone</h4>
                        ${data.phones.map(p => `<p style="color: var(--text-primary); margin-bottom: 0.25rem; font-family: var(--font-body);"><strong>${sanitize(p.role)}:</strong> ${sanitize(p.number)}</p>`).join('')}
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; font-family: var(--font-body);">Email</h4>
                        ${data.emails.map(e => `<p style="margin-bottom: 0.25rem; font-family: var(--font-body);"><a href="mailto:${sanitize(e)}" style="color: var(--text-primary); transition: color 0.3s ease;">${sanitize(e)}</a></p>`).join('')}
                    </div>
                    
                    <div>
                        <h4 style="color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; font-family: var(--font-body);">Social</h4>
                        <a href="${sanitize(data.social.instagram)}" target="_blank" style="color: var(--accent-red); font-weight: 600; text-decoration: none; font-family: var(--font-body);">Follow us on Instagram &rarr;</a>
                    </div>
                </div>

                <div class="card" style="padding: 0; overflow: hidden; height: 250px;">
                    <iframe src="${sanitize(data.mapEmbed)}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>

            <div class="card" style="padding: 3rem 2.5rem;">
                <h3 style="color: var(--text-primary); margin-bottom: 2rem; font-size: 1.8rem;">Send a Message</h3>
                <form id="contactForm">
                    <div class="form-group">
                        <label>Your Name</label>
                        <input type="text" name="user_name" placeholder="John Doe" required minlength="2" maxlength="100">
                    </div>
                    <div class="form-group">
                        <label>Your Email</label>
                        <input type="email" name="user_email" placeholder="john@example.com" required>
                    </div>
                    <div class="form-group">
                        <label>Subject</label>
                        <input type="text" name="subject" placeholder="How can we help?" required minlength="3" maxlength="200">
                    </div>
                    <div class="form-group">
                        <label>Message</label>
                        <textarea rows="5" name="message" placeholder="Write your message here..." required minlength="10" maxlength="5000"></textarea>
                    </div>
                    <button type="submit" class="btn" style="width: 100%; margin-top: 1rem;">Send Message</button>
                </form>
            </div>
            
        </section>
    `;
    app.innerHTML = html;
    if(window.initContactForm) window.initContactForm();
}

function renderRegistration() {
    app.innerHTML = `
        <section class="hero" style="padding: 4rem 2rem; margin-bottom: 3rem;">
            <h1 style="font-size: 3.5rem; color: var(--accent-red);">Registration</h1>
            <p style="font-size: 1.2rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto; font-family: var(--font-body);">Secure your spot at the BITS Pilani Youth Parliament.</p>
        </section>

        <section class="text-center" style="margin-bottom: 5rem;">
            <div class="card" style="max-width: 800px; margin: auto; padding: 1rem; height: 850px; display: flex; flex-direction: column;">
                
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSdGfCQKx8O18wOBtNj7QqTPNT_cF-ix7IVqcL1eUEFkslRKeg/viewform?embedded=true" 
                    width="100%" 
                    height="100%" 
                    frameborder="0" 
                    marginheight="0" 
                    marginwidth="0"
                    style="border-radius: 4px; background: transparent;"
                >
                    <div class="loader" style="margin: auto;">Loading form...</div>
                </iframe>
                
            </div>
        </section>
    `;
    
    // We no longer need window.initRegForm() since Google handles the submission!
}

function renderCommittees(data) {
    let html = `<section class="text-center">
                    <h2 style="font-size: 2.5rem; margin-bottom: 3rem;">${sanitize(data.header)}</h2>
                </section>`;

    const buildCommitteeGrid = (committeesList, title) => {
        if (!committeesList || committeesList.length === 0) return '';
        
        let sectionHtml = `
            <section id="${title.toLowerCase()}-section" style="margin-bottom: 4rem;">
                <h3 style="color: var(--accent-red); font-size: 1.8rem; margin-bottom: 2rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem; display: inline-block;">
                    ${sanitize(title)} Committees
                </h3>
                <div class="grid">`;
                
        committeesList.forEach((c, index) => {
            const imageHtml = c.image ? `<img src="${sanitize(c.image)}" alt="${sanitize(c.name)}" class="committee-img">` : '';
            const descId = `desc-${title.toLowerCase()}-${index}`;
            
            sectionHtml += `
                <div class="card">
                    ${imageHtml}
                    <h3 style="font-size: 1.3rem; min-height: 3.5rem;">${sanitize(c.name)}</h3>
                    
                    <div style="flex-grow: 1; display: flex; flex-direction: column;">
                        <p id="${descId}" class="description-text" style="margin-bottom: 1rem;">
                            <strong style="color: var(--text-primary);">Agenda:</strong> ${sanitize(c.agenda)}
                        </p>
                    </div>
                    
                    <div class="card-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
                        <button class="read-more-btn" onclick="toggleReadMore('${descId}', this)">Read More</button>
                        <a href="committee-details.html?id=${sanitize(c.id)}" class="btn" style="padding: 0.6rem 1.5rem; width: auto; margin: 0; text-align: center;">View Details</a>
                    </div>
                </div>`;
        });
        
        sectionHtml += `</div></section>`;
        return sectionHtml;
    };

    html += buildCommitteeGrid(data.offline, "Offline");
    html += buildCommitteeGrid(data.online, "Online");

    // Set the main content
    app.innerHTML = html;

    // INJECT BUTTON DIRECTLY TO BODY (This fixes the float issue)
    const btn = document.createElement('button');
    btn.id = 'mobile-committee-nav';
    btn.className = 'floating-nav-btn';
    btn.innerHTML = 'Go to Online &darr;';
    document.body.appendChild(btn);

    // Add Scroll Tracking Logic
    setTimeout(() => {
        const navBtn = document.getElementById('mobile-committee-nav');
        const offlineSec = document.getElementById('offline-section');
        const onlineSec = document.getElementById('online-section');

        if (navBtn && offlineSec && onlineSec) {
            const updateButtonState = () => {
                const onlineRect = onlineSec.getBoundingClientRect();
                
                if (onlineRect.top < window.innerHeight * 0.6) {
                    navBtn.innerHTML = '&uarr; Go to Offline';
                    navBtn.onclick = () => {
                        const offset = offlineSec.offsetTop - 80; 
                        window.scrollTo({ top: offset, behavior: 'smooth' });
                    };
                } else {
                    navBtn.innerHTML = 'Go to Online &darr;';
                    navBtn.onclick = () => {
                        const offset = onlineSec.offsetTop - 80;
                        window.scrollTo({ top: offset, behavior: 'smooth' });
                    };
                }
            };
            
            window.addEventListener('scroll', updateButtonState);
            updateButtonState();
        }
    }, 100);
}

function renderCommitteeDetails(data) {
    const urlParams = new URLSearchParams(window.location.search);
    const committeeId = urlParams.get('id');

    let committee = null;
    let mode = '';
    
    if (data.offline) {
        committee = data.offline.find(c => c.id === committeeId);
        if (committee) mode = 'Offline';
    }
    if (!committee && data.online) {
        committee = data.online.find(c => c.id === committeeId);
        if (committee) mode = 'Online';
    }

    if (!committee) {
        app.innerHTML = `<section class="text-center" style="padding: 5rem 0;">
                            <h2>Committee not found</h2>
                            <a href="committees.html" class="btn mt-4">Back to Committees</a>
                         </section>`;
        return;
    }

    app.innerHTML = `
        <section style="margin-bottom: 4rem;">
            <a href="committees.html" style="color: var(--accent-red); display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; font-weight: 600; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px;">
                &larr; Back to Committees
            </a>
            
            <div style="display: flex; flex-wrap: wrap; gap: 4rem; align-items: flex-start;">
                
                <div style="flex: 1; min-width: 300px;">
                    <img src="${sanitize(committee.image)}" alt="${sanitize(committee.name)}" style="width: 100%; border-radius: 8px; border: 1px solid var(--border-subtle); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                </div>
                
                <div style="flex: 1.5; min-width: 300px;">
                    <span style="background: var(--accent-red); color: white; padding: 0.4rem 1rem; border-radius: 4px; font-size: 0.75rem; text-transform: uppercase; font-weight: 800; letter-spacing: 1.5px;">
                        ${mode} Committee
                    </span>
                    
                    <h1 style="font-size: 3rem; margin: 1.5rem 0 1rem 0; line-height: 1.1;">${sanitize(committee.name)}</h1>
                    
                    <div style="background: var(--bg-card); padding: 2.5rem; border-radius: 8px; border: 1px solid var(--border-subtle); margin-top: 2.5rem;">
                        <h3 style="color: var(--accent-red); margin-bottom: 1rem; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 1px;">Agenda</h3>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-primary);">
                            ${sanitize(committee.agenda)}
                        </p>

                        <h3 style="color: var(--accent-red); margin-top: 2rem; margin-bottom: 1rem; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 1px;">Description</h3>
                        <p style="font-size: 1rem; line-height: 1.6; color: var(--text-muted);">
                            ${sanitize(committee.description || 'To be added.')}
                        </p>
                    </div>
                    
                    <div style="margin-top: 2.5rem; display: flex; gap: 3rem; padding-bottom: 2.5rem; border-bottom: 1px solid var(--border-subtle);">
                        <div>
                            <h4 style="color: var(--text-muted); text-transform: uppercase; font-size: 0.85rem; margin-bottom: 0.5rem; letter-spacing: 1px;">Chairpersons</h4>
                            <p style="font-weight: 600; font-size: 1.15rem; color: var(--text-primary);">
                                ${committee.chairpersons ? committee.chairpersons.join(', ') : 'To be added'}
                            </p>
                        </div>
                    </div>

                    <div style="margin-top: 3rem;">
                        <a href="registration.html" class="btn">Register Now</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Global function to handle the Read More toggle
window.toggleReadMore = function(descId, buttonElement) {
    const descElement = document.getElementById(descId);
    
    // Toggle the 'expanded' class
    if (descElement.classList.contains('expanded')) {
        descElement.classList.remove('expanded');
        buttonElement.textContent = 'Read More';
    } else {
        descElement.classList.add('expanded');
        buttonElement.textContent = 'Read Less';
    }
};
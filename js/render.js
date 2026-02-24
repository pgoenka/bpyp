const sanitize = (str) => {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};

const app = document.getElementById('app-content');

function routeRender(page, data) {
    app.innerHTML = ''; 
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
                <img src="assets/images/logo.svg" alt="BPYP Logo" style="height: 60px; filter: brightness(0) invert(1); margin-bottom: 2rem;">
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
    let html = `<section><h2>${sanitize(data.introduction.title)}</h2><ul>`;
    data.introduction.details.forEach(d => html += `<li>${sanitize(d)}</li>`);
    html += `</ul></section><section class="mt-4"><h2>Routes</h2><div class="grid">`;
    data.routes.forEach(r => html += `<div class="card"><h3>${sanitize(r.title)}</h3><p>${sanitize(r.details)}</p></div>`);
    html += `</div></section><section class="mt-4"><h2>Train Schedules</h2><div class="table-wrapper"><table>`;
    html += `<thead><tr><th>Train</th><th>From</th><th>Departs</th><th>To</th><th>Arrives</th></tr></thead><tbody>`;
    data.trainSchedules.delhiToLoharu.forEach(t => {
        html += `<tr><td>${sanitize(t.trainName)}</td><td>${sanitize(t.from)}</td><td>${sanitize(t.departure)}</td><td>${sanitize(t.to)}</td><td>${sanitize(t.arrival)}</td></tr>`;
    });
    html += `</tbody></table></div></section>`;
    app.innerHTML = html;
}

function renderContact(data) {
    let html = `<section><h2>Contact Us</h2><div class="grid"><div class="card"><h3>Key Contacts</h3><ul>`;
    data.phones.forEach(p => html += `<li><b>${sanitize(p.role)}:</b> ${sanitize(p.number)}</li>`);
    data.emails.forEach(e => html += `<li>Email: ${sanitize(e)}</li>`);
    html += `</ul></div><div class="card"><h3>Location</h3><iframe src="${data.mapEmbed}" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy"></iframe></div></div></section>`;
    
    // Append Form
    html += `
        <section class="mt-4">
            <h2>Send a Message</h2>
            <form id="contactForm" class="card">
                <div class="form-group"><label>Name</label><input type="text" required></div>
                <div class="form-group"><label>Email</label><input type="email" required></div>
                <div class="form-group"><label>Message</label><textarea rows="4" required></textarea></div>
                <button type="submit" class="btn">Send</button>
            </form>
        </section>
    `;
    app.innerHTML = html;
    if(window.initContactForm) window.initContactForm();
}

function renderRegistration() {
    app.innerHTML = `
        <section class="text-center">
            <h2>Registrations Opening Soon</h2>
            <form id="registrationForm" class="card mt-4" style="max-width: 500px; margin: auto; text-align: left;">
                <div class="form-group"><label>Full Name</label><input type="text" required></div>
                <div class="form-group"><label>Email</label><input type="email" required></div>
                <div class="form-group"><label>Phone Number</label><input type="tel" required></div>
                <div class="form-group"><label>College/Institution</label><input type="text" required></div>
                <button type="submit" class="btn mt-2">Submit</button>
                <div id="formMessage" style="display:none; color: var(--accent-red); margin-top: 1rem; font-weight: bold;"></div>
            </form>
        </section>
    `;
    if(window.initRegForm) window.initRegForm();
}

function renderCommittees(data) {
    let html = `<section class="text-center">
                    <h2 style="font-size: 2.5rem; margin-bottom: 3rem;">${sanitize(data.header)}</h2>
                </section>`;

    const buildCommitteeGrid = (committeesList, title) => {
        if (!committeesList || committeesList.length === 0) return '';
        
        let sectionHtml = `
            <section style="margin-bottom: 4rem;">
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

    app.innerHTML = html;
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
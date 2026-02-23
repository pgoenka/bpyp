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
}

function renderHome(data) {
    app.innerHTML = `
        <section class="hero">
            <h1>${sanitize(data.hero.eventName)}</h1>
            <p>${sanitize(data.hero.tagline)} | ${sanitize(data.hero.dates)}</p>
            <div style="margin-top:1rem;">
                <a href="${data.hero.primaryCta.link}" class="btn">${sanitize(data.hero.primaryCta.text)}</a>
                <a href="${data.hero.secondaryCta.link}" class="btn btn-outline">${sanitize(data.hero.secondaryCta.text)}</a>
            </div>
        </section>
        <section>
            <h2>${sanitize(data.about.title)}</h2>
            ${data.about.paragraphs.map(p => `<p>${sanitize(p)}</p>`).join('')}
        </section>
        <section class="mt-4">
            <h2>Highlights</h2>
            <div class="grid">
                ${data.highlights.map(h => `<div class="card"><h3>${sanitize(h.title)}</h3><p>${sanitize(h.desc)}</p></div>`).join('')}
            </div>
        </section>
    `;
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
                        <p id="${descId}" class="description-text" style="margin-bottom: 1rem;">${sanitize(c.shortDescription)}</p>
                    </div>
                    
                    <div class="card-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
                        <button class="read-more-btn" onclick="toggleReadMore('${descId}', this)">Read More</button>
                        <button class="btn" style="padding: 0.6rem 1.5rem; width: auto; margin: 0;">View Details</button>
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
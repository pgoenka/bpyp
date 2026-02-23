window.initRegForm = function() {
    const form = document.getElementById('registrationForm');
    const msgDiv = document.getElementById('formMessage');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            msgDiv.textContent = "Registrations are not open yet.";
            msgDiv.style.display = "block";
            form.reset();
        });
    }
};

window.initContactForm = function() {
    const form = document.getElementById('contactForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Thank you for reaching out! We will get back to you soon.");
            form.reset();
        });
    }
};
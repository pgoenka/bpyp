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
        const submitBtn = form.querySelector('button[type="submit"]');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            // UI Loading State
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.pointerEvents = 'none';

            // Gather the data from the form
            const formData = new FormData(form);
            
            // Package the exact variables matching your EmailJS HTML template
            const templateParams = {
                user_name: formData.get('user_name'),
                user_email: formData.get('user_email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) // Grabs current India time
            };

            // Send via EmailJS (Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID')
            emailjs.send('service_nqvhdgi', 'template_hjk13en', templateParams)
                .then(() => {
                    // Success State
                    submitBtn.textContent = 'Message Sent Successfully!';
                    submitBtn.style.background = '#28a745'; 
                    submitBtn.style.borderColor = '#28a745';
                    form.reset();
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = 'var(--accent-red)';
                        submitBtn.style.borderColor = 'var(--accent-red)';
                        submitBtn.style.opacity = '1';
                        submitBtn.style.pointerEvents = 'auto';
                    }, 3000);
                }, (error) => {
                    // Error State
                    console.error('FAILED...', error);
                    submitBtn.textContent = 'Error Sending. Try Again.';
                    submitBtn.style.opacity = '1';
                    submitBtn.style.pointerEvents = 'auto';
                });
        });
    }
};
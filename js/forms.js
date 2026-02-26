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

// Backend API URL - empty string uses relative paths (works on Vercel)
const API_BASE_URL = '';

window.initContactForm = function() {
    const form = document.getElementById('contactForm');
    
    if(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); 
            
            // UI Loading State
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.pointerEvents = 'none';

            try {
                const payload = {
                    user_name: form.querySelector('[name="user_name"]').value.trim(),
                    user_email: form.querySelector('[name="user_email"]').value.trim(),
                    subject: form.querySelector('[name="subject"]').value.trim(),
                    message: form.querySelector('[name="message"]').value.trim()
                };

                // Client-side validation with specific error messages
                if (!payload.user_name || payload.user_name.length < 2) {
                    throw new Error('Name must be at least 2 characters');
                }
                if (!payload.user_email) {
                    throw new Error('Please enter a valid email');
                }
                if (!payload.subject || payload.subject.length < 3) {
                    throw new Error('Subject must be at least 3 characters');
                }
                if (!payload.message || payload.message.length < 10) {
                    throw new Error('Message must be at least 10 characters');
                }

                const response = await fetch(`${API_BASE_URL}/api/contact`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || result.details?.join(', ') || 'Failed to send');
                }
                
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
            } catch (error) {
                // Error State
                console.error('FAILED...', error);
                submitBtn.textContent = error.message || 'Error Sending. Try Again.';
                submitBtn.style.opacity = '1';
                submitBtn.style.pointerEvents = 'auto';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.opacity = '1';
                }, 3000);
            }
        });
    }
};
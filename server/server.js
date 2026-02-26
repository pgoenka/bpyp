require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// SMTP transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Get recipient emails from contact.json
function getRecipients() {
    try {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'contact.json'), 'utf8'));
        return data.emails || [];
    } catch (e) {
        return [];
    }
}

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    const { user_name, user_email, subject, message } = req.body;

    // Simple validation
    if (!user_name || !user_email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if (message.length < 10) {
        return res.status(400).json({ error: 'Message must be at least 10 characters' });
    }

    const recipients = getRecipients();
    if (recipients.length === 0) {
        return res.status(500).json({ error: 'No recipients configured' });
    }

    // Respond immediately, send email in background
    res.json({ success: true, message: 'Message sent successfully' });

    // Send email async (don't await)
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    transporter.sendMail({
        from: `"BPYP Contact" <${process.env.SMTP_USER}>`,
        to: recipients.join(', '),
        replyTo: user_email,
        subject: `[BPYP] ${subject}`,
        html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="border-bottom: 3px solid #ff1e1e; padding-bottom: 15px; margin-bottom: 25px;">
        <h2 style="margin: 0; color: #333;">New Contact Form Submission</h2>
    </div>
    
    <table style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 10px 0; color: #666; width: 80px;">Name:</td>
            <td style="padding: 10px 0; color: #333; font-weight: 600;">${user_name}</td>
        </tr>
        <tr>
            <td style="padding: 10px 0; color: #666;">Email:</td>
            <td style="padding: 10px 0;"><a href="mailto:${user_email}" style="color: #ff1e1e;">${user_email}</a></td>
        </tr>
        <tr>
            <td style="padding: 10px 0; color: #666;">Subject:</td>
            <td style="padding: 10px 0; color: #333;">${subject}</td>
        </tr>
    </table>
    
    <div style="margin-top: 25px; padding: 20px; background: #f8f8f8; border-radius: 6px;">
        <p style="margin: 0 0 10px 0; color: #666; font-size: 13px; text-transform: uppercase;">Message</p>
        <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
    </div>
    
    <p style="margin-top: 30px; color: #999; font-size: 12px; text-align: center;">
        Received on ${timestamp} via BPYP Website
    </p>
</div>
        `,
        text: `New BPYP Contact Form Submission\n\nFrom: ${user_name} <${user_email}>\nSubject: ${subject}\nTime: ${timestamp}\n\nMessage:\n${message}`
    }).catch(err => console.error('Email error:', err.message));
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

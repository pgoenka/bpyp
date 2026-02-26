# BPYP Mail Server

Simple Express server for handling contact form submissions.

## Setup

### 1. Install dependencies
```bash
cd server
npm install
```

### 2. Configure environment variables
Create a `.env` file in the `server/` directory:

```env
# SMTP Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Server
PORT=3001
```

**Gmail Setup:**
1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account → Security → App passwords
3. Generate a new app password for "Mail"
4. Use that 16-character password as `SMTP_PASS`

### 3. Configure recipients
Edit `data/contact.json` and add recipient emails:
```json
{
  "emails": ["recipient1@example.com", "recipient2@example.com"]
}
```

## Running

### Start the backend server
```bash
cd server
node server.js
```
Server runs on `http://localhost:3001`

### Start the frontend
Using Python:
```bash
python -m http.server 8080
```

Or using VS Code Live Server extension (typically runs on port 5500).

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contact` | POST | Submit contact form |
| `/api/health` | GET | Health check |

### POST /api/contact
```json
{
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "subject": "Hello",
  "message": "Your message here (min 10 chars)"
}
```

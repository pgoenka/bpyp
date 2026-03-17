# BITS Pilani Youth Parliament (BPYP) 🏛️

The official web ecosystem for the **BITS Pilani Youth Parliament**, a premier simulation of parliamentary and diplomatic proceedings. This platform is designed to streamline delegate engagement, committee exploration, and logistical coordination for one of India's most prestigious youth-led simulations.

-----

## 🚀 Overview

The BPYP platform is a full-stack solution featuring a high-performance, single-page application (SPA) architecture on the frontend and a secure, serverless-ready communication backend. It provides an immersive dark-themed experience that reflects the professional nature of diplomatic discourse.

### Key Functional Pillars:

  * **Virtual Committee Hub**: Dynamic rendering of over 10 specialized committees (AIPPM, UNGA, UNSC, etc.) with comprehensive agendas.
  * **Seamless Logistics Engine**: Data-driven travel guides providing precise navigation to the Pilani campus via rail and road.
  * **Unified Communications**: A custom-built mailing system using Nodemailer to facilitate secure delegate-organizer interaction.
  * **Adaptive UX**: Mobile-first design with custom navigation routers and interactive glassmorphic UI elements.

-----

## 🛠️ Technical Architecture

### Frontend (SPA Architecture)

  * **Engine**: Vanilla JavaScript (ES6+) with a custom-built client-side router for lightning-fast transitions without page reloads.
  * **Styling**: Advanced CSS3 utilizing CSS Variables for theme consistency, Flexbox/Grid for responsiveness, and Keyframe animations for spotlight effects.
  * **Data Layer**: Decoupled JSON-based content management for easy updates to agendas and schedules.

### Backend (Communications & API)

  * **Runtime**: Node.js & Express.js.
  * **Mail Protocol**: SMTP integration via Nodemailer with HTML templating for professional automated responses.
  * **Deployment Architecture**: Optimized for **Vercel** using serverless functions (`/api` directory) and a dedicated standalone Express server for traditional environments.

-----

## 📂 Repository Structure

```text
├── api/                # Production-ready Serverless Functions (Vercel)
├── assets/             # Optimized SVG/PNG branding and committee assets
├── css/                # Modular stylesheets and global theme definitions
├── data/               # Source-of-truth JSON files (Committees, Home, Travel)
├── js/                 # Logic: Router.js, Render.js, Forms.js, Main.js
├── server/             # Local development Express server & Mail configuration
├── index.html          # Core entry point (Root Container)
└── vercel.json         # Deployment and Routing configuration
```

-----

## ⚙️ Installation & Deployment

### Local Development

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/bpyp/bpyp-web.git
    cd bpyp-web
    ```

2.  **Configure Backend:**
    Navigate to the `server/` directory and create a `.env` file:

    ```bash
    SMTP_HOST=your_host
    SMTP_USER=your_email
    SMTP_PASS=your_app_password
    ```

3.  **Run with Node:**

    ```bash
    cd server
    npm install
    node server.js
    ```

### Production Deployment

This project is pre-configured for **Vercel**. Simply connect your GitHub repository to Vercel, and it will automatically handle the routing defined in `vercel.json` and the serverless functions in `api/`.

-----

## 🛡️ API Specification

### `POST /api/contact`

Submits delegate inquiries to the BPYP Secretariat.

  * **Validation**: Required fields include `user_name`, `user_email`, `subject`, and `message`.
  * **Processing**: Sanitizes input and triggers a dual-delivery mail protocol (Secretariat notification + User confirmation).

-----

## 🤝 Contribution & Contact

The BPYP platform is maintained by the **Accord BITS Pilani** technical team.

  * **Platform Lead**: [Accord BITS Pilani](mailto:accord.bitspilani@gmail.com)
  * **Official Website**: [bpyp.bitspilani.ac.in](https://www.google.com/search?q=https://bpyp.bitspilani.ac.in)
  * **Socials**: [@bpyp.pilani](https://www.instagram.com/bpyp.pilani)

-----

*Where marks meet the curve. Empowering the leaders of tomorrow.*
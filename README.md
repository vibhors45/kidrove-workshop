# KidRove – AI & Robotics Summer Workshop Landing Page

A fully responsive React + Express.js landing page for KidRove's AI & Robotics Summer Workshop.

## 🚀 Tech Stack

| Layer    | Technology                            |
|----------|---------------------------------------|
| Frontend | React 18, CSS Modules (custom design) |
| Backend  | Node.js, Express.js                   |
| Database | MongoDB + Mongoose (optional)         |
| Fonts    | Space Grotesk, Syne (Google Fonts)    |

---

## 🗂️ Project Structure

```
kidrove-workshop/
├── client/                  # React frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Navbar.js / .css
│       │   ├── Hero.js / .css
│       │   ├── WorkshopDetails.js / .css
│       │   ├── LearningOutcomes.js / .css
│       │   ├── FAQ.js / .css
│       │   ├── RegistrationForm.js / .css
│       │   └── Footer.js / .css
│       ├── App.js / .css
│       ├── index.js
│       └── index.css
└── server/                  # Express backend
    ├── index.js             # API entry point
    ├── .env.example
    └── package.json
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd kidrove-workshop

# Install root deps
npm install

# Install all deps
npm run install:all
```

### 2. Configure Backend

```bash
cd server
cp .env.example .env
# Edit .env — optionally add MONGO_URI for MongoDB persistence
```

### 3. Run in Development

```bash
# From project root — starts both client (port 3000) and server (port 4000)
npm run dev

# Or individually:
npm run dev:client   # React dev server on :3000
npm run dev:server   # Express API on :4000
```

### 4. Build for Production

```bash
npm run build   # Builds the React client
```

---

## 📡 API Reference

### `POST /api/enquiry`

Accepts a workshop registration enquiry.

**Request Body**
```json
{
  "name": "Priya Sharma",
  "email": "priya@email.com",
  "phone": "9876543210"
}
```

**Success Response — `201 Created`**
```json
{
  "success": true,
  "message": "Thank you! We will be in touch within 24 hours.",
  "data": {
    "name": "Priya Sharma",
    "email": "priya@email.com"
  }
}
```

**Validation Error — `422 Unprocessable Entity`**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Please provide a valid email address"
  }
}
```

**Missing Fields — `400 Bad Request`**
```json
{
  "success": false,
  "message": "Missing required fields: phone",
  "fields": ["phone"]
}
```

### `GET /api/health`
Returns server health status.

---

## ✅ Validation Rules

| Field | Rule                                                        |
|-------|-------------------------------------------------------------|
| name  | Required, minimum 2 characters                              |
| email | Required, valid email format                                |
| phone | Required, valid 10-digit Indian mobile (starts with 6–9)   |

---

## 🗄️ MongoDB (Optional)

If `MONGO_URI` is set in `.env`, enquiries are persisted to MongoDB with this schema:

```js
{
  name:      String (required),
  email:     String (required, lowercase),
  phone:     String (required),
  workshop:  String (default: 'AI & Robotics Summer Workshop'),
  createdAt: Date
}
```

Without `MONGO_URI`, the server logs enquiries to console and returns a success response — useful for development and testing without a DB.

---

## 🎨 Design Approach

The design uses a **deep navy + electric blue + neon cyan** palette inspired by tech/code aesthetics while remaining approachable and friendly for a kids' education brand. Key choices:

- **Space Grotesk** (body) + **Syne** (display) — modern, technical, readable
- Floating code editor card in hero — communicates "we actually code here"
- Scroll-triggered card animations in Learning Outcomes
- Sticky CTA in navbar, price + discount always visible in registration section

---

## 🔮 What I'd Improve With More Time

1. **TypeScript** throughout — prop types, API response types, form state
2. **Tailwind CSS** for faster responsive iteration
3. **Email confirmation** via Nodemailer when enquiry is received
4. **Admin dashboard** to view and manage enquiries
5. **Razorpay integration** for direct payment from the page
6. **i18n** — Hindi language support for broader reach across India
7. **E2E tests** with Playwright
8. **Vercel + Railway** deployment with CI/CD via GitHub Actions

---

## 📋 Evaluation Checklist

- [x] Hero section with title, description, Enroll Now CTA
- [x] Workshop details (age, duration, mode, fee, start date)
- [x] 6 learning outcomes
- [x] 5 FAQs with accordion interaction
- [x] Registration form (name, email, phone)
- [x] Client-side form validation with field-level error messages
- [x] Loading state on form submit button
- [x] Success state after submission
- [x] `POST /api/enquiry` with validation
- [x] Optional MongoDB integration
- [x] Responsive design (mobile, tablet, desktop)
- [x] Clean component structure

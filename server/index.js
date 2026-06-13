/**
 * KidRove Workshop – Express API
 * POST /api/enquiry  — accepts registration form data
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
}));

// ─── Optional MongoDB Setup ───────────────────────────────────────────────────
let Enquiry = null;

if (process.env.MONGO_URI) {
  const mongoose = require('mongoose');

  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.warn('⚠️  MongoDB connection failed — running without DB:', err.message));

  const enquirySchema = new mongoose.Schema({
    name:      { type: String, required: true, trim: true },
    email:     { type: String, required: true, trim: true, lowercase: true },
    phone:     { type: String, required: true, trim: true },
    workshop:  { type: String, default: 'AI & Robotics Summer Workshop' },
    createdAt: { type: Date, default: Date.now },
  });

  Enquiry = mongoose.model('Enquiry', enquirySchema);
}

// ─── Validation Helpers ───────────────────────────────────────────────────────
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone) => {
  const clean = phone.replace(/[\s\-]/g, '');
  return /^[6-9]\d{9}$/.test(clean);
};

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * POST /api/enquiry
 * Body: { name, email, phone }
 */
app.post('/api/enquiry', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // ── Field presence check ─────────────────────────────────────
    const missingFields = [];
    if (!name)  missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!phone) missingFields.push('phone');

    if (missingFields.length) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        fields: missingFields,
      });
    }

    // ── Format validation ─────────────────────────────────────────
    const fieldErrors = {};

    if (name.trim().length < 2) {
      fieldErrors.name = 'Name must be at least 2 characters';
    }
    if (!isValidEmail(email.trim())) {
      fieldErrors.email = 'Please provide a valid email address';
    }
    if (!isValidPhone(phone.trim())) {
      fieldErrors.phone = 'Please provide a valid 10-digit Indian mobile number';
    }

    if (Object.keys(fieldErrors).length) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: fieldErrors,
      });
    }

    // ── Persist to DB (if connected) ──────────────────────────────
    const enquiryData = {
      name:  name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim().replace(/[\s\-]/g, ''),
    };

    if (Enquiry) {
      const doc = await Enquiry.create(enquiryData);
      console.log(`📩 Enquiry saved: ${doc._id} — ${enquiryData.email}`);
    } else {
      // No DB — just log to console
      console.log('📩 Enquiry received (no DB):', enquiryData);
    }

    // ── Success ───────────────────────────────────────────────────
    return res.status(201).json({
      success: true,
      message: 'Thank you! We will be in touch within 24 hours.',
      data: {
        name: enquiryData.name,
        email: enquiryData.email,
      },
    });

  } catch (error) {
    console.error('Error handling enquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong on our end. Please try again shortly.',
    });
  }
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 KidRove API running on http://localhost:${PORT}`);
  console.log(`   POST http://localhost:${PORT}/api/enquiry`);
  console.log(`   MongoDB: ${process.env.MONGO_URI ? 'configured' : 'not configured (in-memory only)'}\n`);
});

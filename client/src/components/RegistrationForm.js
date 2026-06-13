import React, { useState } from 'react';
import './RegistrationForm.css';

const initialForm = { name: '', email: '', phone: '' };
const initialErrors = { name: '', email: '', phone: '' };

const validate = (form) => {
  const errors = { name: '', email: '', phone: '' };
  let valid = true;

  if (!form.name.trim()) {
    errors.name = 'Full name is required';
    valid = false;
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) {
    errors.email = 'Email address is required';
    valid = false;
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email address';
    valid = false;
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  const cleanPhone = form.phone.replace(/\s+/g, '').replace(/-/g, '');
  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required';
    valid = false;
  } else if (!phoneRegex.test(cleanPhone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number';
    valid = false;
  }

  return { errors, valid };
};

const RegistrationForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (touched[name]) {
      const { errors: newErrors } = validate({ ...form, [name]: value });
      setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    const { errors: newErrors } = validate(form);
    setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true });
    const { errors: newErrors, valid } = validate(form);
    setErrors(newErrors);
    if (!valid) return;

    setLoading(true);
    setApiError('');

    try {
      const url = process.env.REACT_APP_API_URL || '';
      const response = await fetch(`${url}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setApiError(data.message || 'Something went wrong. Please try again.');
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setApiError('Unable to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="register" className="register register--success">
        <div className="container">
          <div className="success-card">
            <div className="success-card__emoji">🎉</div>
            <h2 className="success-card__title">You're on the list!</h2>
            <p className="success-card__text">
              Thanks <strong>{form.name.split(' ')[0]}</strong>! We've received your enquiry and will reach out to{' '}
              <strong>{form.email}</strong> within 24 hours with enrollment details.
            </p>
            <div className="success-card__steps">
              <div className="success-step">
                <div className="success-step__num">1</div>
                <div className="success-step__label">Check your inbox for a confirmation email</div>
              </div>
              <div className="success-step">
                <div className="success-step__num">2</div>
                <div className="success-step__label">Our team will call you to complete enrollment</div>
              </div>
              <div className="success-step">
                <div className="success-step__num">3</div>
                <div className="success-step__label">Get your welcome kit and join the cohort!</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="register">
      <div className="container">
        <div className="register__layout">
          <div className="register__left">
            <div className="section-eyebrow">Register Now</div>
            <h2 className="section-title" style={{ textAlign: 'left', color: 'var(--white)' }}>
              Secure your child's spot today
            </h2>
            <p className="section-desc" style={{ textAlign: 'left', color: 'rgba(255,255,255,0.6)' }}>
              Seats fill up fast. Drop your details and our team will reach out within 24 hours.
            </p>

            <div className="register__perks">
              {[
                ['🎁', 'Free trial class — no commitment'],
                ['🔒', 'Secure payment via Razorpay'],
                ['🏆', 'Certificate on completion'],
                ['📞', 'WhatsApp support available'],
              ].map(([icon, text], i) => (
                <div className="register__perk" key={i}>
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="register__price-tag">
              <div className="register__price-amount">₹2,999</div>
              <div className="register__price-info">
                <del style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>₹4,999</del>
                <span style={{ color: '#22c55e', fontWeight: 700, fontSize: '0.85rem' }}>40% OFF</span>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: 2 }}>Offer ends 30 June 2026</div>
              </div>
            </div>
          </div>

          <div className="register__form-wrapper">
            <div className="register__form-card">
              <h3 className="register__form-title">Send an Enquiry</h3>
              <p className="register__form-subtitle">Our team will contact you to complete registration</p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name</label>
                  <input
                    className={`form-input ${errors.name && touched.name ? 'form-input--error' : ''} ${!errors.name && touched.name && form.name ? 'form-input--valid' : ''}`}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g. Priya Sharma"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="name"
                  />
                  {errors.name && touched.name && (
                    <div className="form-error">⚠ {errors.name}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    className={`form-input ${errors.email && touched.email ? 'form-input--error' : ''} ${!errors.email && touched.email && form.email ? 'form-input--valid' : ''}`}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                  />
                  {errors.email && touched.email && (
                    <div className="form-error">⚠ {errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone Number</label>
                  <div className="phone-input-wrapper">
                    <span className="phone-prefix">🇮🇳 +91</span>
                    <input
                      className={`form-input phone-input ${errors.phone && touched.phone ? 'form-input--error' : ''} ${!errors.phone && touched.phone && form.phone ? 'form-input--valid' : ''}`}
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="9876543210"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="tel"
                      maxLength={10}
                    />
                  </div>
                  {errors.phone && touched.phone && (
                    <div className="form-error">⚠ {errors.phone}</div>
                  )}
                </div>

                {apiError && (
                  <div className="form-api-error">{apiError}</div>
                )}

                <button
                  type="submit"
                  className={`form-submit ${loading ? 'form-submit--loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="form-spinner-wrapper">
                      <span className="form-spinner"></span>
                      Submitting...
                    </span>
                  ) : (
                    'Send Enquiry →'
                  )}
                </button>

                <p className="form-privacy">
                  🔒 Your details are safe with us. No spam, ever.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;

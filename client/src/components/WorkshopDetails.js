import React from 'react';
import './WorkshopDetails.css';

const details = [
  { icon: '👦', label: 'Age Group', value: '8–14 Years', desc: 'Perfect for curious middle schoolers' },
  { icon: '⏱️', label: 'Duration', value: '4 Weeks', desc: '20 hours of live instruction' },
  { icon: '💻', label: 'Mode', value: 'Online', desc: 'Learn from anywhere, anytime' },
  { icon: '💰', label: 'Workshop Fee', value: '₹2,999', desc: 'One-time · No hidden charges' },
  { icon: '📅', label: 'Start Date', value: '15 July 2026', desc: 'Monday–Friday, 5–7 PM IST' },
  { icon: '🏅', label: 'Certification', value: 'Included', desc: 'KidRove verified certificate' },
];

const WorkshopDetails = () => {
  return (
    <section id="details" className="workshop-details">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">Workshop Info</div>
          <h2 className="section-title">Everything you need to know</h2>
          <p className="section-desc">
            All the details to help you decide. No fine print — what you see is what you get.
          </p>
        </div>

        <div className="details-grid">
          {details.map((item, i) => (
            <div className="detail-card" key={i}>
              <div className="detail-card__icon">{item.icon}</div>
              <div className="detail-card__label">{item.label}</div>
              <div className="detail-card__value">{item.value}</div>
              <div className="detail-card__desc">{item.desc}</div>
            </div>
          ))}
        </div>

        <div className="workshop-highlight">
          <div className="workshop-highlight__inner">
            <div className="workshop-highlight__text">
              <h3>What makes this workshop different?</h3>
              <p>
                Unlike typical online courses, KidRove's AI & Robotics workshop is built around
                <strong> doing</strong>, not just watching. Kids work on real projects, get live mentor feedback,
                and finish with a portfolio they can actually be proud of.
              </p>
              <ul className="workshop-highlight__list">
                <li>🧑‍💻 Live coding sessions, not pre-recorded videos</li>
                <li>🤝 Small batch sizes — max 20 students per cohort</li>
                <li>📦 Physical robot kit delivered to your home (optional add-on)</li>
                <li>👨‍👩‍👧 Weekly parent progress report</li>
              </ul>
            </div>
            <div className="workshop-highlight__badge-area">
              <div className="workshop-highlight__big-stat">
                <div className="stat-number">97%</div>
                <div className="stat-label">of past students would<br />recommend this workshop</div>
              </div>
              <div className="workshop-highlight__big-stat">
                <div className="stat-number">4.9★</div>
                <div className="stat-label">average rating<br />across 200+ reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopDetails;

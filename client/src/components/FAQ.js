import React, { useState } from 'react';
import './FAQ.css';

const faqs = [
  {
    q: 'Does my child need prior coding experience?',
    a: 'Not at all! The workshop is designed for complete beginners. We start with block-based programming before moving to Python, so every child can follow along at their own pace. Our mentors are trained to support learners at all levels.',
  },
  {
    q: 'What equipment does my child need?',
    a: 'Just a laptop or desktop with a stable internet connection and a modern browser. We provide all software tools (free). An optional physical robot kit is available as an add-on for ₹1,499, but it\'s not required to complete the workshop.',
  },
  {
    q: 'What are the class timings, and are sessions recorded?',
    a: 'Live sessions run Monday to Friday, 5–7 PM IST. All sessions are recorded and available for 30 days after the workshop ends, so your child never misses out due to a schedule conflict.',
  },
  {
    q: 'Is there a refund policy?',
    a: 'Yes! We offer a full refund if you request it within 5 days of enrollment, or within 48 hours of the first class — whichever comes first. No questions asked.',
  },
  {
    q: 'Will my child get personalized attention?',
    a: 'Absolutely. Each cohort has a maximum of 20 students. Every student gets at least one dedicated 1:1 feedback session per week with a mentor, plus access to a moderated Discord channel for daily Q&A.',
  },
];

const FAQItem = ({ q, a, isOpen, onClick }) => (
  <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
    <button className="faq-item__question" onClick={onClick} aria-expanded={isOpen}>
      <span>{q}</span>
      <span className="faq-item__icon">{isOpen ? '−' : '+'}</span>
    </button>
    <div className="faq-item__answer" style={{ maxHeight: isOpen ? '400px' : '0' }}>
      <p>{a}</p>
    </div>
  </div>
);

const FAQ = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="faq">
      <div className="container">
        <div className="faq__layout">
          <div className="faq__left">
            <div className="section-eyebrow">FAQ</div>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Questions parents usually ask
            </h2>
            <p className="section-desc" style={{ textAlign: 'left' }}>
              Still have something on your mind? Reach us at{' '}
              <a href="mailto:hello@kidrove.com" className="faq__link">
                hello@kidrove.com
              </a>
            </p>
            <div className="faq__contact-card">
              <div className="faq__contact-avatar">💬</div>
              <div>
                <div className="faq__contact-name">KidRove Support</div>
                <div className="faq__contact-status">
                  <span className="faq__status-dot"></span>
                  Usually responds in under 2 hours
                </div>
              </div>
            </div>
          </div>

          <div className="faq__items">
            {faqs.map((item, i) => (
              <FAQItem
                key={i}
                q={item.q}
                a={item.a}
                isOpen={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

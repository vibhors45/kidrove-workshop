import React, { useEffect, useRef } from 'react';
import './Hero.css';

const FloatingOrb = ({ style }) => (
  <div className="hero__orb" style={style} />
);

const Hero = () => {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      {/* Ambient background orbs */}
      <FloatingOrb style={{ top: '10%', left: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)' }} />
      <FloatingOrb style={{ top: '40%', right: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)' }} />
      <FloatingOrb style={{ bottom: '5%', left: '30%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)' }} />

      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot"></span>
            Enrollments Open · Limited Seats
          </div>

          <h1 className="hero__title">
            AI & Robotics
            <span className="hero__title-accent"> Summer</span>
            <br />Workshop
          </h1>

          <p className="hero__subtitle">
            Where curious kids become tomorrow's innovators. Hands-on projects,
            real robots, and the thinking skills that define the next generation.
          </p>

          <div className="hero__meta">
            <div className="hero__meta-item">
              <span className="hero__meta-icon">📅</span>
              <div>
                <div className="hero__meta-label">Starts</div>
                <div className="hero__meta-value">15 July 2026</div>
              </div>
            </div>
            <div className="hero__meta-divider" />
            <div className="hero__meta-item">
              <span className="hero__meta-icon">👦</span>
              <div>
                <div className="hero__meta-label">Age Group</div>
                <div className="hero__meta-value">8–14 Years</div>
              </div>
            </div>
            <div className="hero__meta-divider" />
            <div className="hero__meta-item">
              <span className="hero__meta-icon">💻</span>
              <div>
                <div className="hero__meta-label">Mode</div>
                <div className="hero__meta-value">Online</div>
              </div>
            </div>
          </div>

          <div className="hero__actions">
            <button className="hero__btn-primary" onClick={() => scrollTo('register')}>
              Enroll Now · ₹2,999
              <span className="hero__btn-arrow">→</span>
            </button>
            <button className="hero__btn-secondary" onClick={() => scrollTo('details')}>
              Learn More
            </button>
          </div>

          <div className="hero__trust">
            <div className="hero__trust-avatars">
              {['👧', '👦', '👧', '👦'].map((emoji, i) => (
                <div key={i} className="hero__trust-avatar">{emoji}</div>
              ))}
            </div>
            <span className="hero__trust-text">
              <strong>500+</strong> young innovators already enrolled
            </span>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__robot-card">
            <div className="hero__robot-screen">
              <div className="hero__robot-header">
                <div className="hero__dot red"></div>
                <div className="hero__dot yellow"></div>
                <div className="hero__dot green"></div>
                <span>robot.py</span>
              </div>
              <div className="hero__code">
                <div className="hero__code-line">
                  <span className="kw">import</span>
                  <span className="nm"> robot</span>
                  <span className="kw">, ai</span>
                </div>
                <div className="hero__code-line">
                  <span className="kw">def</span>
                  <span className="fn"> think</span>
                  <span className="plain">(</span>
                  <span className="nm">self</span>
                  <span className="plain">):</span>
                </div>
                <div className="hero__code-line indent">
                  <span className="nm">brain</span>
                  <span className="plain"> = </span>
                  <span className="fn">ai.learn</span>
                  <span className="plain">()</span>
                </div>
                <div className="hero__code-line indent">
                  <span className="kw">return</span>
                  <span className="st"> "🚀 Ready!"</span>
                </div>
                <div className="hero__code-line hero__code-cursor">
                  <span className="muted">▍</span>
                </div>
              </div>
            </div>
            <div className="hero__robot-stats">
              <div className="hero__robot-stat">
                <span className="hero__robot-stat-value">4</span>
                <span className="hero__robot-stat-label">Weeks</span>
              </div>
              <div className="hero__robot-stat">
                <span className="hero__robot-stat-value">15+</span>
                <span className="hero__robot-stat-label">Projects</span>
              </div>
              <div className="hero__robot-stat">
                <span className="hero__robot-stat-value">Live</span>
                <span className="hero__robot-stat-label">Mentors</span>
              </div>
            </div>
          </div>

          <div className="hero__floating-tag hero__floating-tag--1">🏆 Certificate</div>
          <div className="hero__floating-tag hero__floating-tag--2">🤖 Build a Bot</div>
          <div className="hero__floating-tag hero__floating-tag--3">🧠 Learn AI</div>
        </div>
      </div>

      <div className="hero__scroll-hint">
        <div className="hero__scroll-line"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;

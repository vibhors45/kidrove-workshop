import React, { useState, useEffect, useRef } from 'react';
import './LearningOutcomes.css';

const outcomes = [
  {
    icon: '🤖',
    title: 'Build a Working Robot',
    desc: 'Design, program, and control your own robot using block-based and Python programming. Go from zero to deploying a real, moving machine.',
    tag: 'Hands-On'
  },
  {
    icon: '🧠',
    title: 'Understand AI Fundamentals',
    desc: 'Learn how machine learning works — image recognition, pattern detection, and decision-making — without overwhelming math.',
    tag: 'Concept'
  },
  {
    icon: '💻',
    title: 'Code in Python',
    desc: 'Write real Python scripts from day one. Control hardware, build logic, and solve problems — the same language pros use.',
    tag: 'Skill'
  },
  {
    icon: '🎯',
    title: 'Solve Real Problems with Logic',
    desc: 'Tackle age-appropriate engineering challenges: line-following robots, obstacle detectors, and smart sorting systems.',
    tag: 'Problem Solving'
  },
  {
    icon: '🎨',
    title: 'Design Thinking & Creativity',
    desc: 'Every project starts with a problem statement. Kids learn to ideate, prototype, fail fast, and iterate — just like real engineers.',
    tag: 'Mindset'
  },
  {
    icon: '🏅',
    title: 'Graduate with a Portfolio',
    desc: 'Complete 5+ mini-projects and a final capstone. Leave with a shareable portfolio and a KidRove-verified digital certificate.',
    tag: 'Achievement'
  },
];

const LearningOutcomes = () => {
  const [visible, setVisible] = useState([]);
  const refs = useRef([]);

  useEffect(() => {
    const observers = refs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(prev => [...new Set([...prev, i])]);
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach(obs => obs?.disconnect());
  }, []);

  return (
    <section id="outcomes" className="outcomes">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">Learning Outcomes</div>
          <h2 className="section-title">What your child will <span className="title-highlight">actually</span> learn</h2>
          <p className="section-desc">
            Six concrete, observable skills — not just "exposure to technology."
          </p>
        </div>

        <div className="outcomes-grid">
          {outcomes.map((item, i) => (
            <div
              key={i}
              ref={el => refs.current[i] = el}
              className={`outcome-card ${visible.includes(i) ? 'outcome-card--visible' : ''}`}
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <div className="outcome-card__top">
                <div className="outcome-card__icon">{item.icon}</div>
                <span className="outcome-card__tag">{item.tag}</span>
              </div>
              <h3 className="outcome-card__title">{item.title}</h3>
              <p className="outcome-card__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningOutcomes;

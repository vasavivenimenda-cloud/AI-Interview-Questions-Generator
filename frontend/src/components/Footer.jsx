import React from 'react';
import { Sparkles, Code2, Heart, Award, ArrowUp } from 'lucide-react';

export default function Footer({ setActivePage }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--bg-surface)',
      padding: '3rem 1.5rem 2rem',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          
          {/* Brand info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
              <div className="nav-brand-icon" style={{ width: 30, height: 30 }}>
                <Sparkles size={16} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                AI Interview <span className="gradient-text">Generator</span>
              </h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
              Prepare Smarter. Practice Better. Get Interview Ready. Personalized AI-powered question generator, interactive mock interviews, and real-time grading for students & professionals.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-tech">Vite + React 19</span>
              <span className="badge badge-coding">Node.js Express</span>
              <span className="badge badge-system">Gemini & OpenAI Ready</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Explore Platform
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li>
                <a onClick={() => { setActivePage('landing'); scrollToTop(); }} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  Platform Overview
                </a>
              </li>
              <li>
                <a onClick={() => { setActivePage('dashboard'); scrollToTop(); }} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  Candidate Dashboard
                </a>
              </li>
              <li>
                <a onClick={() => { setActivePage('generate'); scrollToTop(); }} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  Question Bank & Generator
                </a>
              </li>
              <li>
                <a onClick={() => { setActivePage('mock'); scrollToTop(); }} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  Interactive Mock Interview
                </a>
              </li>
              <li>
                <a onClick={() => { setActivePage('history'); scrollToTop(); }} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  Past Interview Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Supported Domains */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Supported Tracks
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['Full Stack Developer', 'Frontend (React/Vue)', 'Backend (Node/Python/Java)', 'Data Structures & Algorithms', 'System Design', 'HR STAR Framework', 'DevOps & Cloud', 'Behavioral Scenarios'].map((trk, i) => (
                <span 
                  key={i} 
                  style={{ 
                    fontSize: '0.78rem', 
                    padding: '0.2rem 0.55rem', 
                    background: 'rgba(255,255,255,0.04)', 
                    borderRadius: 'var(--radius-sm)', 
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  {trk}
                </span>
              ))}
            </div>
          </div>

          {/* Major Project Note */}
          <div>
            <div className="glass-card" style={{ padding: '1.2rem', border: '1px solid var(--border-glow)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#a5b4fc' }}>
                <Award size={18} />
                <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>College Major Project</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Engineered as a full-stack portfolio & capstone system showcasing generative AI, automated rubric scoring, and interactive exam simulations.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.82rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} AI Interview Questions Generator. All rights reserved.
          </div>
          <button
            onClick={scrollToTop}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.78rem', gap: '0.35rem' }}
          >
            <ArrowUp size={14} /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}

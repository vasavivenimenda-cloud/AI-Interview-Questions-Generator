import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Cpu,
  Database,
  Code2,
  ShieldCheck,
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Footer Section */}
        <div className="footer-top-grid">
          {/* Brand Info Column */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <div className="brand-icon-wrapper small">
                <Sparkles size={18} />
              </div>
              <span className="footer-brand-title">AI Interview Questions Generator</span>
            </div>
            <p className="footer-tagline">
              "Prepare Smarter. Practice Better. Get Interview Ready."
            </p>
            <p className="footer-mission">
              Empowering developers and tech professionals to master technical, system design,
              and behavioral interviews with personalized AI assessment and actionable feedback.
            </p>
            <div className="footer-badges-list">
              <span className="footer-pill">
                <Code2 size={12} /> React 19 + Vite
              </span>
              <span className="footer-pill">
                <Database size={12} /> Express + SQLite
              </span>
              <span className="footer-pill">
                <Cpu size={12} /> AI Assisted
              </span>
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="footer-link">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/generate" className="footer-link">
                  Generate Questions
                </Link>
              </li>
              <li>
                <Link to="/mock-interview" className="footer-link">
                  Mock Interview
                </Link>
              </li>
              <li>
                <Link to="/history" className="footer-link">
                  Interview History
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Features Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Key Capabilities</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/generate" className="footer-link">
                  AI Question Generation
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="footer-link">
                  Personalized Interviews
                </Link>
              </li>
              <li>
                <Link to="/mock-interview" className="footer-link">
                  Real-Time Mock Simulation
                </Link>
              </li>
              <li>
                <Link to="/mock-interview" className="footer-link">
                  Rubric & STAR Evaluation
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="footer-link">
                  Performance Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture & Tech Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">System Architecture</h4>
            <div className="footer-arch-card">
              <div className="arch-item">
                <span className="arch-dot online"></span>
                <span>Frontend: Single Page App (SPA)</span>
              </div>
              <div className="arch-item">
                <span className="arch-dot online"></span>
                <span>REST API: Express Router (Port 5000)</span>
              </div>
              <div className="arch-item">
                <span className="arch-dot online"></span>
                <span>Database: SQLite Persistent Store</span>
              </div>
              <div className="arch-item">
                <span className="arch-dot online"></span>
                <span>Theme Engine: High-Contrast Dark/Light</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Section */}
        <div className="footer-bottom-bar">
          <p className="footer-copy-text">
            &copy; {new Date().getFullYear()} AI Interview Questions Generator. College Major & Portfolio Showcase Project.
          </p>
          <div className="footer-bottom-links">
            <span className="security-badge">
              <ShieldCheck size={14} className="text-emerald" /> Safe & Local SQLite Persistence
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

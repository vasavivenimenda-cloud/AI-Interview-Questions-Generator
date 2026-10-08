import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  BrainCircuit,
  Mic,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  ArrowRight,
  BarChart3,
  AlertCircle,
} from 'lucide-react';

export const DashboardPage = () => {
  const readinessMetrics = [
    { skill: 'Data Structures & Algorithms', score: 88, status: 'Strong', color: '#10b981' },
    { skill: 'System Design & Architecture', score: 79, status: 'Intermediate', color: '#6366f1' },
    { skill: 'Frontend & React Ecosystem', score: 94, status: 'Advanced', color: '#06b6d4' },
    { skill: 'Node.js & Backend Concurrency', score: 82, status: 'Proficient', color: '#8b5cf6' },
    { skill: 'Behavioral & STAR Method', score: 75, status: 'Needs Polish', color: '#f59e0b' },
  ];

  const recentSessions = [
    {
      role: 'Full Stack Engineer (MERN)',
      date: 'Yesterday, 4:30 PM',
      duration: '25 min',
      score: 92,
      type: 'Technical & System Design',
    },
    {
      role: 'Frontend Specialist (React 19)',
      date: 'Oct 06, 2026',
      duration: '18 min',
      score: 88,
      type: 'Component Architecture',
    },
    {
      role: 'Backend Developer (Express/SQLite)',
      date: 'Oct 03, 2026',
      duration: '30 min',
      score: 85,
      type: 'Database Query Optimization',
    },
  ];

  return (
    <div className="placeholder-page dashboard-page">
      {/* Page Header */}
      <div className="placeholder-header">
        <div className="header-badge">
          <LayoutDashboard size={14} /> Candidate Performance Overview
        </div>
        <h1 className="placeholder-title">
          Interview Readiness <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="placeholder-subtitle">
          Track your progress across technical domains, monitor mock interview scores, and identify
          areas for targeted practice.
        </p>
      </div>

      {/* Top Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">Overall Readiness</span>
            <Award size={18} className="text-emerald" />
          </div>
          <div className="metric-value">86%</div>
          <span className="metric-sub">Interview Ready Tier</span>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">Questions Practiced</span>
            <BrainCircuit size={18} className="text-indigo" />
          </div>
          <div className="metric-value">42</div>
          <span className="metric-sub">Across 8 categories</span>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">Mock Interviews</span>
            <Mic size={18} className="text-pink" />
          </div>
          <div className="metric-value">7</div>
          <span className="metric-sub">Average Score: 88.3</span>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">Practice Streak</span>
            <TrendingUp size={18} className="text-amber" />
          </div>
          <div className="metric-value">5 Days</div>
          <span className="metric-sub">Top 15% consistency</span>
        </div>
      </div>

      {/* Main Grid: Readiness Breakdown & Quick Actions */}
      <div className="dashboard-content-grid">
        {/* Left Column: Skill Mastery Bars */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3>
              <BarChart3 size={18} /> Domain Mastery & Readiness
            </h3>
            <span className="badge-pill">AI Calibrated</span>
          </div>

          <div className="skills-bars-list">
            {readinessMetrics.map((item) => (
              <div key={item.skill} className="skill-item">
                <div className="skill-info">
                  <span className="skill-title">{item.skill}</span>
                  <div className="skill-meta">
                    <span className="skill-status-tag" style={{ color: item.color }}>
                      {item.status}
                    </span>
                    <span className="skill-percentage">{item.score}%</span>
                  </div>
                </div>
                <div className="skill-progress-track">
                  <div
                    className="skill-progress-bar"
                    style={{
                      width: `${item.score}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Launch Actions */}
        <div className="dashboard-card action-column-card">
          <div className="dashboard-card-header">
            <h3>
              <Sparkles size={18} /> Quick Actions
            </h3>
          </div>

          <div className="quick-actions-list">
            <div className="action-tile">
              <div className="action-tile-icon indigo-bg">
                <BrainCircuit size={20} />
              </div>
              <div className="action-tile-content">
                <h4>Generate Questions</h4>
                <p>Generate role-specific technical and behavioral questions.</p>
              </div>
              <Link to="/generate" className="btn btn-primary btn-sm">
                <span>Start</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="action-tile">
              <div className="action-tile-icon pink-bg">
                <Mic size={20} />
              </div>
              <div className="action-tile-content">
                <h4>Take Mock Interview</h4>
                <p>Experience real-time timed mock rounds with AI scoring.</p>
              </div>
              <Link to="/mock-interview" className="btn btn-secondary btn-sm">
                <span>Simulate</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="action-tile">
              <div className="action-tile-icon violet-bg">
                <Clock size={20} />
              </div>
              <div className="action-tile-content">
                <h4>Interview History</h4>
                <p>Review past answer transcripts, scores, and critiques.</p>
              </div>
              <Link to="/history" className="btn btn-secondary btn-sm">
                <span>History</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Planned Features Notice */}
          <div className="roadmap-notice-box">
            <AlertCircle size={16} className="notice-icon" />
            <div>
              <strong>Roadmap Preview:</strong>
              <p>
                Dynamic cloud sync, GitHub portfolio export, and automated resume parsing
                integrations are scheduled for the next development sprint.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="dashboard-card mt-6">
        <div className="dashboard-card-header">
          <h3>
            <Clock size={18} /> Recent Practice Sessions
          </h3>
          <Link to="/history" className="link-subtle">
            View All History →
          </Link>
        </div>

        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Target Role</th>
                <th>Round Type</th>
                <th>Date & Time</th>
                <th>Duration</th>
                <th>AI Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentSessions.map((session, i) => (
                <tr key={i}>
                  <td className="font-semibold">{session.role}</td>
                  <td>{session.type}</td>
                  <td className="text-muted">{session.date}</td>
                  <td>{session.duration}</td>
                  <td>
                    <span className="score-pill">{session.score}/100</span>
                  </td>
                  <td>
                    <span className="status-badge-completed">
                      <CheckCircle2 size={12} /> Evaluated
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

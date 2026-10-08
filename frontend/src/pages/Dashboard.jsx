import React from 'react';
import { 
  Sparkles, 
  Play, 
  HelpCircle, 
  Trophy, 
  Award, 
  CheckCircle, 
  ArrowUpRight, 
  TrendingUp, 
  Clock, 
  Target, 
  BookOpen, 
  ChevronRight,
  Code2,
  Brain,
  Cpu
} from 'lucide-react';
import ScoreDial from '../components/ScoreDial';

export default function Dashboard({ 
  stats, 
  profile, 
  interviews = [], 
  setActivePage, 
  onViewInterviewReport, 
  onStartMock 
}) {
  const avgScore = stats?.averageScore ?? 8.1;
  const bestScore = stats?.bestScore ?? 8.8;
  const totalQuestions = stats?.totalQuestionsPracticed ?? 24;
  const totalInterviews = stats?.totalInterviews ?? (interviews?.length || 2);

  // Recommended topics dynamically derived
  const recommendedTopics = [
    { title: "V8 Event Loop & Microtasks vs Macrotasks", category: "Technical", diff: "Medium" },
    { title: "Two-Pointer & Sliding Window Array Problems", category: "Coding", diff: "Easy/Medium" },
    { title: "Behavioral Conflict Resolution using STAR", category: "HR", diff: "Medium" },
    { title: "High-Throughput Caching & Rate Limiting", category: "System Design", diff: "Hard" }
  ];

  const getScoreColor = (score) => {
    if (score >= 8) return '#10b981';
    if (score >= 6) return '#f59e0b';
    return '#f43f5e';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Welcome Banner */}
      <div className="glass-card" style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(14, 19, 36, 0.8) 100%)',
        border: '1px solid var(--border-glow)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ maxWidth: '650px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="badge badge-tech">Candidate Dashboard</span>
            <span className="badge diff-easy">{profile?.experience || 'Fresher'} Track</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '0.5rem' }}>
            Welcome back, <span className="gradient-text">{profile?.name || 'Candidate'}</span>! 👋
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Ready to ace your target role as <strong style={{ color: 'var(--text-primary)' }}>{profile?.targetRole || 'Full Stack Developer'}</strong>? Practice customized questions or initiate a full mock interview session.
          </p>
        </div>

        {/* Quick Action CTAs */}
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <button
            onClick={onStartMock || (() => setActivePage('mock'))}
            className="btn btn-primary"
          >
            <Play size={16} fill="currentColor" /> Start New Interview
          </button>
          <button
            onClick={() => setActivePage('generate')}
            className="btn btn-secondary"
          >
            <HelpCircle size={16} /> Generate Questions
          </button>
        </div>
      </div>

      {/* Metrics & Performance Cards Grid */}
      <div className="stats-grid">
        {/* Metric 1: Average Score */}
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            <TrendingUp size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="stat-value" style={{ color: getScoreColor(avgScore) }}>
              {avgScore} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ 10</span>
            </div>
            <div className="stat-label">Average Score</div>
          </div>
          <ScoreDial score={avgScore} max={10} size={54} strokeWidth={5} label="" />
        </div>

        {/* Metric 2: Best Score */}
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <Trophy size={24} />
          </div>
          <div>
            <div className="stat-value" style={{ color: '#34d399' }}>
              {bestScore} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ 10</span>
            </div>
            <div className="stat-label">Best Mock Score</div>
          </div>
        </div>

        {/* Metric 3: Questions Practiced */}
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <div className="stat-value">
              {totalQuestions}
            </div>
            <div className="stat-label">Questions Practiced</div>
          </div>
        </div>

        {/* Metric 4: Total Mock Sessions */}
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: 'rgba(217, 70, 239, 0.15)', color: '#f0abfc', border: '1px solid rgba(217, 70, 239, 0.3)' }}>
            <Award size={24} />
          </div>
          <div>
            <div className="stat-value">
              {totalInterviews}
            </div>
            <div className="stat-label">Completed Sessions</div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        
        {/* Left Column: Previous Interviews */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} color="var(--primary)" /> Previous Interviews
            </h3>
            <button
              onClick={() => setActivePage('history')}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.8rem' }}
            >
              View All <ChevronRight size={14} />
            </button>
          </div>

          {interviews && interviews.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {interviews.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onViewInterviewReport(item)}
                  style={{
                    padding: '0.9rem 1rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                >
                  <div>
                    <h4 style={{ fontSize: '0.94rem', marginBottom: '0.2rem' }}>
                      {item.sessionName || `${item.targetRole} Mock`}
                    </h4>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>{new Date(item.completedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{item.interviewType}</span>
                      <span>•</span>
                      <span>{item.totalQuestions || (item.questions ? item.questions.length : 5)} Qs</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span className="badge diff-easy" style={{ fontSize: '0.84rem', fontWeight: 700 }}>
                        {item.overallScore} / 10
                      </span>
                    </div>
                    <ArrowUpRight size={16} color="var(--text-muted)" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
              <p>No interviews completed yet.</p>
              <button
                onClick={() => setActivePage('mock')}
                className="btn btn-primary btn-sm"
                style={{ marginTop: '0.8rem' }}
              >
                Take First Mock Interview
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Recommended Topics & Profile Snapshot */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Recommended Topics */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={18} color="var(--accent-cyan)" /> Recommended Focus Topics
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recommendedTopics.map((top, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePage('generate')}
                  style={{
                    padding: '0.8rem 1rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>{top.title}</h4>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <span className="badge badge-tech" style={{ fontSize: '0.7rem' }}>{top.category}</span>
                      <span className="badge diff-medium" style={{ fontSize: '0.7rem' }}>{top.diff}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          </div>

          {/* Profile Overview Card */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Target Profile Snapshot</h3>
              <button
                onClick={() => setActivePage('profile')}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.8rem' }}
              >
                Edit
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Role:</span>
                <strong>{profile?.targetRole || 'Full Stack Developer'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Experience:</span>
                <strong>{profile?.experience || 'Fresher'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Language:</span>
                <strong>{profile?.programmingLanguage || 'JavaScript'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Type:</span>
                <strong>{profile?.preferredInterviewType || 'Technical Interview'}</strong>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Calendar, 
  Trash2, 
  Eye, 
  Play, 
  Award, 
  TrendingUp, 
  ChevronRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import ScoreDial from '../components/ScoreDial';

export default function InterviewHistory({
  interviews = [],
  onOpenReport,
  onDeleteInterview,
  onStartNewMock,
  onToast
}) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');

  // Filtered interviews
  const filtered = interviews.filter(item => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchRole = item.targetRole && item.targetRole.toLowerCase().includes(q);
      const matchName = item.sessionName && item.sessionName.toLowerCase().includes(q);
      if (!matchRole && !matchName) return false;
    }

    if (filterType !== 'All' && item.interviewType !== filterType) return false;
    if (filterDifficulty !== 'All' && item.difficulty.toLowerCase() !== filterDifficulty.toLowerCase()) return false;

    return true;
  });

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this interview record?')) {
      onDeleteInterview(id);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>
            Interview <span className="gradient-text">History & Archive</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
            Review past mock interview sessions, monitor score improvements, and revisit answer feedback.
          </p>
        </div>

        <button onClick={onStartNewMock} className="btn btn-primary">
          <Play size={16} fill="currentColor" /> Take New Mock Interview
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card" style={{ padding: '1.2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'center' }}>
          
          <div style={{ position: 'relative', gridColumn: 'span 2', minWidth: '260px' }}>
            <Search size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="input-field"
              placeholder="Search by job role or session name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '2.4rem' }}
            />
          </div>

          <div>
            <select
              className="select-field"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Interview Types</option>
              <option value="Technical Interview">Technical Interview</option>
              <option value="HR Interview">HR Interview</option>
              <option value="Coding Interview">Coding Interview</option>
              <option value="Behavioral Interview">Behavioral Interview</option>
              <option value="Scenario-Based Interview">Scenario-Based Interview</option>
              <option value="Mixed Interview">Mixed Interview</option>
            </select>
          </div>

          <div>
            <select
              className="select-field"
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

        </div>
      </div>

      {/* History Cards List */}
      <div>
        {filtered.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenReport(item)}
                className="glass-card"
                style={{
                  padding: '1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.2rem',
                  cursor: 'pointer'
                }}
              >
                {/* Left: Info */}
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    <span className="badge badge-tech">{item.interviewType}</span>
                    <span className="badge diff-medium">{item.difficulty}</span>
                    <span className="badge" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      {item.experience || 'Fresher'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>
                    {item.sessionName || `${item.targetRole} Mock Interview`}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={13} /> {new Date(item.completedAt).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>{item.totalQuestions || (item.questions ? item.questions.length : 5)} Questions</span>
                    <span>•</span>
                    <span>Role: {item.targetRole}</span>
                  </div>
                </div>

                {/* Right: Scores & Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: item.overallScore >= 7.5 ? '#10b981' : item.overallScore >= 6 ? '#f59e0b' : '#f43f5e', lineHeight: 1 }}>
                      {item.overallScore} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ 10</span>
                    </div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {item.percentage ? `${item.percentage}% Score` : 'Mock Score'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenReport(item); }}
                      className="btn btn-secondary btn-sm"
                      title="View detailed report"
                    >
                      <Eye size={15} /> Report
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="btn btn-ghost btn-sm"
                      style={{ color: 'var(--accent-rose)' }}
                      title="Delete record"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card" style={{ padding: '3.5rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <History size={44} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3>No interview records found</h3>
            <p style={{ marginTop: '0.4rem', maxWidth: '400px', margin: '0.4rem auto 1.5rem' }}>
              You haven't completed any interviews matching these filters yet.
            </p>
            <button onClick={onStartNewMock} className="btn btn-primary">
              <Play size={16} fill="currentColor" /> Take Mock Interview Now
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

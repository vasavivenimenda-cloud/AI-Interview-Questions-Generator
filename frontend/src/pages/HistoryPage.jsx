import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  History,
  Search,
  Filter,
  Calendar,
  Clock,
  Award,
  FileText,
  CheckCircle2,
  Mic,
  ArrowRight,
  ExternalLink,
  BrainCircuit,
  Sparkles,
} from 'lucide-react';

export const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All');

  const historyRecords = [
    {
      id: 1,
      role: 'Full Stack Engineer',
      topic: 'React Virtual DOM & Node Event Loop',
      date: 'Oct 07, 2026',
      duration: '24 min',
      score: 93,
      strengths: 'Deep mental model of Node microtask queue and React fibers.',
      improvements: 'Elaborate more on Redis pub/sub cluster failure recovery.',
    },
    {
      id: 2,
      role: 'Backend & Cloud Architect',
      topic: 'Distributed Transactions & Saga Pattern',
      date: 'Oct 05, 2026',
      duration: '32 min',
      score: 89,
      strengths: 'Clear explanation of compensating transactions and idempotency.',
      improvements: 'Mention outbox pattern implementation details with CDC.',
    },
    {
      id: 3,
      role: 'Frontend Engineer',
      topic: 'Core Web Vitals & Hydration Optimization',
      date: 'Oct 02, 2026',
      duration: '19 min',
      score: 95,
      strengths: 'Thorough coverage of INP, LCP, and selective hydration.',
      improvements: 'Include streaming SSR server overhead trade-offs.',
    },
  ];

  const filtered = historyRecords.filter((rec) => {
    const matchRole = selectedRoleFilter === 'All' || rec.role.includes(selectedRoleFilter);
    const matchSearch =
      searchTerm === '' ||
      rec.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.topic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <div className="placeholder-page history-page">
      {/* Header */}
      <div className="placeholder-header">
        <div className="header-badge">
          <History size={14} /> Session Archive & Historical Rubrics
        </div>
        <h1 className="placeholder-title">
          Interview <span className="gradient-text">History & Transcripts</span>
        </h1>
        <p className="placeholder-subtitle">
          Review your previous mock interview sessions, audio transcripts, and AI rubric evaluations
          to benchmark your progress.
        </p>
      </div>

      {/* Backend Integration Roadmap Banner */}
      <div className="integration-banner">
        <div className="integration-badge">
          <Sparkles size={14} /> SQLite Database Integration
        </div>
        <p className="integration-text">
          <strong>Persistent History Archiving:</strong> In the current build, all generated
          interview questions and favorites are persisted in SQLite. Full audio transcripts and
          session recording summaries will be stored in the session history tables in the upcoming release.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="filters-panel">
        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search past interview sessions or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
              &times;
            </button>
          )}
        </div>

        <div className="filter-controls">
          <div className="select-pill">
            <label>Filter Role:</label>
            <select
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value)}
            >
              <option value="All">All Roles</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Backend">Backend</option>
              <option value="Frontend">Frontend</option>
            </select>
          </div>

          <Link to="/mock-interview" className="btn btn-primary btn-sm ml-auto">
            <Mic size={14} /> New Mock Session
          </Link>
        </div>
      </div>

      {/* Session Records List */}
      <div className="history-records-list">
        {filtered.map((record) => (
          <div key={record.id} className="history-card">
            <div className="history-card-header">
              <div className="history-role-info">
                <span className="history-role-title">{record.role}</span>
                <span className="history-topic">{record.topic}</span>
              </div>

              <div className="history-score-badge">
                <Award size={16} className="text-emerald" />
                <span className="score-val">{record.score}</span>
                <span className="score-label">/100</span>
              </div>
            </div>

            <div className="history-meta-row">
              <span className="meta-item">
                <Calendar size={13} /> {record.date}
              </span>
              <span className="meta-item">
                <Clock size={13} /> {record.duration}
              </span>
              <span className="meta-item">
                <CheckCircle2 size={13} className="text-emerald" /> AI Evaluated
              </span>
            </div>

            <div className="history-feedback-preview">
              <div className="feedback-col">
                <span className="feedback-label text-emerald">Key Strength:</span>
                <p>{record.strengths}</p>
              </div>
              <div className="feedback-col">
                <span className="feedback-label text-amber">Area to Polish:</span>
                <p>{record.improvements}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Navigation Footer */}
      <div className="history-bottom-banner">
        <div>
          <h4>Looking to generate specific role questions?</h4>
          <p>Explore our full SQLite Question Bank with custom filters.</p>
        </div>
        <Link to="/generate" className="btn btn-secondary">
          <BrainCircuit size={16} /> Open Question Generator
        </Link>
      </div>
    </div>
  );
};

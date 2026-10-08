import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Bookmark, 
  Copy, 
  Check, 
  Code2, 
  Play, 
  Sparkles, 
  BookOpen, 
  Terminal, 
  HelpCircle,
  Cpu
} from 'lucide-react';

export default function QuestionCard({ 
  question, 
  onToggleFavorite, 
  onPractice, 
  onToast 
}) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeCodingTab, setActiveCodingTab] = useState('problem'); // 'problem', 'approach', 'solution'

  const {
    id,
    question: qText,
    category = 'Technical',
    difficulty = 'Medium',
    jobRole,
    skills,
    programmingLanguage,
    expectedAnswer,
    explanation,
    keyPoints = [],
    codingDetails,
    isFavorite = false
  } = question;

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(qText);
    setCopied(true);
    if (onToast) onToast('Question copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) onToggleFavorite(id);
  };

  const getCategoryBadgeClass = (cat) => {
    switch (cat) {
      case 'Technical': return 'badge-tech';
      case 'HR': return 'badge-hr';
      case 'Coding': return 'badge-coding';
      case 'Behavioral': return 'badge-behavioral';
      case 'System Design': return 'badge-system';
      case 'Scenario-Based': return 'badge-scenario';
      default: return 'badge-tech';
    }
  };

  const getDiffBadgeClass = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy': return 'diff-easy';
      case 'hard': return 'diff-hard';
      default: return 'diff-medium';
    }
  };

  return (
    <div className="glass-card" style={{ padding: '1.4rem', marginBottom: '1.2rem' }}>
      {/* Top Header / Meta Badges */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className={`badge ${getCategoryBadgeClass(category)}`}>
            {category === 'Coding' && <Code2 size={13} />}
            {category === 'System Design' && <Cpu size={13} />}
            {category}
          </span>
          <span className={`badge ${getDiffBadgeClass(difficulty)}`}>
            {difficulty}
          </span>
          {programmingLanguage && programmingLanguage !== 'General' && (
            <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-secondary)' }}>
              {programmingLanguage}
            </span>
          )}
          {jobRole && (
            <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.08)', color: 'var(--text-secondary)' }}>
              {jobRole}
            </span>
          )}
        </div>

        {/* Action icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            onClick={handleCopy}
            className="btn btn-ghost btn-sm"
            title="Copy question text"
            style={{ padding: '0.35rem' }}
          >
            {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
          </button>
          <button
            onClick={handleFavorite}
            className="btn btn-ghost btn-sm"
            title={isFavorite ? "Remove from bookmarks" : "Bookmark question"}
            style={{ padding: '0.35rem', color: isFavorite ? '#f59e0b' : 'inherit' }}
          >
            <Bookmark size={16} fill={isFavorite ? '#f59e0b' : 'none'} />
          </button>
          {onPractice && (
            <button
              onClick={() => onPractice(question)}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
            >
              <Play size={13} fill="currentColor" /> Practice
            </button>
          )}
        </div>
      </div>

      {/* Main Question Text */}
      <h3 style={{ fontSize: '1.12rem', fontWeight: 700, lineHeight: 1.45, marginBottom: '0.75rem' }}>
        {qText}
      </h3>

      {/* Skills pills */}
      {skills && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.9rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Skills tested:</span>
          {skills.split(',').map((s, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '0.74rem',
                padding: '0.15rem 0.5rem',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)'
              }}
            >
              {s.trim()}
            </span>
          ))}
        </div>
      )}

      {/* Coding Specific Details Panel (if applicable) */}
      {codingDetails && (
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          {/* Coding Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
            <button
              onClick={() => setActiveCodingTab('problem')}
              className={`btn btn-sm ${activeCodingTab === 'problem' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ fontSize: '0.78rem' }}
            >
              <Terminal size={13} /> Problem Specs
            </button>
            <button
              onClick={() => setActiveCodingTab('approach')}
              className={`btn btn-sm ${activeCodingTab === 'approach' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ fontSize: '0.78rem' }}
            >
              <Cpu size={13} /> Expected Approach
            </button>
            <button
              onClick={() => setActiveCodingTab('solution')}
              className={`btn btn-sm ${activeCodingTab === 'solution' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ fontSize: '0.78rem' }}
            >
              <Code2 size={13} /> Complexity & Solution
            </button>
          </div>

          {activeCodingTab === 'problem' && (
            <div style={{ fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ color: 'var(--text-secondary)' }}>{codingDetails.problemStatement}</p>
              {codingDetails.input && (
                <div>
                  <strong style={{ color: 'var(--accent-cyan)' }}>Input: </strong>
                  <code>{codingDetails.input}</code>
                </div>
              )}
              {codingDetails.output && (
                <div>
                  <strong style={{ color: 'var(--accent-emerald)' }}>Output: </strong>
                  <code>{codingDetails.output}</code>
                </div>
              )}
              {codingDetails.constraints && (
                <div>
                  <strong style={{ color: 'var(--accent-amber)' }}>Constraints: </strong>
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {codingDetails.constraints}
                  </pre>
                </div>
              )}
              {codingDetails.example && (
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Example: </strong>
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#93c5fd' }}>
                    {codingDetails.example}
                  </pre>
                </div>
              )}
            </div>
          )}

          {activeCodingTab === 'approach' && (
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <h4 style={{ fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Algorithmic Strategy:</h4>
              <p>{codingDetails.expectedApproach}</p>
            </div>
          )}

          {activeCodingTab === 'solution' && (
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <h4 style={{ fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Solution Analysis:</h4>
              <p>{codingDetails.solutionExplanation}</p>
            </div>
          )}
        </div>
      )}

      {/* Expand / Collapse Toggle for Answer and Key Points */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="btn btn-secondary btn-sm"
        style={{ width: '100%', justifyContent: 'space-between', padding: '0.6rem 0.9rem', fontSize: '0.85rem' }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={14} color="#8b5cf6" />
          {expanded ? "Hide Expected Answer & Key Points" : "View AI Expected Answer & Key Points"}
        </span>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Collapsible Answer & Key Points Section */}
      {expanded && (
        <div style={{
          marginTop: '0.9rem',
          padding: '1rem',
          background: 'rgba(99, 102, 241, 0.05)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: 'var(--radius-md)',
          animation: 'slideUp 0.25s ease'
        }}>
          {expectedAnswer && (
            <div style={{ marginBottom: '0.85rem' }}>
              <h4 style={{ fontSize: '0.88rem', color: 'var(--accent-violet)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <BookOpen size={14} /> Expected Answer Guide
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                {expectedAnswer}
              </p>
            </div>
          )}

          {explanation && (
            <div style={{ marginBottom: '0.85rem' }}>
              <h4 style={{ fontSize: '0.88rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <HelpCircle size={14} /> In-Depth Explanation
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                {explanation}
              </p>
            </div>
          )}

          {keyPoints && keyPoints.length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.88rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                Key Points Interviewers Look For:
              </h4>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                {keyPoints.map((pt, idx) => (
                  <li key={idx} style={{ marginBottom: '0.25rem' }}>{pt}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

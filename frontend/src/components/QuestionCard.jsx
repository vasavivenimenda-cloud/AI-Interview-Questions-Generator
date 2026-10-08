import React, { useState } from 'react';
import { Bookmark, Copy, Check, ChevronDown, ChevronUp, Trash2, Tag, Briefcase } from 'lucide-react';
import { getDifficultyColor, copyToClipboard } from '../utils/helpers';

export const QuestionCard = ({ item, onToggleFavorite, onDelete }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [copied, setCopied] = useState(false);

  const diffStyle = getDifficultyColor(item.difficulty);

  const handleCopy = async () => {
    const success = await copyToClipboard(
      `Question: ${item.question}\n\nSample Answer: ${item.sample_answer || 'N/A'}`
    );
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`question-card ${item.is_favorite ? 'card-favorited' : ''}`}>
      <div className="card-header">
        <div className="card-tags">
          <span
            className="badge badge-difficulty"
            style={{
              backgroundColor: diffStyle.bg,
              color: diffStyle.text,
              borderColor: diffStyle.border,
            }}
          >
            {item.difficulty || 'Medium'}
          </span>
          <span className="badge badge-category">{item.category || 'Technical'}</span>
          <span className="badge badge-role">
            <Briefcase size={12} /> {item.role}
          </span>
        </div>

        <div className="card-actions">
          <button
            className={`icon-btn ${item.is_favorite ? 'active-star' : ''}`}
            onClick={() => onToggleFavorite(item.id)}
            title={item.is_favorite ? 'Remove from favorites' : 'Save to favorites'}
            aria-label="Favorite"
          >
            <Bookmark size={16} fill={item.is_favorite ? 'currentColor' : 'none'} />
          </button>
          <button
            className="icon-btn"
            onClick={handleCopy}
            title="Copy question & answer"
            aria-label="Copy"
          >
            {copied ? <Check size={16} color="#4ade80" /> : <Copy size={16} />}
          </button>
          <button
            className="icon-btn danger-btn"
            onClick={() => onDelete(item.id)}
            title="Delete question"
            aria-label="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="card-body">
        <h3 className="question-text">{item.question}</h3>

        {item.tech_stack && (
          <div className="tech-stack-row">
            <span className="tech-label"><Tag size={12} /> Tech Focus:</span>
            <span className="tech-value">{item.tech_stack}</span>
          </div>
        )}

        <div className="card-meta">
          <span>Level: {item.experience_level}</span>
        </div>

        {item.sample_answer && (
          <div className="answer-section">
            <button
              className="toggle-answer-btn"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              <span>{showAnswer ? 'Hide Sample Answer' : 'View Sample Answer'}</span>
              {showAnswer ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showAnswer && (
              <div className="answer-box">
                <p>{item.sample_answer}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

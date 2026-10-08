import React, { useState } from 'react';
import { Sparkles, PlusCircle, Wrench } from 'lucide-react';
import { PRESET_ROLES, EXPERIENCE_LEVELS, DIFFICULTY_LEVELS, CATEGORIES } from '../data/categories';

export const GeneratorForm = ({ onAddQuestion, isLoading }) => {
  const [role, setRole] = useState(PRESET_ROLES[0]);
  const [experienceLevel, setExperienceLevel] = useState(EXPERIENCE_LEVELS[0]);
  const [difficulty, setDifficulty] = useState('Medium');
  const [category, setCategory] = useState(CATEGORIES[1]); // Technical / Core Concepts
  const [techStack, setTechStack] = useState('React, JavaScript, CSS');
  const [question, setQuestion] = useState('');
  const [sampleAnswer, setSampleAnswer] = useState('');

  const handlePreFillExample = () => {
    setRole('Full Stack Developer');
    setExperienceLevel('Entry-Level / Fresher (0-1 yrs)');
    setDifficulty('Medium');
    setCategory('Technical / Core Concepts');
    setTechStack('React, Node.js, Express, SQLite');
    setQuestion('Explain how RESTful APIs differ from GraphQL, and when would you choose one over the other for a web project?');
    setSampleAnswer('REST uses fixed endpoints returning predetermined structures, often leading to over-fetching or multiple network roundtrips. GraphQL allows clients to request exact fields via a single endpoint, reducing bandwidth at the cost of caching complexity and server-side resolver overhead.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    onAddQuestion({
      role,
      experience_level: experienceLevel,
      difficulty,
      category,
      tech_stack: techStack,
      question: question.trim(),
      sample_answer: sampleAnswer.trim(),
    });

    // Reset inputs
    setQuestion('');
    setSampleAnswer('');
  };

  return (
    <div className="generator-card">
      <div className="generator-header">
        <div className="generator-title-wrap">
          <div className="icon-badge">
            <Sparkles size={18} />
          </div>
          <div>
            <h2>Question Generator & Customizer</h2>
            <p>Generate role-targeted interview prompts or add new curated questions.</p>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handlePreFillExample}
        >
          <Wrench size={14} /> Pre-fill Sample
        </button>
      </div>

      <form onSubmit={handleSubmit} className="generator-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="role-select">Target Role</label>
            <select
              id="role-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-input"
            >
              {PRESET_ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="exp-select">Experience Level</label>
            <select
              id="exp-select"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="form-input"
            >
              {EXPERIENCE_LEVELS.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="diff-select">Difficulty</label>
            <select
              id="diff-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="form-input"
            >
              {DIFFICULTY_LEVELS.filter((d) => d !== 'All').map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cat-select">Category</label>
            <select
              id="cat-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input"
            >
              {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="tech-input">Tech Stack / Key Topics (comma separated)</label>
          <input
            id="tech-input"
            type="text"
            className="form-input"
            placeholder="e.g. React, Express, SQL, Docker"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="question-input">Interview Question *</label>
          <textarea
            id="question-input"
            rows={3}
            className="form-input"
            placeholder="Enter or paste the technical interview question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="answer-input">Model Answer / Evaluation Criteria (Optional)</label>
          <textarea
            id="answer-input"
            rows={2}
            className="form-input"
            placeholder="Expected answer summary, concepts the candidate should hit..."
            value={sampleAnswer}
            onChange={(e) => setSampleAnswer(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading || !question.trim()}
          >
            <PlusCircle size={18} />
            <span>{isLoading ? 'Saving...' : 'Add / Save Question'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

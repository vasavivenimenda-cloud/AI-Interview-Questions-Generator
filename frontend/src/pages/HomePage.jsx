import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  Layers,
  Database,
  HelpCircle,
  RefreshCw,
  FolderGit2,
} from 'lucide-react';
import { QuestionCard } from '../components/QuestionCard';
import { GeneratorForm } from '../components/GeneratorForm';
import { PRESET_ROLES, DIFFICULTY_LEVELS, CATEGORIES } from '../data/categories';
import {
  fetchQuestions,
  createQuestion,
  toggleFavorite,
  deleteQuestion,
} from '../services/api';

export const HomePage = ({ backendStatus, onRefreshStatus }) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Load questions
  const loadQuestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchQuestions({
        role: selectedRole === 'All' ? '' : selectedRole,
        difficulty: selectedDifficulty === 'All' ? '' : selectedDifficulty,
        category: selectedCategory === 'All' ? '' : selectedCategory,
      });
      if (response && response.data) {
        setQuestions(response.data);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to connect to backend server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [selectedRole, selectedDifficulty, selectedCategory]);

  const handleAddQuestion = async (formData) => {
    setIsSubmitting(true);
    try {
      await createQuestion(formData);
      await loadQuestions();
    } catch (err) {
      alert(`Error saving question: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      await toggleFavorite(id);
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? { ...q, is_favorite: q.is_favorite ? 0 : 1 } : q))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this interview question?')) {
      return;
    }
    try {
      await deleteQuestion(id);
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      alert(`Error deleting question: ${err.message}`);
    }
  };

  // Client-side search & favorite filter
  const filteredQuestions = questions.filter((item) => {
    const matchesSearch =
      searchTerm === '' ||
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tech_stack && item.tech_stack.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.role && item.role.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFav = !showOnlyFavorites || item.is_favorite === 1;

    return matchesSearch && matchesFav;
  });

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} /> Full-Stack Architecture Ready
          </div>
          <h2 className="hero-title">
            Prepare, Practice, and Master <br />
            <span className="gradient-text">Technical Job Interviews</span>
          </h2>
          <p className="hero-description">
            Generate and catalog custom, role-targeted interview questions based on tech stacks,
            seniority levels, and interview categories with SQLite persistence.
          </p>
        </div>

        {/* Metric Cards */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Stored Questions</span>
              <Database size={18} className="metric-icon" />
            </div>
            <div className="metric-value">{questions.length}</div>
            <span className="metric-sub">In SQLite database</span>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Target Roles</span>
              <Layers size={18} className="metric-icon" />
            </div>
            <div className="metric-value">{PRESET_ROLES.length}+</div>
            <span className="metric-sub">From Fresher to Lead</span>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Backend Status</span>
              <FolderGit2 size={18} className="metric-icon" />
            </div>
            <div className="metric-value">
              {backendStatus?.status === 'healthy' ? 'Online' : 'Checking'}
            </div>
            <span className="metric-sub">
              {backendStatus?.database === 'connected' ? 'SQLite Connected' : 'Port 5000'}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="main-content-layout">
        {/* Left Column: Question Generator / Add Form */}
        <aside className="content-sidebar">
          <GeneratorForm onAddQuestion={handleAddQuestion} isLoading={isSubmitting} />
        </aside>

        {/* Right Column: Question Bank & Filtering */}
        <main className="content-main">
          <div className="filters-panel">
            <div className="filters-header">
              <h3>
                <Filter size={16} /> Question Library
              </h3>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  loadQuestions();
                  onRefreshStatus();
                }}
                title="Refresh from SQLite"
              >
                <RefreshCw size={14} className={isLoading ? 'spin-icon' : ''} /> Refresh
              </button>
            </div>

            <div className="search-bar">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search by keyword, topic, or role..."
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
                <label>Role:</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="All">All Roles</option>
                  {PRESET_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="select-pill">
                <label>Difficulty:</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  {DIFFICULTY_LEVELS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="select-pill">
                <label>Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className={`pill-toggle-btn ${showOnlyFavorites ? 'active' : ''}`}
                onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              >
                ★ Favorites Only
              </button>
            </div>
          </div>

          {/* List of Questions */}
          <div className="questions-stream">
            {isLoading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading questions from SQLite database...</p>
              </div>
            ) : error ? (
              <div className="error-state">
                <h4>Connection Notice</h4>
                <p>{error}</p>
                <p className="error-hint">
                  Ensure the backend is running with <code>npm run dev</code> inside <code>/backend</code>.
                </p>
                <button className="btn btn-secondary btn-sm" onClick={loadQuestions}>
                  Retry Connection
                </button>
              </div>
            ) : filteredQuestions.length === 0 ? (
              <div className="empty-state">
                <HelpCircle size={40} className="empty-icon" />
                <h4>No Questions Found</h4>
                <p>
                  No interview questions match your current search or filter criteria.
                  Try resetting filters or use the form on the left to add one!
                </p>
              </div>
            ) : (
              <div className="questions-list">
                {filteredQuestions.map((q) => (
                  <QuestionCard
                    key={q.id}
                    item={q}
                    onToggleFavorite={handleToggleFavorite}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

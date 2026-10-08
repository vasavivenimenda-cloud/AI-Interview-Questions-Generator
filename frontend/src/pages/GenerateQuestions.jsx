import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  Filter, 
  Plus, 
  Code2, 
  Sliders, 
  Check, 
  RefreshCw, 
  Bookmark, 
  Play, 
  Layers,
  ChevronDown
} from 'lucide-react';
import QuestionCard from '../components/QuestionCard';

export default function GenerateQuestions({
  questions = [],
  profile,
  onGenerate,
  onToggleFavorite,
  onPracticeQuestion,
  onToast,
  loading = false
}) {
  // Generator Form state
  const [formOpen, setFormOpen] = useState(true);
  const [jobRole, setJobRole] = useState(profile?.targetRole || 'Full Stack Developer');
  const [experience, setExperience] = useState(profile?.experience || 'Fresher');
  const [interviewType, setInterviewType] = useState(profile?.preferredInterviewType || 'Technical Interview');
  const [difficulty, setDifficulty] = useState('Medium');
  const [programmingLanguage, setProgrammingLanguage] = useState(profile?.programmingLanguage || 'JavaScript');
  const [skills, setSkills] = useState(profile?.skills || 'React, Node.js, SQL');
  const [count, setCount] = useState(5);

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [filterLanguage, setFilterLanguage] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Sync with profile if updated
  useEffect(() => {
    if (profile) {
      if (!jobRole) setJobRole(profile.targetRole || 'Full Stack Developer');
      if (!skills) setSkills(profile.skills || 'React, Node.js');
      if (!programmingLanguage) setProgrammingLanguage(profile.programmingLanguage || 'JavaScript');
    }
  }, [profile]);

  const handleGenerateSubmit = async (e) => {
    e.preventDefault();
    if (!jobRole.trim()) {
      if (onToast) onToast('Please specify a target Job Role', 'error');
      return;
    }

    await onGenerate({
      jobRole,
      experience,
      interviewType,
      difficulty,
      programmingLanguage,
      skills,
      count: Number(count)
    });
  };

  // Filtered questions
  const filteredQuestions = questions.filter(q => {
    // Search query match
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchQ = q.question && q.question.toLowerCase().includes(query);
      const matchSkills = q.skills && q.skills.toLowerCase().includes(query);
      const matchCat = q.category && q.category.toLowerCase().includes(query);
      const matchExp = q.expectedAnswer && q.expectedAnswer.toLowerCase().includes(query);
      if (!matchQ && !matchSkills && !matchCat && !matchExp) return false;
    }

    // Category filter
    if (filterCategory !== 'All' && q.category !== filterCategory) return false;

    // Difficulty filter
    if (filterDifficulty !== 'All' && q.difficulty.toLowerCase() !== filterDifficulty.toLowerCase()) return false;

    // Language filter
    if (filterLanguage !== 'All') {
      if (q.programmingLanguage !== filterLanguage && q.programmingLanguage !== 'General') return false;
    }

    // Favorites only
    if (showFavoritesOnly && !q.isFavorite) return false;

    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>
            AI Question <span className="gradient-text">Generator & Bank</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
            Generate bespoke, high-yield interview questions tailored to any role, language, and difficulty level.
          </p>
        </div>

        <button
          onClick={() => setFormOpen(!formOpen)}
          className="btn btn-secondary"
          style={{ gap: '0.5rem' }}
        >
          <Sliders size={16} />
          {formOpen ? "Hide Generator Form" : "Open Generator Form"}
        </button>
      </div>

      {/* Generator Configuration Form Box */}
      {formOpen && (
        <form onSubmit={handleGenerateSubmit} className="glass-card" style={{ padding: '1.8rem', border: '1px solid var(--border-glow)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
            <Sparkles size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '1.15rem' }}>Customize AI Generation Parameters</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
            
            {/* Job Role */}
            <div className="input-group">
              <label className="input-label">Target Job Role</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Full Stack Developer"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                required
              />
            </div>

            {/* Experience Level */}
            <div className="input-group">
              <label className="input-label">Experience Level</label>
              <select
                className="select-field"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="Fresher">Fresher (0 Years)</option>
                <option value="1-2 Years">1-2 Years</option>
                <option value="3-5 Years">3-5 Years</option>
                <option value="5+ Years">5+ Years (Senior)</option>
              </select>
            </div>

            {/* Interview Type */}
            <div className="input-group">
              <label className="input-label">Interview Type</label>
              <select
                className="select-field"
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
              >
                <option value="Technical Interview">Technical Interview</option>
                <option value="HR Interview">HR Interview</option>
                <option value="Coding Interview">Coding Interview</option>
                <option value="Behavioral Interview">Behavioral Interview</option>
                <option value="Scenario-Based Interview">Scenario-Based Interview</option>
                <option value="Mixed Interview">Mixed Interview (Comprehensive)</option>
              </select>
            </div>

            {/* Difficulty Level */}
            <div className="input-group">
              <label className="input-label">Difficulty Level</label>
              <select
                className="select-field"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="Easy">Easy (Fundamentals & Core Syntax)</option>
                <option value="Medium">Medium (Industry Standards & Trade-offs)</option>
                <option value="Hard">Hard (Deep Internals, Scale & Concurrency)</option>
              </select>
            </div>

            {/* Programming Language */}
            <div className="input-group">
              <label className="input-label">Programming Language</label>
              <select
                className="select-field"
                value={programmingLanguage}
                onChange={(e) => setProgrammingLanguage(e.target.value)}
              >
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="C">C</option>
                <option value="General">General / Language Agnostic</option>
              </select>
            </div>

            {/* Number of Questions */}
            <div className="input-group">
              <label className="input-label">Question Count</label>
              <select
                className="select-field"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
                <option value={20}>20 Questions</option>
              </select>
            </div>

          </div>

          {/* Key Skills & Tech Stack Input */}
          <div className="input-group" style={{ marginTop: '0.5rem' }}>
            <label className="input-label">
              Skills & Keywords (comma separated)
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Guides prompt specialization</span>
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. React, Node.js, REST, PostgreSQL, Docker, DSA"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          {/* Quick Suggestions Pills */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Quick add:</span>
            {['React', 'Node.js', 'Python', 'System Design', 'SQL', 'Docker', 'STAR Method', 'Data Structures'].map((tag) => (
              <span
                key={tag}
                onClick={() => {
                  if (!skills.includes(tag)) {
                    setSkills(skills ? `${skills}, ${tag}` : tag);
                  }
                }}
                style={{
                  fontSize: '0.74rem',
                  padding: '0.15rem 0.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)'
                }}
              >
                + {tag}
              </span>
            ))}
          </div>

          {/* Submit Action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{ minWidth: '220px' }}
            >
              {loading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" /> Generating Questions...
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Generate {count} Questions
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Search & Filter Toolbar */}
      <div className="glass-card" style={{ padding: '1.2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'center' }}>
          
          {/* Keyword Search */}
          <div style={{ position: 'relative', gridColumn: 'span 2', minWidth: '260px' }}>
            <Search size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="input-field"
              placeholder="Search questions, skills, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.4rem' }}
            />
          </div>

          {/* Filter by Category */}
          <div>
            <select
              className="select-field"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Technical">Technical</option>
              <option value="HR">HR</option>
              <option value="Coding">Coding</option>
              <option value="Behavioral">Behavioral</option>
              <option value="Scenario-Based">Scenario-Based</option>
              <option value="System Design">System Design</option>
            </select>
          </div>

          {/* Filter by Difficulty */}
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

          {/* Filter by Programming Language */}
          <div>
            <select
              className="select-field"
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
            >
              <option value="All">All Languages</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C++">C++</option>
              <option value="C">C</option>
            </select>
          </div>

          {/* Bookmarks Toggle */}
          <div>
            <button
              type="button"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`btn ${showFavoritesOnly ? 'btn-primary' : 'btn-secondary'}`}
              style={{ width: '100%', fontSize: '0.86rem', padding: '0.72rem' }}
            >
              <Bookmark size={15} fill={showFavoritesOnly ? 'currentColor' : 'none'} />
              {showFavoritesOnly ? 'Showing Bookmarks' : 'Filter Bookmarks'}
            </button>
          </div>

        </div>

        {/* Results Count & Reset */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>Showing <strong>{filteredQuestions.length}</strong> of <strong>{questions.length}</strong> questions</span>
          {(searchQuery || filterCategory !== 'All' || filterDifficulty !== 'All' || filterLanguage !== 'All' || showFavoritesOnly) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterCategory('All');
                setFilterDifficulty('All');
                setFilterLanguage('All');
                setShowFavoritesOnly(false);
              }}
              style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.82rem' }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div>
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              onToggleFavorite={onToggleFavorite}
              onPractice={onPracticeQuestion}
              onToast={onToast}
            />
          ))
        ) : (
          <div className="glass-card" style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <HelpCircle size={40} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3>No matching questions found</h3>
            <p style={{ marginTop: '0.5rem', maxWidth: '450px', margin: '0.5rem auto 1.5rem' }}>
              Try adjusting your filters or use the generator above to create fresh questions matching your exact criteria.
            </p>
            <button
              onClick={() => setFormOpen(true)}
              className="btn btn-primary"
            >
              <Sparkles size={16} /> Generate Questions
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

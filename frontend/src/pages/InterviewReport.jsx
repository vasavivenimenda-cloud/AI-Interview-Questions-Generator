import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  RotateCcw, 
  ArrowLeft, 
  Printer, 
  Check, 
  Star, 
  Code2, 
  BookOpen,
  Calendar,
  Layers,
  ChevronDown
} from 'lucide-react';
import ScoreDial from '../components/ScoreDial';

export default function InterviewReport({
  reportData,
  onRetake,
  onBackToDashboard,
  onViewHistory
}) {
  const {
    sessionName = "Full Stack Technical Screening",
    targetRole = "Full Stack Developer",
    experience = "Fresher",
    interviewType = "Technical Interview",
    completedAt = new Date().toISOString(),
    overallScore = 8.2,
    technicalScore = 8.5,
    communicationScore = 8.0,
    problemSolvingScore = 8.4,
    hrScore = 7.8,
    percentage = 82,
    strongAreas = [],
    weakAreas = [],
    personalizedSuggestions = [],
    questions = []
  } = reportData || {};

  // Confetti launch on high score
  useEffect(() => {
    if (overallScore >= 7.0) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback if canvas-confetti issues
      }
    }
  }, [overallScore]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Top Banner & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <button
            onClick={onBackToDashboard}
            className="btn btn-ghost btn-sm"
            style={{ marginBottom: '0.4rem', paddingLeft: 0, gap: '0.3rem' }}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h1 style={{ fontSize: '2rem' }}>
            Interview Diagnostic <span className="gradient-text">Performance Report</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            {sessionName} • {new Date(completedAt).toLocaleDateString()} • {targetRole} ({experience})
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button onClick={handlePrint} className="btn btn-secondary btn-sm">
            <Printer size={15} /> Print / Export PDF
          </button>
          <button onClick={onRetake} className="btn btn-primary btn-sm">
            <RotateCcw size={15} /> Retake Interview
          </button>
        </div>
      </div>

      {/* Hero Score Card */}
      <div className="glass-card" style={{
        padding: '2.5rem 2rem',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%)',
        border: '1px solid var(--border-glow)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '2rem',
        alignItems: 'center'
      }}>
        
        {/* Overall Score Dial */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <ScoreDial score={overallScore} max={10} size={150} strokeWidth={11} label="Overall Mock Score" />
          
          <div style={{ textAlign: 'left' }}>
            <span className="badge diff-easy" style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {percentage}% Mastery
            </span>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.3rem' }}>
              {overallScore >= 8.5 ? "Outstanding Readiness! 🌟" : overallScore >= 7.0 ? "Strong Performance! 🚀" : "Promising Foundation 📈"}
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '320px' }}>
              {overallScore >= 7.5 
                ? "You demonstrated strong grasp of core fundamentals and structured problem solving."
                : "You have a solid base. Review the personalized recommendations below to elevate your score."}
            </p>
          </div>
        </div>

        {/* Multi-Dimensional Competency Scorecard */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0, 0, 0, 0.25)', padding: '1.4rem', borderRadius: 'var(--radius-lg)' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
            Competency Breakdown
          </h4>

          {/* Technical */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
              <span>Technical Accuracy</span>
              <strong style={{ color: '#818cf8' }}>{technicalScore} / 10</strong>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${technicalScore * 10}%`, background: 'var(--primary-gradient)' }} />
            </div>
          </div>

          {/* Problem Solving */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
              <span>Problem Solving & Algorithms</span>
              <strong style={{ color: '#22d3ee' }}>{problemSolvingScore} / 10</strong>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${problemSolvingScore * 10}%`, background: 'var(--cyan-gradient)' }} />
            </div>
          </div>

          {/* Communication */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
              <span>Communication Clarity</span>
              <strong style={{ color: '#34d399' }}>{communicationScore} / 10</strong>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${communicationScore * 10}%`, background: 'var(--emerald-gradient)' }} />
            </div>
          </div>

          {/* HR & Culture */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
              <span>HR & Behavioral Fit</span>
              <strong style={{ color: '#f59e0b' }}>{hrScore} / 10</strong>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${hrScore * 10}%`, background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Strong Areas vs Weak Areas Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        
        {/* Strong Areas */}
        <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', marginBottom: '1rem' }}>
            <CheckCircle2 size={20} />
            <h3 style={{ fontSize: '1.15rem' }}>Demonstrated Strengths</h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {strongAreas && strongAreas.length > 0 ? (
              strongAreas.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                  <span style={{ color: '#10b981', marginTop: '0.2rem' }}>✓</span>
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li style={{ color: 'var(--text-secondary)' }}>Solid overall baseline across technical and behavioral prompts.</li>
            )}
          </ul>
        </div>

        {/* Weak Areas */}
        <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', marginBottom: '1rem' }}>
            <AlertTriangle size={20} />
            <h3 style={{ fontSize: '1.15rem' }}>Identified Blind Spots & Growth Areas</h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {weakAreas && weakAreas.length > 0 ? (
              weakAreas.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                  <span style={{ color: '#f59e0b', marginTop: '0.2rem' }}>!</span>
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li style={{ color: 'var(--text-secondary)' }}>No glaring weaknesses detected. Practice under stricter time limits!</li>
            )}
          </ul>
        </div>
      </div>

      {/* Personalized Improvement Suggestions Roadmap */}
      {personalizedSuggestions && personalizedSuggestions.length > 0 && (
        <div className="glass-card" style={{ padding: '1.8rem', border: '1px solid var(--border-glow)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-violet)', marginBottom: '1rem' }}>
            <Lightbulb size={22} />
            <h3 style={{ fontSize: '1.2rem' }}>Personalized Action Roadmap</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {personalizedSuggestions.map((sug, idx) => (
              <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.3rem' }}>
                  STEP 0{idx + 1}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {sug}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Question-By-Question Detailed Audit */}
      {questions && questions.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={18} color="var(--primary)" /> Question-by-Question Review ({questions.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {questions.map((q, idx) => {
              const evalData = q.evaluation || {};
              return (
                <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span className="badge badge-tech">Q{idx + 1}</span>
                      <span className="badge" style={{ background: 'rgba(255,255,255,0.06)' }}>{q.category}</span>
                      <span className="badge diff-medium">{q.difficulty}</span>
                    </div>

                    <span className="badge diff-easy" style={{ fontSize: '0.85rem', fontWeight: 800 }}>
                      Score: {evalData.score || '—'} / 10
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', marginBottom: '0.8rem' }}>{q.question}</h4>

                  {/* Candidate Submitted Answer */}
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.9rem', borderRadius: 'var(--radius-md)', marginBottom: '0.8rem', border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Your Submitted Answer:
                    </span>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', marginTop: '0.3rem', whiteSpace: 'pre-wrap' }}>
                      {q.userAnswer || "No answer submitted."}
                    </p>
                  </div>

                  {/* Feedback breakdown */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.8rem', fontSize: '0.84rem' }}>
                    {evalData.strengths && (
                      <div style={{ background: 'rgba(16, 185, 129, 0.06)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        <strong style={{ color: '#10b981' }}>Strengths: </strong>
                        <span>{evalData.strengths}</span>
                      </div>
                    )}
                    {evalData.missingPoints && (
                      <div style={{ background: 'rgba(245, 158, 11, 0.06)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                        <strong style={{ color: '#f59e0b' }}>Missing: </strong>
                        <span>{evalData.missingPoints}</span>
                      </div>
                    )}
                  </div>

                  {/* Model Answer preview */}
                  {(evalData.idealAnswer || q.expectedAnswer) && (
                    <div style={{ marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--accent-violet)', fontWeight: 700 }}>Model Answer Guide: </span>
                      <span style={{ color: 'var(--text-secondary)' }}>{evalData.idealAnswer || q.expectedAnswer}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
        <button onClick={onBackToDashboard} className="btn btn-secondary">
          Dashboard
        </button>
        <button onClick={onViewHistory} className="btn btn-secondary">
          View All Interviews
        </button>
        <button onClick={onRetake} className="btn btn-primary">
          <RotateCcw size={16} /> Take Another Mock
        </button>
      </div>

    </div>
  );
}

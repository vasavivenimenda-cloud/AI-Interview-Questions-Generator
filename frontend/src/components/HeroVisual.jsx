import React, { useState, useEffect } from 'react';
import {
  Bot,
  Sparkles,
  CheckCircle2,
  Mic,
  Cpu,
  Layers,
  Award,
  Zap,
} from 'lucide-react';

const SAMPLE_QUESTIONS = [
  {
    role: 'Senior Full Stack Engineer',
    topic: 'System Design & React',
    difficulty: 'Advanced',
    question: 'How do you prevent cascading re-renders in large React apps and scale WebSocket connections across clustered Node.js servers?',
    answerSummary: 'Candidate demonstrated deep understanding of React Compiler/memoization patterns, Redis pub/sub adapters, and backpressure handling.',
    score: 95,
    metrics: { technical: '96%', starClarity: '93%', confidence: '94%' },
  },
  {
    role: 'Backend & Cloud Architect',
    topic: 'Distributed Systems',
    difficulty: 'Hard',
    question: 'Explain how you would design a globally distributed idempotent payment processing pipeline with zero double-charge guarantee.',
    answerSummary: 'Exemplary coverage of distributed consensus, two-phase commits vs Saga patterns, and Redis distributed locks.',
    score: 92,
    metrics: { technical: '95%', starClarity: '90%', confidence: '91%' },
  },
  {
    role: 'AI / ML Engineer',
    topic: 'RAG & Vector Search',
    difficulty: 'Senior',
    question: 'What strategies reduce hallucination and latency in production Retrieval-Augmented Generation (RAG) pipelines?',
    answerSummary: 'Outstanding solution with hybrid BM25 + dense semantic reranking, contextual chunking, and speculative decoding.',
    score: 97,
    metrics: { technical: '98%', starClarity: '95%', confidence: '97%' },
  },
];

export const HeroVisual = () => {
  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
  const [isSimulatingVoice, setIsSimulatingVoice] = useState(true);

  // Auto-rotate sample every 6 seconds or let user click
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSampleIndex((prev) => (prev + 1) % SAMPLE_QUESTIONS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = SAMPLE_QUESTIONS[activeSampleIndex];

  return (
    <div className="hero-visual-container">
      {/* Background Ambient Glows */}
      <div className="visual-ambient-glow glow-1"></div>
      <div className="visual-ambient-glow glow-2"></div>

      {/* Floating Micro Badge 1 */}
      <div className="floating-badge badge-top-left">
        <div className="badge-pulse-icon">
          <Zap size={14} />
        </div>
        <div>
          <div className="badge-text-title">Real-Time Evaluation</div>
          <div className="badge-text-sub">Instant Rubric Analysis</div>
        </div>
      </div>

      {/* Floating Micro Badge 2 */}
      <div className="floating-badge badge-bottom-right">
        <div className="badge-avatar-group">
          <Award size={16} className="text-emerald" />
        </div>
        <div>
          <div className="badge-text-title">98% Interview Match</div>
          <div className="badge-text-sub">FAANG & Top Tech Curated</div>
        </div>
      </div>

      {/* Main Glass Console Card */}
      <div className="ai-console-card">
        {/* Console Header */}
        <div className="console-header">
          <div className="console-status-group">
            <div className="console-bot-avatar">
              <Bot size={20} />
            </div>
            <div>
              <div className="console-bot-name">
                AI Interviewer Agent <span className="agent-version">v2.5</span>
              </div>
              <div className="console-status-live">
                <span className="live-pulse"></span>
                <span>Live Audio & Text Assessment</span>
              </div>
            </div>
          </div>

          <div className="console-chips">
            <span className="console-chip chip-model">
              <Cpu size={12} /> Adaptive Engine
            </span>
            <span className="console-chip chip-difficulty">
              {current.difficulty}
            </span>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="console-role-switcher">
          {SAMPLE_QUESTIONS.map((item, idx) => (
            <button
              key={item.role}
              className={`switcher-tab ${idx === activeSampleIndex ? 'active' : ''}`}
              onClick={() => setActiveSampleIndex(idx)}
            >
              <span>{item.role.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Question Prompt Card */}
        <div className="console-question-box">
          <div className="question-meta-row">
            <span className="question-target-role">
              <Layers size={13} /> {current.role}
            </span>
            <span className="question-topic-pill">{current.topic}</span>
          </div>
          <p className="question-text">"{current.question}"</p>
        </div>

        {/* Live Audio / Waveform Visualizer Simulation */}
        <div className="console-waveform-strip">
          <div className="waveform-info">
            <div className="waveform-mic-status">
              <Mic size={14} className={isSimulatingVoice ? 'recording-icon active' : 'recording-icon'} />
              <span>Candidate Speaking... (00:42)</span>
            </div>
            <button
              className="waveform-pause-btn"
              onClick={() => setIsSimulatingVoice(!isSimulatingVoice)}
              title="Toggle waveform animation"
            >
              {isSimulatingVoice ? 'Pause' : 'Resume'}
            </button>
          </div>

          <div className={`waveform-bars ${isSimulatingVoice ? 'animating' : 'paused'}`}>
            <span style={{ height: '35%' }}></span>
            <span style={{ height: '60%' }}></span>
            <span style={{ height: '85%' }}></span>
            <span style={{ height: '45%' }}></span>
            <span style={{ height: '95%' }}></span>
            <span style={{ height: '70%' }}></span>
            <span style={{ height: '40%' }}></span>
            <span style={{ height: '80%' }}></span>
            <span style={{ height: '100%' }}></span>
            <span style={{ height: '65%' }}></span>
            <span style={{ height: '50%' }}></span>
            <span style={{ height: '90%' }}></span>
            <span style={{ height: '75%' }}></span>
            <span style={{ height: '40%' }}></span>
            <span style={{ height: '85%' }}></span>
            <span style={{ height: '60%' }}></span>
            <span style={{ height: '30%' }}></span>
          </div>
        </div>

        {/* Real-time AI Evaluation Card */}
        <div className="console-evaluation-panel">
          <div className="evaluation-header">
            <div className="evaluation-title">
              <Sparkles size={15} className="text-amber" />
              <span>AI Evaluation Feedback</span>
            </div>
            <div className="score-badge">
              <span className="score-num">{current.score}</span>
              <span className="score-max">/100</span>
            </div>
          </div>

          <p className="evaluation-summary">{current.answerSummary}</p>

          <div className="metrics-bars-grid">
            <div className="metric-pill-item">
              <span className="metric-name">Technical Depth</span>
              <span className="metric-val">{current.metrics.technical}</span>
            </div>
            <div className="metric-pill-item">
              <span className="metric-name">STAR Method</span>
              <span className="metric-val">{current.metrics.starClarity}</span>
            </div>
            <div className="metric-pill-item">
              <span className="metric-name">Confidence</span>
              <span className="metric-val">{current.metrics.confidence}</span>
            </div>
          </div>
        </div>

        {/* Console Footer Status */}
        <div className="console-footer-strip">
          <span className="console-footer-note">
            <CheckCircle2 size={13} className="text-emerald" /> Auto-graded against 250+ tech rubrics
          </span>
          <span className="console-footer-speed">Latency: 180ms</span>
        </div>
      </div>
    </div>
  );
};

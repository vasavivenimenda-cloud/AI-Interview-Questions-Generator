import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  Brain,
  Timer,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const MockInterviewPage = () => {
  const [selectedRole, setSelectedRole] = useState('Full Stack Developer');
  const [selectedRound, setSelectedRound] = useState('System Design & Architecture');
  const [selectedDuration, setSelectedDuration] = useState('30 Minutes');
  const [isSimulating, setIsSimulating] = useState(false);
  const [demoStep, setDemoStep] = useState('prompt'); // 'prompt' | 'speaking' | 'feedback'

  return (
    <div className="placeholder-page mock-interview-page">
      {/* Page Header */}
      <div className="placeholder-header">
        <div className="header-badge">
          <Mic size={14} /> Real-Time Mock Interview Simulation
        </div>
        <h1 className="placeholder-title">
          Interactive AI <span className="gradient-text">Mock Interview Studio</span>
        </h1>
        <p className="placeholder-subtitle">
          Experience realistic, high-pressure technical and behavioral interview simulations with
          adaptive AI follow-ups and comprehensive rubric evaluations.
        </p>
      </div>

      {/* Backend Integration Roadmap Banner */}
      <div className="integration-banner">
        <div className="integration-badge">
          <Sparkles size={14} /> Backend Integration Pipeline
        </div>
        <p className="integration-text">
          <strong>Backend Voice Agent Under Active Development:</strong> This interactive studio
          is wired with real-time UI states. Live WebRTC bidirectional voice streaming and
          LLM-based voice grading endpoints will connect directly to the Express backend in the next release.
        </p>
      </div>

      {/* Main Studio Grid: Configuration + Live Session Simulator */}
      <div className="mock-studio-grid">
        {/* Left Column: Session Setup */}
        <div className="mock-card config-card">
          <div className="mock-card-header">
            <h3>
              <Layers size={18} /> 1. Configure Session
            </h3>
            <span className="badge-pill">Custom Round</span>
          </div>

          <div className="mock-form-group">
            <label>Target Role:</label>
            <select
              className="form-input"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Frontend Engineer (React)">Frontend Engineer (React)</option>
              <option value="Backend Engineer (Node/Go)">Backend Engineer (Node/Go)</option>
              <option value="DevOps & Cloud Engineer">DevOps & Cloud Engineer</option>
              <option value="Data Scientist & ML Engineer">Data Scientist & ML Engineer</option>
            </select>
          </div>

          <div className="mock-form-group">
            <label>Interview Round Type:</label>
            <select
              className="form-input"
              value={selectedRound}
              onChange={(e) => setSelectedRound(e.target.value)}
            >
              <option value="System Design & Architecture">System Design & Architecture</option>
              <option value="Technical Problem Solving">Technical Problem Solving</option>
              <option value="Behavioral (STAR Method)">Behavioral (STAR Method)</option>
              <option value="Live Coding & Refactoring">Live Coding & Refactoring</option>
            </select>
          </div>

          <div className="mock-form-group">
            <label>Session Duration:</label>
            <div className="duration-pills">
              {['15 Minutes', '30 Minutes', '45 Minutes'].map((dur) => (
                <button
                  key={dur}
                  type="button"
                  className={`duration-pill ${selectedDuration === dur ? 'active' : ''}`}
                  onClick={() => setSelectedDuration(dur)}
                >
                  <Timer size={13} /> {dur}
                </button>
              ))}
            </div>
          </div>

          <div className="config-summary-box">
            <h4>Ready to Practice:</h4>
            <ul className="config-check-list">
              <li>✓ Dynamic follow-up question synthesis</li>
              <li>✓ Response timer & pacing guidance</li>
              <li>✓ STAR method rubric scoring</li>
            </ul>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setIsSimulating(true);
              setDemoStep('speaking');
            }}
          >
            <Play size={16} /> Start Interactive Simulation Demo
          </button>
        </div>

        {/* Right Column: Interactive Simulator Terminal */}
        <div className="mock-card simulator-card">
          <div className="mock-card-header">
            <div className="simulator-header-left">
              <span className="live-pulse"></span>
              <h3>2. Interactive Interview Simulator</h3>
            </div>
            <span className="sim-mode-tag">{selectedRole}</span>
          </div>

          {/* Simulated Interview Stage */}
          <div className="simulator-body">
            {/* Stage 1: AI Prompt */}
            <div className="ai-speech-bubble">
              <div className="ai-bubble-header">
                <Brain size={16} className="text-indigo" />
                <span className="ai-bubble-name">AI Interviewer</span>
                <span className="timestamp">Round: {selectedRound}</span>
              </div>
              <p className="ai-prompt-content">
                "Hello! Welcome to your technical interview for <strong>{selectedRole}</strong>.
                Let's begin: Could you explain how you would design a high-throughput notifications
                service capable of delivering 100,000 pushes per second with guaranteed at-least-once delivery?"
              </p>
            </div>

            {/* Stage 2: User Response & Mic Simulation */}
            <div className="user-response-stage">
              <div className="audio-wave-visualizer">
                <div className="wave-status">
                  <Mic size={16} className={isSimulating ? 'wave-mic active' : 'wave-mic'} />
                  <span>
                    {isSimulating
                      ? 'Microphone Active — Candidate Answering (01:14)'
                      : 'Microphone Standby — Click "Start Interactive Simulation Demo"'}
                  </span>
                </div>
                <div className={`wave-bars-display ${isSimulating ? 'animating' : ''}`}>
                  <span style={{ height: '40%' }}></span>
                  <span style={{ height: '70%' }}></span>
                  <span style={{ height: '90%' }}></span>
                  <span style={{ height: '55%' }}></span>
                  <span style={{ height: '80%' }}></span>
                  <span style={{ height: '100%' }}></span>
                  <span style={{ height: '65%' }}></span>
                  <span style={{ height: '45%' }}></span>
                  <span style={{ height: '85%' }}></span>
                  <span style={{ height: '30%' }}></span>
                </div>
              </div>

              {isSimulating && (
                <div className="simulator-actions-row">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setDemoStep('feedback')}
                  >
                    <CheckCircle2 size={14} className="text-emerald" /> Finish Answer & Generate AI Feedback
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setIsSimulating(false)}
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              )}
            </div>

            {/* Stage 3: Instant AI Feedback Scorecard Demo */}
            {demoStep === 'feedback' && (
              <div className="simulator-feedback-card">
                <div className="feedback-badge-row">
                  <div className="feedback-title">
                    <Sparkles size={16} className="text-amber" />
                    <span>Instant AI Evaluation Scorecard</span>
                  </div>
                  <div className="feedback-score">
                    <Award size={15} /> 94 / 100
                  </div>
                </div>

                <p className="feedback-text">
                  <strong>Interviewer Assessment:</strong> Outstanding architectural breakdown.
                  Correctly utilized Apache Kafka message partitions, Redis idempotency keys, and
                  worker pools with backpressure control.
                </p>

                <div className="rubrics-grid">
                  <div className="rubric-item">
                    <span className="rubric-label">System Scalability</span>
                    <span className="rubric-score high">96%</span>
                  </div>
                  <div className="rubric-item">
                    <span className="rubric-label">Edge-Case Coverage</span>
                    <span className="rubric-score high">92%</span>
                  </div>
                  <div className="rubric-item">
                    <span className="rubric-label">Communication Clarity</span>
                    <span className="rubric-score high">94%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="simulator-footer">
            <span className="footer-tip">
              Want to practice specific questions with SQLite storage?
            </span>
            <Link to="/generate" className="btn btn-primary btn-sm">
              <span>Go to Question Generator</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

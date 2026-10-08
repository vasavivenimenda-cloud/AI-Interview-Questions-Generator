import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Brain,
  Sliders,
  Mic,
  CheckCircle2,
  BarChart3,
  History,
  UserCheck,
  Zap,
  Target,
  Layers,
  ChevronRight,
  Code2,
  Terminal,
  Cpu,
  TrendingUp,
  Headphones,
  FileCheck,
  Compass,
} from 'lucide-react';
import { HeroVisual } from '../components/HeroVisual';

export const LandingPage = () => {
  // 6 Required Features
  const features = [
    {
      id: 'generation',
      title: 'AI Question Generation',
      badge: 'Dynamic AI Engine',
      description:
        'Generate precision-targeted technical, system design, coding, and behavioral interview questions tailored to any role, seniority tier, and specific tech stack.',
      icon: Brain,
      gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      link: '/generate',
      actionText: 'Generate Questions',
      highlights: ['Custom tech stack filters', 'Fresher to Lead tiers', 'Instant hint & model answers'],
    },
    {
      id: 'personalized',
      title: 'Personalized Interviews',
      badge: 'Adaptive Matching',
      description:
        'Craft customized interview scenarios that match your exact resume background, target company culture, domain requirements, and targeted skill development areas.',
      icon: Sliders,
      gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
      link: '/dashboard',
      actionText: 'Customize Profile',
      highlights: ['Resume & JD calibration', 'Role-specific tracks', 'Adjustable difficulty curves'],
    },
    {
      id: 'mock',
      title: 'Mock Interview',
      badge: 'Realistic Simulation',
      description:
        'Simulate authentic high-stakes interviews with timed rounds, live voice & text input, adaptive follow-ups, and natural interviewer dialogue.',
      icon: Mic,
      gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
      link: '/mock-interview',
      actionText: 'Take Mock Interview',
      highlights: ['Timed interactive sessions', 'Dynamic follow-up prompts', 'Audio recorder simulation'],
    },
    {
      id: 'evaluation',
      title: 'AI Answer Evaluation',
      badge: 'STAR Rubric Scoring',
      description:
        'Receive instant comprehensive scoring with granular feedback on technical accuracy, STAR communication structure, depth, clarity, and missing points.',
      icon: CheckCircle2,
      gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
      link: '/mock-interview',
      actionText: 'View Evaluation Demo',
      highlights: ['STAR method validation', 'Technical correctness rating', 'Concrete suggestions to improve'],
    },
    {
      id: 'analytics',
      title: 'Performance Analytics',
      badge: 'Readiness Insights',
      description:
        'Track your technical mastery, confidence scores, speaking cadence, and historical progress across algorithms, architecture, and behavioral questions over time.',
      icon: BarChart3,
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      link: '/dashboard',
      actionText: 'Explore Dashboard',
      highlights: ['Domain competency radars', 'Readiness score index', 'Historical trend graphs'],
    },
    {
      id: 'history',
      title: 'Interview History',
      badge: 'Session Archive',
      description:
        'Revisit all past mock interview sessions, full audio transcripts, AI scorecard evaluations, and bookmarked questions to review your long-term growth.',
      icon: History,
      gradient: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
      link: '/history',
      actionText: 'Browse History',
      highlights: ['Searchable past transcripts', 'Exportable PDF evaluations', 'Bookmarked favorite Q&As'],
    },
  ];

  // How It Works Steps: Profile → Customize → Generate → Practice → Evaluate → Improve
  const workflowSteps = [
    {
      step: '01',
      title: 'Profile',
      tag: 'Step 1',
      icon: UserCheck,
      description: 'Select your target job title, seniority level (Fresher to Lead), and core tech stack competencies.',
    },
    {
      step: '02',
      title: 'Customize',
      tag: 'Step 2',
      icon: Sliders,
      description: 'Fine-tune round parameters: system architecture, algorithmic challenges, or behavioral STAR situations.',
    },
    {
      step: '03',
      title: 'Generate',
      tag: 'Step 3',
      icon: Brain,
      description: 'Our AI engine instantly generates authentic, industry-standard interview questions with grading criteria.',
    },
    {
      step: '04',
      title: 'Practice',
      tag: 'Step 4',
      icon: Headphones,
      description: 'Speak or type your responses under realistic timed interview conditions with live simulated pacing.',
    },
    {
      step: '05',
      title: 'Evaluate',
      tag: 'Step 5',
      icon: FileCheck,
      description: 'AI analyzes your answers against real rubrics, grading technical accuracy, clarity, and structural depth.',
    },
    {
      step: '06',
      title: 'Improve',
      tag: 'Step 6',
      icon: TrendingUp,
      description: 'Review model answers, refine weak spots with actionable insights, and walk into real interviews confident.',
    },
  ];

  // Quick tracks for direct jump
  const quickTracks = [
    { name: 'Full-Stack Developer', icon: Layers, count: '180+ Questions' },
    { name: 'Frontend Engineer (React)', icon: Code2, count: '140+ Questions' },
    { name: 'Backend & Cloud (Node/Go)', icon: Terminal, count: '165+ Questions' },
    { name: 'DevOps & SRE', icon: Cpu, count: '110+ Questions' },
    { name: 'AI / Machine Learning', icon: Brain, count: '95+ Questions' },
  ];

  return (
    <div className="landing-page">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="landing-hero-section">
        <div className="hero-grid-layout">
          {/* Hero Left Content */}
          <div className="hero-text-column">
            <div className="hero-announcement-badge">
              <span className="badge-glow-dot"></span>
              <Sparkles size={14} className="badge-icon-sparkle" />
              <span>Next-Gen AI Interview Preparation</span>
            </div>

            <h1 className="hero-main-title">
              AI Interview <br />
              <span className="gradient-text">Questions Generator</span>
            </h1>

            <p className="hero-tagline-quote">
              "Prepare Smarter. Practice Better. Get Interview Ready."
            </p>

            <p className="hero-short-description">
              Master technical, system design, and behavioral interviews with role-tailored AI
              question synthesis, interactive mock simulations, and real-time rubric-based
              evaluation designed to land your dream offer.
            </p>

            {/* Action Buttons */}
            <div className="hero-action-buttons">
              <Link to="/generate" className="btn btn-primary btn-hero">
                <span>Start Interview Preparation</span>
                <ArrowRight size={18} />
              </Link>

              <Link to="/mock-interview" className="btn btn-secondary btn-hero">
                <Mic size={18} />
                <span>Take Mock Interview</span>
              </Link>
            </div>

            {/* Platform Highlights Strip */}
            <div className="hero-trust-strip">
              <div className="trust-item">
                <span className="trust-number">10,000+</span>
                <span className="trust-label">Questions Curated</span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <span className="trust-number">50+</span>
                <span className="trust-label">Tech Stacks</span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <span className="trust-number">STAR</span>
                <span className="trust-label">Method Rubrics</span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <span className="trust-number">Instant</span>
                <span className="trust-label">AI Feedback</span>
              </div>
            </div>
          </div>

          {/* Hero Right: Interactive AI Visual Console */}
          <div className="hero-visual-column">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* =========================================================================
          POPULAR TRACKS QUICK ACCESS STRIP
          ========================================================================= */}
      <section className="quick-tracks-section">
        <div className="section-container">
          <div className="tracks-header">
            <span className="tracks-label">
              <Target size={15} /> Popular Interview Tracks:
            </span>
          </div>
          <div className="tracks-carousel">
            {quickTracks.map((track) => {
              const TrackIcon = track.icon;
              return (
                <Link
                  key={track.name}
                  to="/generate"
                  className="track-chip-card"
                  title={`Start practicing ${track.name} questions`}
                >
                  <TrackIcon size={16} className="track-chip-icon" />
                  <div className="track-chip-info">
                    <span className="track-chip-title">{track.name}</span>
                    <span className="track-chip-count">{track.count}</span>
                  </div>
                  <ChevronRight size={14} className="track-arrow" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURE SECTION (6 Required Cards)
          ========================================================================= */}
      <section className="features-section" id="features">
        <div className="section-container">
          <div className="section-header text-center">
            <div className="section-badge">
              <Zap size={14} /> Comprehensive Capabilities
            </div>
            <h2 className="section-title">
              Engineered to Turn Interview Anxiety into <br />
              <span className="gradient-text">Offer-Winning Confidence</span>
            </h2>
            <p className="section-subtitle">
              Every tool you need to ace engineering, architecture, and leadership rounds in one
              cohesive AI-powered platform.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feat) => {
              const IconComp = feat.icon;
              return (
                <div key={feat.id} className="feature-card">
                  <div className="feature-card-header">
                    <div
                      className="feature-icon-wrapper"
                      style={{ background: feat.gradient }}
                    >
                      <IconComp size={24} color="#ffffff" />
                    </div>
                    <span className="feature-badge">{feat.badge}</span>
                  </div>

                  <h3 className="feature-card-title">{feat.title}</h3>
                  <p className="feature-card-desc">{feat.description}</p>

                  <ul className="feature-highlights-list">
                    {feat.highlights.map((h, i) => (
                      <li key={i} className="highlight-item">
                        <CheckCircle2 size={14} className="highlight-check" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="feature-card-footer">
                    <Link to={feat.link} className="feature-action-link">
                      <span>{feat.actionText}</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS SECTION:
          Profile → Customize → Generate → Practice → Evaluate → Improve
          ========================================================================= */}
      <section className="workflow-section" id="how-it-works">
        <div className="section-container">
          <div className="section-header text-center">
            <div className="section-badge">
              <Compass size={14} /> Proven Success Methodology
            </div>
            <h2 className="section-title">
              How It Works: <span className="gradient-text">6 Steps to Interview Mastery</span>
            </h2>
            <p className="section-subtitle">
              Follow our structured end-to-end framework to calibrate, rehearse, and continually
              sharpen your interview performance.
            </p>
          </div>

          {/* Workflow Pipeline Display */}
          <div className="workflow-pipeline-banner">
            <span className="pipeline-crumb">Profile</span>
            <span className="pipeline-separator">→</span>
            <span className="pipeline-crumb">Customize</span>
            <span className="pipeline-separator">→</span>
            <span className="pipeline-crumb">Generate</span>
            <span className="pipeline-separator">→</span>
            <span className="pipeline-crumb">Practice</span>
            <span className="pipeline-separator">→</span>
            <span className="pipeline-crumb">Evaluate</span>
            <span className="pipeline-separator">→</span>
            <span className="pipeline-crumb active">Improve</span>
          </div>

          {/* Workflow Cards Grid */}
          <div className="workflow-grid">
            {workflowSteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={step.step} className="workflow-step-card">
                  <div className="step-card-top">
                    <span className="step-counter-pill">{step.step}</span>
                    <span className="step-tag-pill">{step.tag}</span>
                  </div>

                  <div className="step-icon-bubble">
                    <StepIcon size={22} />
                  </div>

                  <h3 className="step-card-title">{step.title}</h3>
                  <p className="step-card-desc">{step.description}</p>

                  {idx < workflowSteps.length - 1 && (
                    <div className="step-connector-arrow desktop-only">
                      <ArrowRight size={16} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CALL TO ACTION (CTA) SECTION
          ========================================================================= */}
      <section className="cta-banner-section">
        <div className="section-container">
          <div className="cta-banner-card">
            <div className="cta-glow glow-cta-1"></div>
            <div className="cta-glow glow-cta-2"></div>

            <div className="cta-content-wrapper">
              <div className="cta-badge">
                <Sparkles size={15} /> 100% Free & Open-Architecture Platform
              </div>
              <h2 className="cta-title">
                Ready to Ace Your Next <br />
                <span className="gradient-text">Technical Job Interview?</span>
              </h2>
              <p className="cta-description">
                Stop guessing what hiring managers and tech leads will ask. Generate tailored
                questions, practice under realistic conditions, and get actionable AI feedback
                right now.
              </p>

              <div className="cta-buttons-row">
                <Link to="/generate" className="btn btn-primary btn-cta">
                  <span>Start Interview Preparation</span>
                  <ArrowRight size={18} />
                </Link>

                <Link to="/mock-interview" className="btn btn-secondary btn-cta">
                  <Mic size={18} />
                  <span>Take Mock Interview</span>
                </Link>
              </div>

              <div className="cta-security-notes">
                <span>✓ Local SQLite Data Persistence</span>
                <span>✓ Zero Login Required to Start</span>
                <span>✓ Open Full-Stack Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Code2, 
  BrainCircuit, 
  LineChart, 
  ShieldCheck, 
  Cpu, 
  Users, 
  Clock, 
  FileText,
  Star,
  ChevronRight
} from 'lucide-react';

export default function LandingPage({ setActivePage, onStartMock, onStartPrep }) {
  const features = [
    {
      icon: BrainCircuit,
      title: "Personalized AI Question Engine",
      description: "Generates tailored interview questions mapped precisely to your target job role, experience level, tech stack, and selected difficulty.",
      color: "#6366f1",
      badge: "Adaptive"
    },
    {
      icon: Play,
      title: "Interactive Mock Interview Mode",
      description: "Simulate authentic timed interviews one question at a time. Type your answers, solve live coding problems, and experience real pressure.",
      color: "#06b6d4",
      badge: "Simulated"
    },
    {
      icon: ShieldCheck,
      title: "Real-Time AI Answer Evaluation",
      description: "Receive instant scoring out of 10, correctness ratings, missing key points, identified strengths, and comprehensive model answers.",
      color: "#10b981",
      badge: "Rubric Scoring"
    },
    {
      icon: Code2,
      title: "Coding Sandbox & 5+ Languages",
      description: "Dedicated coding challenge interface with problem constraints, test cases, and algorithmic complexity breakdowns in Python, Java, C++, JS, and C.",
      color: "#8b5cf6",
      badge: "DSA Ready"
    },
    {
      icon: LineChart,
      title: "Comprehensive Performance Analytics",
      description: "Deep-dive diagnostic report with percentage score, technical vs behavioral scorecards, strong areas, and personalized improvement roadmap.",
      color: "#f59e0b",
      badge: "Actionable"
    },
    {
      icon: FileText,
      title: "Interview History & Question Bank",
      description: "Organize, filter, search, and bookmark hundreds of generated questions. Revisit past interview sessions to observe your score progression.",
      color: "#d946ef",
      badge: "Persistent"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Set Your Target Role & Skills",
      desc: "Choose whether you are a Fresher, 1-2 YOE, or Senior, and specify your programming language and preferred interview category."
    },
    {
      step: "02",
      title: "Generate or Take Mock Interview",
      desc: "Practice with curated questions or dive straight into an interactive, step-by-step timed mock interview simulator."
    },
    {
      step: "03",
      title: "Get AI Feedback & Ace the Real Deal",
      desc: "Receive rigorous rubric grading, discover blind spots, review model answers, and track your progress to peak readiness."
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', paddingTop: '2rem', paddingBottom: '2rem', position: 'relative' }}>
        
        {/* Top Floating Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.3)', marginBottom: '1.5rem' }}>
          <Sparkles size={16} color="#818cf8" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#a5b4fc' }}>
            Next-Gen AI Interview Coaching & Simulation
          </span>
        </div>

        {/* Hero Title */}
        <h1 style={{ marginBottom: '1.25rem' }}>
          AI Interview <span className="gradient-text">Questions Generator</span>
        </h1>

        {/* Tagline */}
        <p style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          “Prepare Smarter. Practice Better. Get Interview Ready.”
        </p>

        {/* Short Description */}
        <p style={{ maxWidth: '720px', margin: '0 auto 2.5rem', fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          An intelligent interview preparation platform that generates personalized interview questions using AI based on your job role, skills, experience level, programming language, and selected difficulty.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          <button
            onClick={onStartPrep || (() => setActivePage('generate'))}
            className="btn btn-primary btn-lg"
            style={{ minWidth: '220px' }}
          >
            <Sparkles size={18} /> Start Interview Preparation
          </button>
          <button
            onClick={onStartMock || (() => setActivePage('mock'))}
            className="btn btn-secondary btn-lg"
            style={{ minWidth: '220px' }}
          >
            <Play size={18} fill="currentColor" /> Take Mock Interview
          </button>
        </div>

        {/* Live Interactive Simulation Preview Card */}
        <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left', padding: '1.8rem', border: '1px solid var(--border-glow)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
              <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                ai-interview-session-live.preview
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <span className="badge badge-tech">Technical Interview</span>
              <span className="badge diff-medium">Medium</span>
              <span className="badge badge-coding">JavaScript</span>
            </div>
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>
              Sample AI Generated Question:
            </span>
            <h4 style={{ fontSize: '1.15rem', marginTop: '0.3rem', color: 'var(--text-primary)' }}>
              "Explain how the JavaScript Event Loop coordinates the Call Stack, Microtask Queue (Promises), and Macrotask Queue (setTimeout)."
            </h4>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>CANDIDATE ANSWER</span>
                <span style={{ fontSize: '0.75rem', color: '#10b981' }}>Submitted ✓</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                "Synchronous execution runs in the Call Stack. Async tasks queue up. Microtasks like Promises have priority and drain completely before the event loop pulls from the Macrotask queue."
              </p>
            </div>

            <div style={{ background: 'rgba(99, 102, 241, 0.08)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(99, 102, 241, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-violet)' }}>AI EVALUATION</span>
                <span className="badge diff-easy" style={{ fontSize: '0.8rem', fontWeight: 800 }}>8.8 / 10</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                <strong>Strength:</strong> Correctly highlighted microtask prioritization over macrotasks.
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <strong>Suggestion:</strong> Mention libuv worker pool or browser Web APIs to achieve senior-level depth.
              </p>
            </div>
          </div>
        </div>

        {/* Live Metrics Counter Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', maxWidth: '950px', margin: '3rem auto 0' }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>15,000+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Questions Generated</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-violet)' }}>94%</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Interview Confidence Rate</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>6 Categories</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Tech, Coding, HR & System</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b' }}>Real-time</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>AI Feedback & Scoring</div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-tech" style={{ marginBottom: '0.6rem' }}>Everything You Need</span>
          <h2>Engineered For Complete Interview Mastery</h2>
          <p style={{ maxWidth: '600px', margin: '0.5rem auto 0' }}>
            From fresh graduates looking for their first developer role to senior engineers tackling distributed systems.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="glass-card" style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-md)',
                    background: `${feat.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: feat.color,
                    border: `1px solid ${feat.color}40`
                  }}>
                    <Icon size={22} />
                  </div>
                  <span className="badge" style={{ background: `${feat.color}15`, color: feat.color, border: `1px solid ${feat.color}30` }}>
                    {feat.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>{feat.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ background: 'var(--bg-surface)', padding: '3rem 2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-coding" style={{ marginBottom: '0.6rem' }}>Simple 3-Step Process</span>
          <h2>How AI Interview Preparation Works</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {steps.map((st, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', position: 'relative' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                fontFamily: 'var(--font-mono)',
                color: 'rgba(99, 102, 241, 0.25)',
                lineHeight: 1
              }}>
                {st.step}
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>{st.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ready To Practice Final CTA Card */}
      <section className="glass-card" style={{
        padding: '3.5rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(217, 70, 239, 0.1) 100%)',
        border: '1px solid var(--border-glow)'
      }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '1rem' }}>
          Ready to Ace Your Next Interview?
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--text-secondary)' }}>
          Start generating targeted questions or enter a full-length mock interview session now. Completely free and customizable.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActivePage('mock')}
            className="btn btn-primary btn-lg"
          >
            <Play size={18} fill="currentColor" /> Launch Mock Interview
          </button>
          <button
            onClick={() => setActivePage('dashboard')}
            className="btn btn-secondary btn-lg"
          >
            Open Dashboard <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Clock, 
  Send, 
  SkipForward, 
  CheckCircle2, 
  AlertCircle, 
  Code2, 
  Mic, 
  MicOff, 
  Sparkles, 
  HelpCircle, 
  RotateCcw, 
  ChevronRight, 
  FileCheck, 
  X,
  Volume2
} from 'lucide-react';
import ScoreDial from '../components/ScoreDial';

export default function MockInterview({
  profile,
  initialQuestion = null,
  onFinishInterview,
  onCancel,
  apiService,
  onToast
}) {
  // Setup state vs Active Interview state
  const [sessionActive, setSessionActive] = useState(false);
  const [config, setConfig] = useState({
    sessionName: `${profile?.targetRole || 'Full Stack'} Mock Interview`,
    targetRole: profile?.targetRole || 'Full Stack Developer',
    experience: profile?.experience || 'Fresher',
    interviewType: profile?.preferredInterviewType || 'Technical Interview',
    difficulty: 'Medium',
    programmingLanguage: profile?.programmingLanguage || 'JavaScript',
    skills: profile?.skills || 'React, Node.js, SQL',
    totalQuestions: 5
  });

  // Active session questions & state
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [index]: string }
  const [evaluations, setEvaluations] = useState({}); // { [index]: evalResult }
  const [evaluating, setEvaluating] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  // Per-question timer & total session timer
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  // Timer interval
  useEffect(() => {
    let timer;
    if (sessionActive) {
      timer = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [sessionActive]);

  // Speech-to-text setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setAnswers(prev => ({
          ...prev,
          [currentIndex]: (prev[currentIndex] ? prev[currentIndex] + ' ' : '') + transcript
        }));
      };

      recognition.onerror = (e) => {
        console.warn('Speech recognition error:', e);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, [currentIndex]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      if (onToast) onToast('Speech-to-text not supported in this browser; typing is enabled.', 'error');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        if (onToast) onToast('Listening... Speak your answer now.', 'success');
      } catch (err) {
        setIsRecording(false);
      }
    }
  };

  // Launch interview
  const startSession = async () => {
    setLoadingQuestions(true);
    try {
      let qList = [];
      if (initialQuestion) {
        // If user came specifically from a "Practice this question" click
        const res = await apiService.generateQuestions({
          ...config,
          count: config.totalQuestions - 1
        });
        qList = [initialQuestion, ...(res.data || [])];
      } else {
        const res = await apiService.generateQuestions({
          ...config,
          count: config.totalQuestions
        });
        qList = res.data || [];
      }

      setQuestions(qList);
      setCurrentIndex(0);
      setAnswers({});
      setEvaluations({});
      setSecondsElapsed(0);
      setSessionActive(true);
    } catch (err) {
      if (onToast) onToast('Failed to initialize questions: ' + err.message, 'error');
    } finally {
      setLoadingQuestions(false);
    }
  };

  const currentQ = questions[currentIndex];
  const currentAnswer = answers[currentIndex] || '';
  const currentEval = evaluations[currentIndex];

  // Submit and evaluate answer for current question
  const handleSubmitAnswer = async () => {
    if (!currentAnswer.trim()) {
      if (onToast) onToast('Please provide an answer before submitting', 'error');
      return;
    }

    setEvaluating(true);
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }

    try {
      const evalPayload = {
        question: currentQ.question,
        userAnswer: currentAnswer,
        expectedAnswer: currentQ.expectedAnswer,
        keyPoints: currentQ.keyPoints || [],
        category: currentQ.category || 'Technical',
        difficulty: currentQ.difficulty || 'Medium',
        codingDetails: currentQ.codingDetails || null
      };

      const res = await apiService.evaluateAnswer(evalPayload);
      if (res.data) {
        setEvaluations(prev => ({
          ...prev,
          [currentIndex]: res.data
        }));
        if (onToast) onToast(`Answer Evaluated! Score: ${res.data.score}/10`, 'success');
      }
    } catch (err) {
      if (onToast) onToast('Evaluation error: ' + err.message, 'error');
    } finally {
      setEvaluating(false);
    }
  };

  // Skip question
  const handleSkipQuestion = () => {
    setAnswers(prev => ({ ...prev, [currentIndex]: "Skipped by candidate." }));
    setEvaluations(prev => ({
      ...prev,
      [currentIndex]: {
        score: 2.0,
        correctness: "Low",
        relevance: "Question skipped by candidate.",
        strengths: "None recorded.",
        missingPoints: currentQ.keyPoints ? currentQ.keyPoints.join("; ") : "Did not answer question.",
        suggestions: "Review this topic thoroughly before upcoming interviews.",
        idealAnswer: currentQ.expectedAnswer
      }
    }));
    handleNext();
  };

  // Next Question
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Finalize interview
  const handleCompleteInterview = () => {
    // Package up completed session
    const fullSession = {
      sessionName: config.sessionName,
      targetRole: config.targetRole,
      experience: config.experience,
      interviewType: config.interviewType,
      difficulty: config.difficulty,
      totalQuestions: questions.length,
      durationSeconds: secondsElapsed,
      questions: questions.map((q, idx) => ({
        ...q,
        userAnswer: answers[idx] || "Unanswered",
        evaluation: evaluations[idx] || {
          score: 5.0,
          correctness: "Moderate",
          relevance: "Unsubmitted answer",
          strengths: "Attempted session",
          missingPoints: "Detailed answer missing",
          suggestions: "Complete mock sessions in full",
          idealAnswer: q.expectedAnswer
        }
      }))
    };

    onFinishInterview(fullSession);
  };

  // Format seconds to mm:ss
  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Render Setup View
  if (!sessionActive) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <span className="badge badge-tech" style={{ marginBottom: '0.6rem' }}>Interactive Simulation</span>
          <h1>
            Launch AI <span className="gradient-text">Mock Interview</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Experience an authentic interview simulation. Answer one question at a time, receive instant AI scoring, and get a diagnostic final performance report.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '2rem', border: '1px solid var(--border-glow)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            
            <div className="input-group">
              <label className="input-label">Session Name</label>
              <input
                type="text"
                className="input-field"
                value={config.sessionName}
                onChange={(e) => setConfig({ ...config, sessionName: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Target Role</label>
              <input
                type="text"
                className="input-field"
                value={config.targetRole}
                onChange={(e) => setConfig({ ...config, targetRole: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Interview Type</label>
              <select
                className="select-field"
                value={config.interviewType}
                onChange={(e) => setConfig({ ...config, interviewType: e.target.value })}
              >
                <option value="Technical Interview">Technical Interview</option>
                <option value="HR Interview">HR Interview</option>
                <option value="Coding Interview">Coding Interview</option>
                <option value="Behavioral Interview">Behavioral Interview</option>
                <option value="Scenario-Based Interview">Scenario-Based Interview</option>
                <option value="Mixed Interview">Mixed Interview</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Difficulty</label>
              <select
                className="select-field"
                value={config.difficulty}
                onChange={(e) => setConfig({ ...config, difficulty: e.target.value })}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Number of Questions</label>
              <select
                className="select-field"
                value={config.totalQuestions}
                onChange={(e) => setConfig({ ...config, totalQuestions: Number(e.target.value) })}
              >
                <option value={5}>5 Questions (Express Mock ~ 10 mins)</option>
                <option value={10}>10 Questions (Standard Mock ~ 20 mins)</option>
                <option value={15}>15 Questions (Full-Length Exam ~ 35 mins)</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Programming Language</label>
              <select
                className="select-field"
                value={config.programmingLanguage}
                onChange={(e) => setConfig({ ...config, programmingLanguage: e.target.value })}
              >
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="C">C</option>
              </select>
            </div>

          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button
              onClick={startSession}
              disabled={loadingQuestions}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', maxWidth: '300px' }}
            >
              {loadingQuestions ? (
                <>
                  <Sparkles size={18} className="animate-spin" /> Preparing Interview Session...
                </>
              ) : (
                <>
                  <Play size={18} fill="currentColor" /> Begin Mock Interview
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Mock Interview Interface
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const isLastQuestion = currentIndex === questions.length - 1;
  const isCodingQuestion = currentQ?.category === 'Coding';

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Session Status Bar */}
      <div className="glass-card" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span className="badge diff-easy" style={{ fontSize: '0.85rem', fontWeight: 800 }}>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className={`badge ${currentQ?.category === 'Coding' ? 'badge-coding' : 'badge-tech'}`}>
            {currentQ?.category}
          </span>
          <span className="badge diff-medium">
            {currentQ?.difficulty}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--accent-cyan)' }}>
            <Clock size={16} /> {formatTime(secondsElapsed)}
          </div>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to exit this mock interview session?')) {
                setSessionActive(false);
              }
            }}
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--accent-rose)' }}
          >
            <X size={15} /> Exit Session
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Question Presentation Panel */}
      <div className="glass-card" style={{ padding: '2rem', border: '1px solid var(--border-glow)' }}>
        <div style={{ fontSize: '0.82rem', color: 'var(--accent-violet)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: '0.5rem' }}>
          INTERVIEW QUESTION PROMPT
        </div>
        <h2 style={{ fontSize: '1.35rem', lineHeight: 1.5, marginBottom: '1.2rem' }}>
          {currentQ?.question}
        </h2>

        {/* Coding Specifications (if coding question) */}
        {isCodingQuestion && currentQ.codingDetails && (
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.2rem',
            marginBottom: '1.5rem',
            fontSize: '0.88rem'
          }}>
            <p style={{ marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              {currentQ.codingDetails.problemStatement}
            </p>
            {currentQ.codingDetails.input && (
              <div style={{ marginBottom: '0.4rem' }}>
                <strong style={{ color: 'var(--accent-cyan)' }}>Input: </strong>
                <code>{currentQ.codingDetails.input}</code>
              </div>
            )}
            {currentQ.codingDetails.output && (
              <div style={{ marginBottom: '0.4rem' }}>
                <strong style={{ color: 'var(--accent-emerald)' }}>Output: </strong>
                <code>{currentQ.codingDetails.output}</code>
              </div>
            )}
            {currentQ.codingDetails.constraints && (
              <div style={{ marginTop: '0.6rem' }}>
                <strong style={{ color: 'var(--accent-amber)' }}>Constraints: </strong>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {currentQ.codingDetails.constraints}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Candidate Answer Workspace */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label className="input-label" style={{ marginBottom: 0 }}>
              {isCodingQuestion ? "Write Your Code & Solution Approach:" : "Type or Dictate Your Answer:"}
            </label>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {!isCodingQuestion && (
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`btn btn-sm ${isRecording ? 'btn-danger' : 'btn-secondary'}`}
                  style={{ fontSize: '0.78rem' }}
                >
                  {isRecording ? <MicOff size={13} /> : <Mic size={13} />}
                  {isRecording ? "Listening (Click to Stop)" : "Speech to Text"}
                </button>
              )}
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                {currentAnswer.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
          </div>

          {isCodingQuestion ? (
            <textarea
              className="code-editor"
              rows={12}
              placeholder={`// Write your solution approach and code in ${config.programmingLanguage} here...\n// Include your algorithmic time and space complexity.`}
              value={currentAnswer}
              onChange={(e) => setAnswers({ ...answers, [currentIndex]: e.target.value })}
            />
          ) : (
            <textarea
              className="textarea-field"
              rows={7}
              placeholder="Structure your answer clearly. Explain key mechanisms, core definitions, and trade-offs..."
              value={currentAnswer}
              onChange={(e) => setAnswers({ ...answers, [currentIndex]: e.target.value })}
            />
          )}

          {/* Action Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem', flexWrap: 'wrap', gap: '0.8rem' }}>
            <button
              onClick={handleSkipQuestion}
              className="btn btn-ghost btn-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              <SkipForward size={14} /> Skip Question
            </button>

            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button
                onClick={handleSubmitAnswer}
                disabled={evaluating || !currentAnswer.trim()}
                className="btn btn-primary"
              >
                {evaluating ? (
                  <>
                    <Sparkles size={16} className="animate-spin" /> AI Evaluating Answer...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Submit & Evaluate
                  </>
                )}
              </button>

              {currentEval && !isLastQuestion && (
                <button
                  onClick={handleNext}
                  className="btn btn-secondary"
                >
                  Next Question <ChevronRight size={16} />
                </button>
              )}

              {currentEval && isLastQuestion && (
                <button
                  onClick={handleCompleteInterview}
                  className="btn btn-primary"
                  style={{ background: 'var(--emerald-gradient)' }}
                >
                  <FileCheck size={16} /> Generate Final Report
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Evaluation Feedback Card (Displays immediately when evaluated) */}
      {currentEval && (
        <div className="glass-card" style={{ padding: '2rem', border: '1px solid var(--border-glow)', animation: 'slideUp 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} color="var(--primary)" />
                <h3 style={{ fontSize: '1.2rem' }}>AI Feedback & Scorecard</h3>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Correctness Rating: <strong style={{ color: 'var(--text-primary)' }}>{currentEval.correctness}</strong>
              </span>
            </div>

            <ScoreDial score={currentEval.score} max={10} size={75} strokeWidth={6} label="" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
            
            {/* Strengths */}
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                <CheckCircle2 size={16} /> What You Did Well
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                {currentEval.strengths}
              </p>
            </div>

            {/* Suggestions & Missing Points */}
            <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                <AlertCircle size={16} /> Key Missing Points / Suggestions
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                <strong>Missing:</strong> {currentEval.missingPoints}
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {currentEval.suggestions}
              </p>
            </div>

          </div>

          {/* Model Answer Preview */}
          {currentEval.idealAnswer && (
            <div style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-violet)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Model Benchmark Answer:
              </span>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                {currentEval.idealAnswer}
              </p>
            </div>
          )}

          {/* Bottom Next/Finish Prompt */}
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            {!isLastQuestion ? (
              <button
                onClick={handleNext}
                className="btn btn-primary"
              >
                Proceed to Question {currentIndex + 2} <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleCompleteInterview}
                className="btn btn-primary btn-lg"
                style={{ background: 'var(--emerald-gradient)' }}
              >
                <FileCheck size={18} /> View Final Diagnostic Report
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

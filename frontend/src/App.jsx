import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import GenerateQuestions from './pages/GenerateQuestions';
import MockInterview from './pages/MockInterview';
import InterviewReport from './pages/InterviewReport';
import InterviewHistory from './pages/InterviewHistory';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';
import { api } from './services/api';

export default function App() {
  const [activePage, setActivePage] = useState('landing');
  const [theme, setTheme] = useState(() => localStorage.getItem('app-theme') || 'dark');
  
  // Data state
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [settings, setSettings] = useState(null);

  // Flow State
  const [activeReport, setActiveReport] = useState(null);
  const [practiceQuestion, setPracticeQuestion] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Theme synchronization
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toast notification helper
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Initial data loading
  const loadInitialData = async () => {
    try {
      const [profRes, statsRes, qRes, intvRes, settRes] = await Promise.allSettled([
        api.getProfile(),
        api.getStats(),
        api.getQuestions(),
        api.getInterviews(),
        api.getSettings()
      ]);

      if (profRes.status === 'fulfilled' && profRes.value.data) setProfile(profRes.value.data);
      if (statsRes.status === 'fulfilled' && statsRes.value.data) setStats(statsRes.value.data);
      if (qRes.status === 'fulfilled' && qRes.value.data) setQuestions(qRes.value.data);
      if (intvRes.status === 'fulfilled' && intvRes.value.data) setInterviews(intvRes.value.data);
      if (settRes.status === 'fulfilled' && settRes.value.data) setSettings(settRes.value.data);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Handlers
  const handleGenerateQuestions = async (params) => {
    setGenerating(true);
    try {
      const res = await api.generateQuestions(params);
      if (res.data) {
        setQuestions(prev => [...res.data, ...prev]);
        addToast(`Generated ${res.data.length} interview questions successfully!`, 'success');
        // Refresh stats
        const sRes = await api.getStats();
        if (sRes.data) setStats(sRes.data);
      }
    } catch (err) {
      addToast('Error generating questions: ' + err.message, 'error');
    } finally {
      setGenerating(false);
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      const res = await api.toggleFavoriteQuestion(id);
      if (res.data) {
        setQuestions(prev => prev.map(q => q.id === id ? { ...q, isFavorite: res.data.isFavorite } : q));
        addToast(res.data.isFavorite ? 'Added to Bookmarks' : 'Removed from Bookmarks', 'info');
      }
    } catch (err) {
      addToast('Error bookmarking question', 'error');
    }
  };

  const handlePracticeQuestion = (question) => {
    setPracticeQuestion(question);
    setActivePage('mock');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishMockInterview = async (sessionData) => {
    try {
      const res = await api.saveInterview(sessionData);
      if (res.data) {
        setActiveReport(res.data);
        setActivePage('report');
        addToast('Mock interview completed and saved to history!', 'success');
        
        // Reload history & stats
        const [intvRes, statsRes] = await Promise.all([
          api.getInterviews(),
          api.getStats()
        ]);
        if (intvRes.data) setInterviews(intvRes.data);
        if (statsRes.data) setStats(statsRes.data);
      }
    } catch (err) {
      addToast('Failed to save interview session: ' + err.message, 'error');
      setActiveReport(sessionData);
      setActivePage('report');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteInterview = async (id) => {
    try {
      await api.deleteInterview(id);
      setInterviews(prev => prev.filter(i => i.id !== id));
      addToast('Interview record deleted', 'info');
      const statsRes = await api.getStats();
      if (statsRes.data) setStats(statsRes.data);
    } catch (err) {
      addToast('Failed to delete interview: ' + err.message, 'error');
    }
  };

  const handleSaveProfile = async (profileData) => {
    const res = await api.updateProfile(profileData);
    if (res.data) {
      setProfile(res.data);
    }
  };

  const handleSaveSettings = async (settingsData) => {
    const res = await api.updateSettings(settingsData);
    if (res.data) {
      setSettings(res.data);
    }
  };

  const handleResetDatabase = async () => {
    await api.resetDatabase();
    await loadInitialData();
  };

  return (
    <div className="app-container">
      {/* Ambient background glow orbs */}
      <div className="ambient-glow">
        <div className="glow-orb-1" />
        <div className="glow-orb-2" />
        <div className="glow-orb-3" />
      </div>

      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        theme={theme}
        toggleTheme={toggleTheme}
        profile={profile}
      />

      {/* Main Page Body */}
      <main className="main-content">
        {activePage === 'landing' && (
          <LandingPage
            setActivePage={setActivePage}
            onStartMock={() => { setPracticeQuestion(null); setActivePage('mock'); }}
            onStartPrep={() => setActivePage('generate')}
          />
        )}

        {activePage === 'dashboard' && (
          <Dashboard
            stats={stats}
            profile={profile}
            interviews={interviews}
            setActivePage={setActivePage}
            onViewInterviewReport={(item) => {
              setActiveReport(item);
              setActivePage('report');
            }}
            onStartMock={() => {
              setPracticeQuestion(null);
              setActivePage('mock');
            }}
          />
        )}

        {activePage === 'generate' && (
          <GenerateQuestions
            questions={questions}
            profile={profile}
            onGenerate={handleGenerateQuestions}
            onToggleFavorite={handleToggleFavorite}
            onPracticeQuestion={handlePracticeQuestion}
            onToast={addToast}
            loading={generating}
          />
        )}

        {activePage === 'mock' && (
          <MockInterview
            profile={profile}
            initialQuestion={practiceQuestion}
            onFinishInterview={handleFinishMockInterview}
            onCancel={() => setActivePage('dashboard')}
            apiService={api}
            onToast={addToast}
          />
        )}

        {activePage === 'report' && (
          <InterviewReport
            reportData={activeReport}
            onRetake={() => {
              setPracticeQuestion(null);
              setActivePage('mock');
            }}
            onBackToDashboard={() => setActivePage('dashboard')}
            onViewHistory={() => setActivePage('history')}
          />
        )}

        {activePage === 'history' && (
          <InterviewHistory
            interviews={interviews}
            onOpenReport={(item) => {
              setActiveReport(item);
              setActivePage('report');
            }}
            onDeleteInterview={handleDeleteInterview}
            onStartNewMock={() => {
              setPracticeQuestion(null);
              setActivePage('mock');
            }}
            onToast={addToast}
          />
        )}

        {activePage === 'profile' && (
          <UserProfile
            profile={profile}
            onSaveProfile={handleSaveProfile}
            onToast={addToast}
          />
        )}

        {activePage === 'settings' && (
          <Settings
            settings={settings}
            onSaveSettings={handleSaveSettings}
            onTestConnection={api.testAiConnection}
            onResetDatabase={handleResetDatabase}
            onToast={addToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActivePage={setActivePage} />

      {/* Floating Toast Container */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

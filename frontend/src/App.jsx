import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { GeneratePage } from './pages/GeneratePage';
import { MockInterviewPage } from './pages/MockInterviewPage';
import { HistoryPage } from './pages/HistoryPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { checkBackendHealth } from './services/api';

// Helper to scroll to top whenever the route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function AppContent() {
  const [backendStatus, setBackendStatus] = useState(null);

  const verifyBackend = async () => {
    try {
      const status = await checkBackendHealth();
      setBackendStatus(status);
    } catch {
      setBackendStatus({ status: 'offline' });
    }
  };

  useEffect(() => {
    verifyBackend();
    // Check health every 30 seconds
    const interval = setInterval(verifyBackend, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar backendStatus={backendStatus} />
      <main className="main-wrapper">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/generate"
            element={
              <GeneratePage
                backendStatus={backendStatus}
                onRefreshStatus={verifyBackend}
              />
            }
          />
          <Route path="/mock-interview" element={<MockInterviewPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

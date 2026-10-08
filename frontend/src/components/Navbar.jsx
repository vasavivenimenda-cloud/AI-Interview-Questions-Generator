import React, { useState } from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  HelpCircle, 
  PlayCircle, 
  History, 
  User, 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  Menu, 
  X,
  Code2
} from 'lucide-react';

export default function Navbar({ 
  activePage, 
  setActivePage, 
  theme, 
  toggleTheme, 
  profile 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home', icon: Sparkles },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'generate', label: 'Questions Bank', icon: HelpCircle },
    { id: 'mock', label: 'Mock Interview', icon: PlayCircle },
    { id: 'history', label: 'History', icon: History },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar">
      {/* Brand logo */}
      <div className="nav-brand" onClick={() => handleNavClick('landing')}>
        <div className="nav-brand-icon">
          <Sparkles size={20} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ lineHeight: 1.1 }}>
            AI Interview <span className="gradient-text">Gen</span>
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.04em' }}>
            INTELLIGENT PREPARATION
          </span>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <ul className="nav-links">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{ background: 'transparent', border: 'none', font: 'inherit' }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Right Controls: Theme Switcher & Profile Chip */}
      <div className="nav-actions">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn btn-secondary btn-sm"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          style={{ padding: '0.45rem', borderRadius: 'var(--radius-full)' }}
        >
          {theme === 'dark' ? <Sun size={17} color="#fbbf24" /> : <Moon size={17} color="#6366f1" />}
        </button>

        {/* Quick Profile preview chip */}
        <div 
          onClick={() => handleNavClick('profile')}
          className="glass-card"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <img 
            src={profile?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} 
            alt="Profile avatar" 
            style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }}
          />
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {profile?.name ? profile.name.split(' ')[0] : 'Profile'}
          </span>
        </div>

        {/* Mobile Hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="btn btn-secondary btn-sm"
          style={{ display: 'none', '@media (max-width: 900px)': { display: 'flex' } }}
          id="mobile-menu-btn"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '1rem',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            zIndex: 99
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}

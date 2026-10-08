import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Sparkles,
  Server,
  AlertCircle,
  Sun,
  Moon,
  Menu,
  X,
  LayoutDashboard,
  BrainCircuit,
  Mic,
  History,
  Home,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar = ({ backendStatus }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isConnected = backendStatus?.status === 'healthy';

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo & Name */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="brand-icon-wrapper">
            <Sparkles className="brand-icon" size={22} />
          </div>
          <div className="brand-text-block">
            <h1 className="brand-title">AI Interview Questions Generator</h1>
            <p className="brand-subtitle">Prepare Smarter &bull; Practice Better</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav desktop-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Home size={16} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/generate"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <BrainCircuit size={16} />
            <span>Generate Questions</span>
          </NavLink>

          <NavLink
            to="/mock-interview"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Mic size={16} />
            <span>Mock Interview</span>
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <History size={16} />
            <span>Interview History</span>
          </NavLink>
        </nav>

        {/* Right Action Items */}
        <div className="navbar-actions">
          {/* Backend Status Pill */}
          <div
            className={`status-pill ${isConnected ? 'status-online' : 'status-offline'}`}
            title={isConnected ? 'Backend API connected' : 'Backend offline (Ensure port 5000 is active)'}
          >
            <span className="status-dot"></span>
            <span className="status-text-desktop">
              {isConnected ? 'API Online' : 'API Offline'}
            </span>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={18} className="theme-icon sun-icon" />
            ) : (
              <Moon size={18} className="theme-icon moon-icon" />
            )}
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <nav className="mobile-nav-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <Home size={18} />
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/generate"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <BrainCircuit size={18} />
              <span>Generate Questions</span>
            </NavLink>

            <NavLink
              to="/mock-interview"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <Mic size={18} />
              <span>Mock Interview</span>
            </NavLink>

            <NavLink
              to="/history"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <History size={18} />
              <span>Interview History</span>
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

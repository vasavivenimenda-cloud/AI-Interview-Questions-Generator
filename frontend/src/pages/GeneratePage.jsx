import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { HomePage } from './HomePage';

export const GeneratePage = ({ backendStatus, onRefreshStatus }) => {
  return (
    <div className="generate-page-wrapper">
      {/* Top Context Banner */}
      <div className="page-header-banner">
        <div className="banner-nav-breadcrumb">
          <Link to="/" className="breadcrumb-back-link">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">AI Question Generation</span>
        </div>

        <div className="page-header-content">
          <div className="header-badge">
            <Sparkles size={14} /> Full-Stack SQLite Powered
          </div>
          <h1 className="page-header-title">
            AI Question Generation & <span className="gradient-text">Question Bank</span>
          </h1>
          <p className="page-header-desc">
            Generate, filter, and save targeted interview questions based on technical roles,
            experience levels, and categories. All entries are persisted directly in your SQLite
            database.
          </p>
        </div>
      </div>

      {/* Main Generator & Question Library */}
      <HomePage backendStatus={backendStatus} onRefreshStatus={onRefreshStatus} />
    </div>
  );
};

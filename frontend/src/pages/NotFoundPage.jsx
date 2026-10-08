import React from 'react';
import { Link } from 'react-router-dom';
import { Home, HelpCircle, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <HelpCircle size={48} className="not-found-icon" />
        <h1 className="not-found-title">404 - Page Not Found</h1>
        <p className="not-found-desc">
          The page or interview resource you are looking for doesn't exist or has moved.
        </p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </div>
    </div>
  );
};

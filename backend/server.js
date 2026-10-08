const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const { initDatabase, db } = require('./database/db');
const { requestLogger } = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use(requestLogger);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the AI Interview Questions Generator API',
    version: '1.0.0',
    documentation: '/api/health',
    endpoints: {
      health: 'GET /api/health',
      questions: 'GET /api/questions, POST /api/questions',
    },
  });
});

// Mount modular API routes
app.use('/api', apiRoutes);

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// Central error handling middleware
app.use(errorHandler);

// Initialize SQLite database and start HTTP server
const startServer = async () => {
  try {
    await initDatabase();
    const server = app.listen(PORT, () => {
      console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
      console.log(`📡 Health check available at http://localhost:${PORT}/api/health`);
    });

    // Graceful shutdown handling
    const shutdown = () => {
      console.log('\n🛑 Shutting down server gracefully...');
      server.close(() => {
        db.close((err) => {
          if (err) {
            console.error('Error closing SQLite DB:', err.message);
          } else {
            console.log('🔒 SQLite database connection closed.');
          }
          process.exit(0);
        });
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

    return server;
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };

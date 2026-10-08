import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Root welcome endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'AI Interview Questions Generator API',
    status: 'online',
    version: '1.0.0',
    documentation: '/api/stats',
    endpoints: {
      questions: '/api/questions',
      generate: '/api/questions/generate',
      interviews: '/api/interviews',
      profile: '/api/profile',
      stats: '/api/stats',
      settings: '/api/settings'
    }
  });
});

// Mount API routes
app.use('/api', apiRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred',
    error: err.message
  });
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 AI Interview Generator Server running on http://localhost:${PORT}`);
  console.log(`📡 API Endpoints available under http://localhost:${PORT}/api`);
  console.log(`===============================================`);
});

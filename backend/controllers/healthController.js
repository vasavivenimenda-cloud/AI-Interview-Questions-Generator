const { getQuery } = require('../database/db');
const { HTTP_STATUS } = require('../utils/constants');

const checkHealth = async (req, res, next) => {
  try {
    // Check SQLite database connectivity
    let dbStatus = 'connected';
    try {
      await getQuery('SELECT 1');
    } catch {
      dbStatus = 'disconnected';
    }

    return res.status(HTTP_STATUS.OK).json({
      status: 'healthy',
      app: 'AI Interview Questions Generator API',
      timestamp: new Date().toISOString(),
      uptime: `${Math.floor(process.uptime())}s`,
      database: dbStatus,
      environment: process.env.NODE_ENV || 'development',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { checkHealth };

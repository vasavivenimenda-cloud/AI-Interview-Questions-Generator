const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Resolve database file in backend/database/
const dbPath = process.env.DB_PATH
  ? path.resolve(__dirname, '..', process.env.DB_PATH)
  : path.resolve(__dirname, 'interview_generator.db');
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Open SQLite connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Failed to connect to SQLite database:', err.message);
  } else {
    console.log(`✅ SQLite connected successfully at: ${dbPath}`);
  }
});

// Helper for RUN (INSERT, UPDATE, DELETE)
const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ lastID: this.lastID, changes: this.changes });
      }
    });
  });
};

// Helper for single row GET
const getQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Helper for multiple rows ALL
const allQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Initialize Database Tables and Starter Seed Data
const initDatabase = async () => {
  try {
    // 1. Create questions table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        role TEXT NOT NULL,
        experience_level TEXT NOT NULL,
        tech_stack TEXT,
        question TEXT NOT NULL,
        difficulty TEXT DEFAULT 'Medium',
        category TEXT DEFAULT 'Technical',
        sample_answer TEXT,
        is_favorite INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Check if seed data is needed
    const countRow = await getQuery('SELECT COUNT(*) as count FROM questions');
    if (countRow && countRow.count === 0) {
      console.log('🌱 Seeding initial questions for demonstration...');
      
      const seedQuestions = [
        {
          role: 'Full Stack Developer',
          experience_level: 'Entry-Level / Fresher (0-1 yrs)',
          tech_stack: 'React, Node.js, Express, SQLite',
          question: 'Explain the difference between client-side routing and server-side routing in modern web applications.',
          difficulty: 'Easy',
          category: 'Technical',
          sample_answer: 'Server-side routing requests full HTML pages from the server on every URL navigation. Client-side routing intercept URL changes in the browser using the History API (like React Router), rendering components dynamically without full page reloads.'
        },
        {
          role: 'Frontend Developer',
          experience_level: 'Junior (1-3 yrs)',
          tech_stack: 'React, JavaScript, CSS',
          question: 'What is the Virtual DOM in React and how does reconciliation work?',
          difficulty: 'Medium',
          category: 'Technical',
          sample_answer: 'The Virtual DOM is a lightweight in-memory representation of the real DOM. When state changes, React creates a new VDOM tree, diffs it against the previous one (reconciliation), and updates only changed nodes in the real DOM efficiently.'
        },
        {
          role: 'Backend Developer',
          experience_level: 'Mid-Level (3-5 yrs)',
          tech_stack: 'Node.js, Express, REST APIs',
          question: 'How do you handle error propagation and asynchronous exceptions in Express.js middleware pipelines?',
          difficulty: 'Medium',
          category: 'Technical',
          sample_answer: 'In Express, synchronous errors are caught automatically, but async errors must either be passed to next(err) or handled via native Express 5 promise support. A global error-handling middleware with four parameters (err, req, res, next) intercepts and formats the final error response.'
        }
      ];

      for (const item of seedQuestions) {
        await runQuery(
          `INSERT INTO questions (role, experience_level, tech_stack, question, difficulty, category, sample_answer)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            item.role,
            item.experience_level,
            item.tech_stack,
            item.question,
            item.difficulty,
            item.category,
            item.sample_answer
          ]
        );
      }
      console.log('✅ Seed questions inserted successfully.');
    }
  } catch (err) {
    console.error('❌ Error during database initialization:', err);
  }
};

module.exports = {
  db,
  runQuery,
  getQuery,
  allQuery,
  initDatabase,
};

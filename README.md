# AI Interview Questions Generator 🎯

> **College Major & Portfolio Project**  
> An intelligent full-stack web application designed to generate, curate, and practice technical interview questions tailored to specific job roles, seniority levels, and technology stacks.

---

## 🌟 Key Highlights & Tech Stack

- **Frontend**: React 18, Vite, Modern Vanilla CSS (Custom Design System with Glassmorphism, Responsive Grid & Micro-animations), Lucide Icons
- **Backend**: Node.js, Express.js (RESTful API architecture, modular routes, controllers, services, middleware)
- **Database**: SQLite3 (Local file-based SQL storage, zero external database setup required, auto-migrating schema & seed data)
- **Language**: JavaScript (ES6+ / Node.js modules)

---

## 📂 Project Directory Structure

```
AI-Interview-Questions-Generator/
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable UI components (Navbar, Footer, QuestionCard, GeneratorForm)
│   │   ├── pages/              # View pages (HomePage dashboard)
│   │   ├── services/           # API interaction client (fetch, health check, CRUD)
│   │   ├── utils/              # Helper utilities (formatters, styling helpers, clipboard)
│   │   ├── data/               # Constants & preset role categories
│   │   ├── App.jsx             # Main application component & backend health monitor
│   │   ├── main.jsx            # React root entry point
│   │   └── index.css           # Premium responsive design system & theme variables
│   ├── package.json
│   ├── vite.config.js          # Vite config with API proxy for port 5000
│   └── index.html
│
├── backend/
│   ├── routes/                 # Express API routes (index.js, health.routes.js, question.routes.js)
│   ├── controllers/            # Request handlers (healthController.js, questionController.js)
│   ├── services/               # Business logic & query execution (questionService.js)
│   ├── database/               # SQLite connection & schema initialization (db.js)
│   ├── middleware/             # Express middlewares (errorHandler.js, logger.js)
│   ├── utils/                  # Backend constants & status codes (constants.js)
│   ├── server.js               # Express server entry point & graceful shutdown
│   ├── package.json
│   ├── .env                    # Local environment variables
│   └── .env.example            # Environment template
│
├── package.json                # Root package.json with concurrent dev runner
├── README.md                   # Full documentation & setup guide
└── .gitignore                  # Git exclusions for dependencies, logs, and database files
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18.x or higher, tested on v22.x)
- **npm** (v9.x or higher)

### 1. Installation
You can install dependencies for both frontend and backend in one command from the project root:

```bash
npm run install:all
```

*Or install them individually:*
```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

---

### 2. Running the Application

#### Option A: Run Both Together (Recommended)
From the root directory, run:
```bash
npm run dev
```
This runs the Express API server on `http://localhost:5000` and the Vite React app on `http://localhost:5173` concurrently.

---

#### Option B: Run Individually in Separate Terminals

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
- Server starts on: **`http://localhost:5000`**
- Health Check: **`http://localhost:5000/api/health`**

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
- Frontend starts on: **`http://localhost:5173`**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API Root Welcome & Version Info |
| `GET` | `/api/health` | Service health status and SQLite connectivity check |
| `GET` | `/api/questions` | List questions (Supports `?role=`, `?difficulty=`, `?category=`) |
| `GET` | `/api/questions/:id` | Fetch a single question by ID |
| `POST` | `/api/questions` | Create / save a new question record |
| `PATCH`| `/api/questions/:id/favorite` | Toggle bookmark / favorite status |
| `DELETE`| `/api/questions/:id` | Remove a question by ID |

---

## 🗄️ Database Schema (SQLite)

The database file is automatically created at `backend/database/interview_generator.db` upon starting the server.

```sql
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
);
```

Starter seed questions are automatically inserted on the first startup for immediate testing and demonstration.

---

## 🔮 Next Steps / Feature Roadmap

1. **AI Integration**:
   - Connect Google Gemini API or OpenAI API in `backend/services/questionService.js` to generate dynamic questions on-demand.
2. **Mock Interview Simulator**:
   - Add timer-based interview simulation mode where users answer questions and receive instant AI feedback.
3. **Resume / Job Description Parser**:
   - Allow candidates to paste a job description or upload a PDF resume to generate hyper-personalized interview questions.
4. **Export & Sharing**:
   - Download interview cheat-sheets as PDF or Markdown.

---

## 🎓 Academic / Portfolio Note
Developed as a Major Project showcasing:
- Clean modular design patterns (Separation of Concerns: Routes ➔ Controllers ➔ Services ➔ Database)
- Full-stack asynchronous data flow
- Resilient error handling and logging
- Modern, accessible, responsive frontend UI

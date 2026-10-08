import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, '..', 'data', 'database.json');

// Ensure data folder exists
const dataDir = path.dirname(DB_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const getInitialData = () => ({
  profile: {
    id: "user-default-1",
    name: "Alex Morgan",
    education: "B.Tech in Computer Science & Engineering",
    experience: "Fresher",
    targetRole: "Full Stack Developer",
    skills: "React, Node.js, Python, JavaScript, SQL, Git, REST APIs",
    programmingLanguage: "JavaScript",
    preferredInterviewType: "Technical Interview",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    updatedAt: new Date().toISOString()
  },
  settings: {
    provider: "mock",
    geminiApiKey: "",
    openaiApiKey: "",
    model: "gemini-1.5-flash",
    temperature: 0.7
  },
  questions: [
    {
      id: "q-sample-1",
      question: "Explain the event loop in JavaScript and how asynchronous callbacks are processed.",
      category: "Technical",
      difficulty: "Medium",
      jobRole: "Full Stack Developer",
      skills: "JavaScript, Node.js",
      programmingLanguage: "JavaScript",
      expectedAnswer: "The event loop monitors the Call Stack and the Task Queue (Callback Queue and Microtask Queue). When the call stack is empty, it pushes tasks from queues to the stack, prioritizing microtasks like Promises over macrotasks like setTimeout.",
      explanation: "JavaScript is single-threaded. Concurrency is achieved through the browser/Node event loop coordinating the V8 engine, Web APIs, and queue mechanisms.",
      keyPoints: [
        "Single-threaded execution with non-blocking I/O",
        "Call Stack handles synchronous execution",
        "Microtasks (Promises, process.nextTick) have higher priority",
        "Macrotasks (setTimeout, setInterval, I/O) execute after microtask drain"
      ],
      isFavorite: true,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: "q-sample-2",
      question: "Tell me about a challenging bug you encountered in a project and how you diagnosed and resolved it.",
      category: "Behavioral",
      difficulty: "Medium",
      jobRole: "Software Engineer",
      skills: "Problem Solving, Debugging, Communication",
      programmingLanguage: "General",
      expectedAnswer: "Use the STAR method: Situation (project context), Task (what failed or needed resolution), Action (systematic debugging steps, profiling, root cause analysis), Result (impact, resolution, tests added to prevent recurrence).",
      explanation: "Interviewers look for structured problem solving, resilience under pressure, and systematic debugging methodology rather than guesswork.",
      keyPoints: [
        "Clear STAR structure (Situation, Task, Action, Result)",
        "Root cause analysis over superficial fixes",
        "Testing and post-mortem actions taken"
      ],
      isFavorite: false,
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: "q-sample-3",
      question: "Two Sum Problem: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      category: "Coding",
      difficulty: "Easy",
      jobRole: "Software Engineer",
      skills: "Data Structures, Hash Tables, Algorithms",
      programmingLanguage: "Python",
      expectedAnswer: "Use a hash map to store previously seen numbers and their indices. For each number x, check if (target - x) exists in the hash map. This achieves O(n) time and O(n) space complexity.",
      explanation: "Brute force checks all pairs in O(n^2). Storing complements in a dictionary reduces lookup time to O(1) on average.",
      keyPoints: [
        "Single pass hash map technique",
        "O(n) time complexity, O(n) auxiliary space",
        "Edge case handling: duplicate numbers, no solution"
      ],
      codingDetails: {
        problemStatement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.",
        example: "Input: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
        expectedApproach: "Iterate through the array while maintaining a hash table mapping each element value to its index. At index i, compute complement = target - nums[i]. If complement is in the map, return [map[complement], i]. Otherwise, record nums[i]: i.",
        solutionExplanation: "Time Complexity: O(n) where n is the number of elements. Space Complexity: O(n) for the hash map."
      },
      isFavorite: true,
      createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
    },
    {
      id: "q-sample-4",
      question: "What are the main principles of RESTful API design and how do HTTP status codes reflect operation results?",
      category: "Technical",
      difficulty: "Easy",
      jobRole: "Backend Developer",
      skills: "REST APIs, HTTP, Web Architecture",
      programmingLanguage: "JavaScript",
      expectedAnswer: "REST principles include client-server separation, statelessness, cacheability, uniform interface, and layered systems. HTTP verbs (GET, POST, PUT, DELETE, PATCH) represent actions, while status codes (2xx success, 3xx redirection, 4xx client errors, 5xx server errors) inform the client of outcomes.",
      explanation: "Adhering to standard HTTP semantics allows predictable client consumption and reliable distributed caching.",
      keyPoints: [
        "Stateless communication where every request contains all necessary auth and data",
        "Resource-oriented URI naming with proper HTTP methods",
        "Accurate status codes (200, 201, 400, 401, 403, 404, 500)"
      ],
      isFavorite: false,
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
      id: "q-sample-5",
      question: "Why should we hire you for this role over other qualified candidates?",
      category: "HR",
      difficulty: "Medium",
      jobRole: "Full Stack Developer",
      skills: "Communication, Confidence, Value Proposition",
      programmingLanguage: "General",
      expectedAnswer: "Combine technical proficiency with passion, cultural fit, adaptability, and proactive problem solving. Highlight specific achievements that match the company goals.",
      explanation: "Focus on unique strengths, fast learning ability, alignment with company mission, and eagerness to contribute immediately.",
      keyPoints: [
        "Highlight unique intersection of technical skills and team collaboration",
        "Demonstrate understanding of the company domain",
        "Show enthusiasm and long-term commitment"
      ],
      isFavorite: false,
      createdAt: new Date(Date.now() - 86400000 * 6).toISOString()
    },
    {
      id: "q-sample-6",
      question: "Design a high-level URL Shortener system (like Bitly) handling 100M new URLs per month.",
      category: "System Design",
      difficulty: "Hard",
      jobRole: "Backend Developer",
      skills: "System Design, Databases, Caching, Scaling",
      programmingLanguage: "General",
      expectedAnswer: "Core architecture: API Gateway/Load Balancer -> App Servers -> Distributed ID Generator (Snowflake or Base62 encoding) -> Key-Value / NoSQL Store (Cassandra or DynamoDB) with Redis Cache for popular URLs (80/20 rule).",
      explanation: "Interviewers evaluate estimation of QPS and storage, schema design, hash collisions mitigation, and multi-tier caching strategy.",
      keyPoints: [
        "Base62 encoding (a-z, A-Z, 0-9) yielding 62^7 (~3.5 trillion) combinations",
        "Read-heavy system (e.g. 10:1 or 50:1 read to write ratio)",
        "Distributed caching using Redis or Memcached with LRU eviction",
        "Database sharding and replication for high availability"
      ],
      isFavorite: true,
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString()
    },
    {
      id: "q-sample-7",
      question: "A production service is suddenly returning HTTP 504 Gateway Timeout errors for 30% of traffic. How do you triage this incident?",
      category: "Scenario-Based",
      difficulty: "Hard",
      jobRole: "DevOps Engineer / Backend",
      skills: "Incident Response, Observability, Root Cause Analysis",
      programmingLanguage: "General",
      expectedAnswer: "1. Mitigate immediate impact (rollback recent deployment or scale up/restart unhealthy pods). 2. Inspect APM/distributed tracing and gateway logs to isolate which upstream backend microservice is lagging. 3. Check database connection pool exhaustion, slow queries, or CPU/memory throttling. 4. Communicate status to stakeholders.",
      explanation: "Demonstrates production readiness, calm incident triaging methodology, and distinction between mitigation and root cause fixing.",
      keyPoints: [
        "Immediate mitigation priority (traffic routing, rollback, scale)",
        "APM metrics inspection: latency spikes, downstream database locks",
        "Checking saturation: CPU, memory, thread pool exhaustion",
        "Post-incident blameless postmortem and alert threshold refinement"
      ],
      isFavorite: false,
      createdAt: new Date(Date.now() - 86400000 * 8).toISOString()
    }
  ],
  interviews: [
    {
      id: "int-hist-1",
      sessionName: "Full Stack Technical Screening",
      targetRole: "Full Stack Developer",
      experience: "Fresher",
      interviewType: "Technical Interview",
      difficulty: "Medium",
      totalQuestions: 5,
      completedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      overallScore: 8.4,
      technicalScore: 8.8,
      communicationScore: 8.2,
      problemSolvingScore: 8.5,
      hrScore: 8.0,
      percentage: 84,
      strongAreas: [
        "Solid grasp of JavaScript asynchronous runtime and Event Loop mechanics",
        "Accurate understanding of RESTful API status codes and stateless design",
        "Clear articulation of front-end state management concepts"
      ],
      weakAreas: [
        "Could deepen discussion on microtask vs macrotask execution order in V8",
        "Need to explicitly cover error handling boundaries in distributed systems"
      ],
      personalizedSuggestions: [
        "Review the Node.js libuv event loop phases (timers, I/O callbacks, poll, check, close).",
        "Practice framing answers with concrete real-world project examples."
      ],
      questions: [
        {
          id: "q-sample-1",
          question: "Explain the event loop in JavaScript and how asynchronous callbacks are processed.",
          category: "Technical",
          difficulty: "Medium",
          userAnswer: "The event loop in JavaScript allows non-blocking execution by managing call stack and queues. Synchronous code runs on the call stack. Asynchronous callbacks from timers or fetch go to queues. Microtasks like promises execute first when stack clears, followed by macrotasks.",
          evaluation: {
            score: 9.0,
            correctness: "High",
            relevance: "Directly addresses JavaScript runtime mechanics",
            strengths: "Clearly distinguished microtasks vs macrotasks and call stack processing.",
            missingPoints: "Could mention libuv in Node or Web APIs in browser.",
            suggestions: "Mentioning event loop starvation or long-running CPU blocking adds extra depth.",
            idealAnswer: "The event loop monitors Call Stack and queues. When Call Stack empties, it flushes microtask queue (Promises) before picking the next macrotask (setTimeout)."
          }
        },
        {
          id: "q-sample-4",
          question: "What are the main principles of RESTful API design and how do HTTP status codes reflect operation results?",
          category: "Technical",
          difficulty: "Easy",
          userAnswer: "REST APIs use stateless client-server communication with HTTP methods like GET for reading, POST for creating, PUT for updating, and DELETE for removing. Status codes include 200 OK, 201 Created, 400 Bad Request, 404 Not Found, and 500 Server Error.",
          evaluation: {
            score: 8.5,
            correctness: "High",
            relevance: "Comprehensive overview of verbs and status codes",
            strengths: "Correctly listed core HTTP verbs and typical status codes.",
            missingPoints: "Mention of idempotency (PUT vs POST) and resource URI naming convention.",
            suggestions: "Discussing idempotence and caching headers demonstrates senior-level knowledge.",
            idealAnswer: "REST principles include statelessness, cacheability, uniform interface, and resource-based URIs. HTTP verbs represent actions, status codes represent results."
          }
        }
      ]
    },
    {
      id: "int-hist-2",
      sessionName: "Algorithmic & Problem Solving Mock",
      targetRole: "Software Engineer",
      experience: "Fresher",
      interviewType: "Coding Interview",
      difficulty: "Easy",
      totalQuestions: 5,
      completedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      overallScore: 7.8,
      technicalScore: 8.0,
      communicationScore: 7.5,
      problemSolvingScore: 8.2,
      hrScore: 7.4,
      percentage: 78,
      strongAreas: [
        "Optimal O(n) space-time tradeoff identified on Two Sum",
        "Clear algorithmic complexity estimation"
      ],
      weakAreas: [
        "Mentioned edge cases only after prompting",
        "Could write more robust test cases"
      ],
      personalizedSuggestions: [
        "Always state edge cases (empty array, negative values, large constraints) before writing code.",
        "Narrate your thought process out loud to boost communication score."
      ],
      questions: []
    }
  ]
});

export const readDb = () => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialData();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database file, using default data:', err);
    return getInitialData();
  }
};

export const writeDb = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing to database:', err);
    return false;
  }
};

// Profile operations
export const getProfile = () => {
  const db = readDb();
  return db.profile;
};

export const updateProfile = (profileData) => {
  const db = readDb();
  db.profile = {
    ...db.profile,
    ...profileData,
    updatedAt: new Date().toISOString()
  };
  writeDb(db);
  return db.profile;
};

// Settings operations
export const getSettings = () => {
  const db = readDb();
  return db.settings || { provider: 'mock' };
};

export const updateSettings = (settingsData) => {
  const db = readDb();
  db.settings = {
    ...db.settings,
    ...settingsData
  };
  writeDb(db);
  return db.settings;
};

// Questions operations
export const getQuestions = (filters = {}) => {
  const db = readDb();
  let questions = db.questions || [];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    questions = questions.filter(item =>
      (item.question && item.question.toLowerCase().includes(q)) ||
      (item.skills && item.skills.toLowerCase().includes(q)) ||
      (item.category && item.category.toLowerCase().includes(q)) ||
      (item.jobRole && item.jobRole.toLowerCase().includes(q))
    );
  }

  if (filters.category && filters.category !== 'All') {
    questions = questions.filter(item => item.category === filters.category);
  }

  if (filters.difficulty && filters.difficulty !== 'All') {
    questions = questions.filter(item => item.difficulty === filters.difficulty);
  }

  if (filters.jobRole && filters.jobRole !== 'All') {
    questions = questions.filter(item =>
      item.jobRole && item.jobRole.toLowerCase().includes(filters.jobRole.toLowerCase())
    );
  }

  if (filters.programmingLanguage && filters.programmingLanguage !== 'All') {
    questions = questions.filter(item =>
      item.programmingLanguage === filters.programmingLanguage || item.programmingLanguage === 'General'
    );
  }

  if (filters.favoriteOnly === true || filters.favoriteOnly === 'true') {
    questions = questions.filter(item => item.isFavorite);
  }

  return questions;
};

export const getQuestionById = (id) => {
  const db = readDb();
  return (db.questions || []).find(q => q.id === id);
};

export const addQuestions = (newQuestions) => {
  const db = readDb();
  if (!db.questions) db.questions = [];

  const prepared = newQuestions.map((q, idx) => ({
    id: q.id || `q-gen-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
    question: q.question,
    category: q.category || 'Technical',
    difficulty: q.difficulty || 'Medium',
    jobRole: q.jobRole || db.profile.targetRole || 'Software Engineer',
    skills: q.skills || db.profile.skills || 'Problem Solving',
    programmingLanguage: q.programmingLanguage || db.profile.programmingLanguage || 'JavaScript',
    expectedAnswer: q.expectedAnswer || '',
    explanation: q.explanation || '',
    keyPoints: Array.isArray(q.keyPoints) ? q.keyPoints : [q.expectedAnswer],
    codingDetails: q.codingDetails || null,
    isFavorite: false,
    createdAt: new Date().toISOString()
  }));

  db.questions = [...prepared, ...db.questions];
  writeDb(db);
  return prepared;
};

export const toggleFavoriteQuestion = (id) => {
  const db = readDb();
  const index = (db.questions || []).findIndex(q => q.id === id);
  if (index !== -1) {
    db.questions[index].isFavorite = !db.questions[index].isFavorite;
    writeDb(db);
    return db.questions[index];
  }
  return null;
};

export const deleteQuestion = (id) => {
  const db = readDb();
  const initialLength = (db.questions || []).length;
  db.questions = (db.questions || []).filter(q => q.id !== id);
  if (db.questions.length !== initialLength) {
    writeDb(db);
    return true;
  }
  return false;
};

// Interview Operations
export const getInterviews = () => {
  const db = readDb();
  return (db.interviews || []).sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
};

export const getInterviewById = (id) => {
  const db = readDb();
  return (db.interviews || []).find(i => i.id === id);
};

export const saveInterview = (interviewData) => {
  const db = readDb();
  if (!db.interviews) db.interviews = [];

  const newInterview = {
    id: interviewData.id || `int-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    sessionName: interviewData.sessionName || `${interviewData.targetRole || 'Software'} ${interviewData.interviewType || 'Mock'} Interview`,
    targetRole: interviewData.targetRole || db.profile.targetRole || 'Software Engineer',
    experience: interviewData.experience || db.profile.experience || 'Fresher',
    interviewType: interviewData.interviewType || 'Technical Interview',
    difficulty: interviewData.difficulty || 'Medium',
    totalQuestions: interviewData.questions ? interviewData.questions.length : (interviewData.totalQuestions || 5),
    completedAt: new Date().toISOString(),
    overallScore: Number(interviewData.overallScore || 0),
    technicalScore: Number(interviewData.technicalScore || 0),
    communicationScore: Number(interviewData.communicationScore || 0),
    problemSolvingScore: Number(interviewData.problemSolvingScore || 0),
    hrScore: Number(interviewData.hrScore || 0),
    percentage: Math.round((Number(interviewData.overallScore || 0) / 10) * 100),
    strongAreas: interviewData.strongAreas || [],
    weakAreas: interviewData.weakAreas || [],
    personalizedSuggestions: interviewData.personalizedSuggestions || [],
    questions: interviewData.questions || []
  };

  db.interviews.unshift(newInterview);
  writeDb(db);
  return newInterview;
};

export const deleteInterview = (id) => {
  const db = readDb();
  const initialLength = (db.interviews || []).length;
  db.interviews = (db.interviews || []).filter(i => i.id !== id);
  if (db.interviews.length !== initialLength) {
    writeDb(db);
    return true;
  }
  return false;
};

// Stats computation
export const getStats = () => {
  const db = readDb();
  const interviews = db.interviews || [];
  const questions = db.questions || [];

  const totalInterviews = interviews.length;
  const totalQuestionsPracticed = interviews.reduce((sum, intv) => sum + (intv.questions ? intv.questions.length : intv.totalQuestions || 0), 0);
  
  let avgScore = 0;
  let bestScore = 0;
  if (totalInterviews > 0) {
    const sumScore = interviews.reduce((sum, intv) => sum + (intv.overallScore || 0), 0);
    avgScore = Number((sumScore / totalInterviews).toFixed(1));
    bestScore = Math.max(...interviews.map(i => i.overallScore || 0));
  }

  // Categories breakdown
  const categoryCounts = {};
  questions.forEach(q => {
    const cat = q.category || 'Technical';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  return {
    totalInterviews,
    totalQuestionsPracticed: totalQuestionsPracticed || questions.length,
    totalQuestionsInBank: questions.length,
    averageScore: avgScore,
    bestScore: bestScore,
    categoryCounts,
    profile: db.profile,
    recentInterviews: interviews.slice(0, 5)
  };
};

export const resetDatabase = () => {
  const initial = getInitialData();
  writeDb(initial);
  return initial;
};

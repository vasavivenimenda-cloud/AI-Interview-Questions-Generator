// Intelligent offline AI question generator and answer evaluator
// Generates contextual, rich, domain-specific interview questions and grades answers

const QUESTION_POOL = {
  Technical: [
    {
      roles: ["Full Stack Developer", "Frontend Developer", "Web Developer"],
      languages: ["JavaScript", "TypeScript"],
      difficulty: "Easy",
      question: "Explain the difference between let, const, and var in JavaScript. How does variable hoisting affect them?",
      expectedAnswer: "var is function-scoped and hoisted with undefined initialization. let and const are block-scoped and hoisted in the Temporal Dead Zone (TDZ). const prevents reassignment to the binding.",
      explanation: "Block-scoping introduced in ES6 prevents unintentional global leakage and variable shadowing bugs common with var.",
      keyPoints: ["var is function-scoped and initialized with undefined", "let/const are block-scoped", "Temporal Dead Zone (TDZ) causes ReferenceError if accessed before declaration", "const variables cannot be reassigned"]
    },
    {
      roles: ["Full Stack Developer", "Frontend Developer"],
      languages: ["JavaScript", "TypeScript"],
      difficulty: "Medium",
      question: "How does React's Virtual DOM work, and how does React optimize reconciliation when state changes?",
      expectedAnswer: "React maintains a lightweight in-memory representation of the DOM. When state changes, a new VDOM tree is created, diffed against the previous tree (diffing algorithm with O(n) heuristics), and minimal real DOM mutations are batched.",
      explanation: "Direct DOM manipulations are expensive. Virtual DOM diffing minimizes layout recalculations and repaints in the browser.",
      keyPoints: ["In-memory representation of UI", "Diffing algorithm compares elements by type and key props", "Batched updates prevent layout thrashing", "Fiber architecture enables interruptible rendering"]
    },
    {
      roles: ["Backend Developer", "Full Stack Developer", "Software Engineer"],
      languages: ["JavaScript", "Python", "Java", "General"],
      difficulty: "Medium",
      question: "Explain the ACID properties in relational database management systems and why they matter in transaction processing.",
      expectedAnswer: "Atomicity (all or nothing), Consistency (preserves database integrity rules), Isolation (concurrent transactions execute independently without interference), Durability (committed data survives system crashes).",
      explanation: "ACID properties are foundational for financial and enterprise systems where data corruption or lost updates are unacceptable.",
      keyPoints: ["Atomicity prevents partial writes", "Consistency maintains schema and business constraints", "Isolation levels (Read Committed, Repeatable Read, Serializable)", "Durability guarantees persistence via Write-Ahead Logging (WAL)"]
    },
    {
      roles: ["Backend Developer", "Cloud Engineer", "DevOps Engineer"],
      languages: ["General", "Python", "Java"],
      difficulty: "Hard",
      question: "What is database indexing? Explain the difference between B-Tree and Hash indexes and when you should avoid adding an index.",
      expectedAnswer: "Indexes are data structures that speed up query retrieval at the expense of slower writes and higher storage. B-Trees support range queries and order by, while Hash indexes offer O(1) exact match lookups only. Avoid indexing low-cardinality columns or tables with high write volume.",
      explanation: "Over-indexing degrades write throughput because each INSERT/UPDATE/DELETE requires updating index trees.",
      keyPoints: ["B-Trees are balanced trees supporting range scans and sorting", "Hash indexes support equality lookups only", "Write amplification on insert/update/delete", "Avoid indexing columns with low selectivity (e.g. boolean flags)"]
    },
    {
      roles: ["Frontend Developer", "Full Stack Developer"],
      languages: ["JavaScript", "TypeScript"],
      difficulty: "Medium",
      question: "What are CSS Box Model, specificity, and the stacking context in modern responsive web design?",
      expectedAnswer: "Box Model consists of content, padding, border, and margin (box-sizing: border-box simplifies calculation). Specificity determines which CSS rules apply (inline > IDs > classes/attributes/pseudo-classes > elements). Stacking context dictates z-index rendering layers.",
      explanation: "Mastery of rendering fundamentals prevents layout bugs and unexpected z-index clipping.",
      keyPoints: ["box-sizing: border-box includes padding and border in width", "Specificity calculation formula", "Stacking context creation (opacity, transform, z-index with position)"]
    },
    {
      roles: ["Backend Developer", "Software Engineer"],
      languages: ["Python", "Java", "C++"],
      difficulty: "Hard",
      question: "Explain concurrency versus parallelism, and how multi-threading is handled in your primary programming language.",
      expectedAnswer: "Concurrency is dealing with lots of things at once (structure), while parallelism is doing lots of things at once (simultaneous hardware execution). In Python, GIL limits CPU-bound multi-threading; in Java, native OS threads are scheduled across cores; in Node.js, single-thread event loop with libuv worker pool.",
      explanation: "Understanding concurrency primitives prevents deadlocks, race conditions, and bottlenecks in high-throughput services.",
      keyPoints: ["Concurrency: task interleaving vs Parallelism: true simultaneous execution", "Race conditions and synchronization (mutex, semaphores)", "Language runtime details (GIL, ThreadPool, Goroutines, Event Loop)"]
    }
  ],

  HR: [
    {
      roles: ["General", "Software Engineer", "Fresher", "Experienced"],
      languages: ["General"],
      difficulty: "Easy",
      question: "Tell me about yourself, your educational background, and why you are interested in this position.",
      expectedAnswer: "Provide a structured pitch: 1. Present role/recent studies, 2. Key technical projects and relevant achievements, 3. Why this company/domain excites you, 4. How your skills make you a high-impact contributor.",
      explanation: "The interviewer assesses self-awareness, communication skills, career focus, and cultural alignment.",
      keyPoints: ["Elevator pitch structured in Present-Past-Future flow", "Highlight 1-2 impactful projects or achievements", "Demonstrate genuine enthusiasm for the company's domain", "Keep response crisp (under 2 minutes)"]
    },
    {
      roles: ["General", "Fresher", "Experienced"],
      languages: ["General"],
      difficulty: "Medium",
      question: "What are your greatest professional strengths and your biggest area for improvement?",
      expectedAnswer: "For strength, choose a skill backed by quantifiable examples (e.g., rapid learning and methodical debugging). For weakness, choose an authentic area you are actively remediating with concrete habits (e.g., delegation or initial reluctance to speak up in large meetings).",
      explanation: "Honesty and self-reflection indicate growth mindset, whereas cliché answers ('I am a perfectionist') signal lack of genuine insight.",
      keyPoints: ["Back strengths with concrete outcomes", "Frame weakness with active remediation steps", "Display growth mindset and openness to feedback"]
    },
    {
      roles: ["General", "Experienced"],
      languages: ["General"],
      difficulty: "Medium",
      question: "Where do you see yourself professionally in the next 3 to 5 years, and how does this role align with your aspirations?",
      expectedAnswer: "Express goals to deepen technical mastery, take ownership of architectural decisions or team mentoring, and deliver tangible business value in this domain.",
      explanation: "Evaluates career ambition, stability, and whether the company can provide mutually beneficial growth opportunities.",
      keyPoints: ["Clear desire for continuous technical depth", "Progression towards ownership and mentorship", "Alignment with company trajectory"]
    },
    {
      roles: ["General"],
      languages: ["General"],
      difficulty: "Hard",
      question: "How do you handle tight deadlines, shifting priorities, or high-pressure workplace situations?",
      expectedAnswer: "Prioritize with Eisenhower matrix or agile backlog grooming, communicate early and transparently with leads, break problems into manageable sprints, and focus on delivering highest-value deliverables first.",
      explanation: "Shows emotional intelligence, stress resilience, and realistic project management under pressure.",
      keyPoints: ["Proactive stakeholder communication", "Ruthless prioritization based on impact", "De-escalation and stress management strategies"]
    }
  ],

  Behavioral: [
    {
      roles: ["General", "Software Engineer"],
      languages: ["General"],
      difficulty: "Medium",
      question: "Describe a situation where you had a disagreement with a team member or manager over a technical approach. How did you resolve it?",
      expectedAnswer: "Apply the STAR method: explain the technical trade-off, active listening to the other viewpoint, running a proof-of-concept or benchmark to let data guide the decision, and committing wholeheartedly to the consensus once chosen.",
      explanation: "Evaluates ego management, professional disagree-and-commit principles, and collaborative problem solving.",
      keyPoints: ["Objective data-driven evaluation rather than emotional argument", "Respectful active listening and understanding trade-offs", "Disagree and commit to team decisions"]
    },
    {
      roles: ["General", "Software Engineer"],
      languages: ["General"],
      difficulty: "Medium",
      question: "Give an example of a project where you failed or made a critical mistake. What did you learn and how did you bounce back?",
      expectedAnswer: "Acknowledge ownership of the mistake, describe immediate containment actions, root cause analysis (5 Whys), automated safeguards introduced (linting, tests, alerts), and long-term personal takeaway.",
      explanation: "Demonstrates accountability, resilience, and systematic learning from failure.",
      keyPoints: ["Total ownership without blaming others", "Rapid containment and transparent communication", "Preventive mechanisms put in place"]
    },
    {
      roles: ["General", "Software Engineer"],
      languages: ["General"],
      difficulty: "Hard",
      question: "Tell me about a time you had to learn an unfamiliar technology or framework very quickly to deliver a project milestone.",
      expectedAnswer: "Explain the deadline pressure, structured learning roadmap (official docs, building quick minimal prototypes, asking targeted questions to mentors), and successful delivery of the feature with unit tests.",
      explanation: "Highlights adaptability and high learning agility in fast-evolving tech environments.",
      keyPoints: ["Structured methodology to learn under pressure", "Hands-on prototype-driven validation", "Delivery outcome and mentoring others afterwards"]
    }
  ],

  Coding: [
    {
      roles: ["Software Engineer", "Full Stack Developer", "Backend Developer"],
      languages: ["Python", "Java", "C", "C++", "JavaScript"],
      difficulty: "Easy",
      question: "Valid Palindrome: Write an algorithm to check whether a given string is a palindrome, considering only alphanumeric characters and ignoring cases.",
      expectedAnswer: "Use two pointers (one at the beginning, one at the end). Move pointers towards the middle, skipping non-alphanumeric characters, and compare lowercase characters. Returns true if all match.",
      explanation: "Two pointers approach provides optimal O(n) time complexity and O(1) auxiliary space without creating extra copies of strings.",
      keyPoints: ["Two-pointer technique from opposite ends", "O(n) time complexity, O(1) space", "Handling whitespace and special characters"],
      codingDetails: {
        problemStatement: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.",
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        constraints: "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
        example: 'Input: s = "race a car"\nOutput: false\nExplanation: "raceacar" is not a palindrome.',
        expectedApproach: "Maintain two pointers `left = 0` and `right = s.length - 1`. While left < right, skip non-alphanumeric chars. If s[left].toLowerCase() !== s[right].toLowerCase(), return false. Otherwise increment left, decrement right. Return true.",
        solutionExplanation: "Optimal O(n) time complexity where n is the length of string s, and O(1) auxiliary space."
      }
    },
    {
      roles: ["Software Engineer", "Backend Developer"],
      languages: ["Python", "Java", "C", "C++", "JavaScript"],
      difficulty: "Medium",
      question: "Longest Substring Without Repeating Characters: Find the length of the longest substring without duplicate characters.",
      expectedAnswer: "Use a sliding window with a hash map to track the most recent index of each character. Advance the right pointer and whenever a duplicate is found within the current window, shift the left pointer past its previous index.",
      explanation: "Sliding window avoids O(n^2) or O(n^3) brute force sub-string checks by dynamically adjusting bounds in a single linear pass.",
      keyPoints: ["Sliding window with left and right pointers", "Hash Map / array to store last seen index", "O(n) time and O(min(m, n)) space complexity"],
      codingDetails: {
        problemStatement: "Given a string s, find the length of the longest substring without repeating characters.",
        input: 's = "abcabcbb"',
        output: "3",
        constraints: "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
        example: 'Input: s = "bbbbb"\nOutput: 1\nExplanation: The answer is "b", with the length of 1.',
        expectedApproach: "Use sliding window. Keep a map `lastSeen = {}`. For each index right, if char was seen at index >= left, update left = lastSeen[char] + 1. Update maxLen = Math.max(maxLen, right - left + 1) and record lastSeen[char] = right.",
        solutionExplanation: "Time Complexity: O(n) single pass. Space Complexity: O(k) where k is size of character set."
      }
    },
    {
      roles: ["Software Engineer", "Backend Developer"],
      languages: ["Python", "Java", "C++", "JavaScript"],
      difficulty: "Hard",
      question: "Merge k Sorted Lists: Merge k sorted linked lists and return it as one sorted list.",
      expectedAnswer: "Use a Min-Heap (Priority Queue) containing the head nodes of all k lists. Repeatedly pop the minimum node, append it to the result list, and push its next node into the heap. Alternatively, use divide-and-conquer merge sort.",
      explanation: "Brute force takes O(N * k). Using a Min-Heap or divide and conquer reduces complexity to O(N log k) where N is total nodes.",
      keyPoints: ["Min-Heap / Priority Queue approach", "O(N log k) time complexity where N is total nodes", "Divide and Conquer pair-wise merge alternative"],
      codingDetails: {
        problemStatement: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]",
        constraints: "k == lists.length\n0 <= k <= 10^4\n0 <= lists[i].length <= 500\n-10^4 <= lists[i][j] <= 10^4",
        example: "Input: lists = []\nOutput: []",
        expectedApproach: "Build a min-heap with the first element of each list. Pop the minimum element, attach to result, and insert the next element of that list into heap until heap is empty.",
        solutionExplanation: "Time complexity is O(N log k), space complexity is O(k) for the heap."
      }
    }
  ],

  "Scenario-Based": [
    {
      roles: ["Full Stack Developer", "Backend Developer", "DevOps Engineer"],
      languages: ["General"],
      difficulty: "Medium",
      question: "Your web application experiences an unexpected 10x traffic spike due to a marketing campaign, and the database CPU reaches 100%. What immediate and architectural steps do you take?",
      expectedAnswer: "Immediate: Enable read replicas, add caching layer (Redis) for hot queries, configure rate limiting and query timeouts, shed non-critical background jobs. Long-term: Database read-write splitting, connection pooling (PgBouncer), schema optimization, CDN caching.",
      explanation: "Assesses real-world system resilience, capacity planning, and degradation strategies under load.",
      keyPoints: ["Immediate caching of read-heavy hot paths", "Read replica routing to offload primary database", "Connection pooling and query queue throttling", "Graceful feature degradation for non-essential traffic"]
    },
    {
      roles: ["Frontend Developer", "Full Stack Developer"],
      languages: ["JavaScript", "TypeScript"],
      difficulty: "Medium",
      question: "Users on mobile devices are reporting that your React web application feels sluggish and lags when typing into search inputs or scrolling long lists. How do you diagnose and fix this?",
      expectedAnswer: "Profile with Chrome DevTools Performance & React Profiler. Debounce or throttle search input state updates, virtualize long lists with windowing (react-window), memoize heavy calculations (useMemo), and eliminate unnecessary re-renders.",
      explanation: "Evaluates web vitals (INP, LCP) and performance optimization proficiency in client-side applications.",
      keyPoints: ["Chrome DevTools Performance profiling to locate long tasks", "Input debouncing and transition priorities (useTransition/useDeferredValue)", "List virtualization (windowing) for DOM node minimization", "Image lazy loading and bundle code-splitting"]
    }
  ],

  "System Design": [
    {
      roles: ["Full Stack Developer", "Backend Developer", "Software Engineer"],
      languages: ["General"],
      difficulty: "Medium",
      question: "Design a Notification System capable of delivering real-time push, SMS, and email alerts to millions of users.",
      expectedAnswer: "Architecture: Notification Service API -> Message Broker (Kafka/RabbitMQ with priority queues) -> Workers pool -> Third-party providers (APNS, FCM, Twilio, SendGrid) with circuit breakers, rate limiters, user preference service, and dead-letter queues (DLQ).",
      explanation: "Tests ability to decouple services, handle third-party provider failures, idempotency (prevent duplicate alerts), and scale horizontally.",
      keyPoints: ["Asynchronous message queues (Kafka / RabbitMQ) for buffering", "Circuit breakers & retry mechanisms with exponential backoff", "Deduplication cache (Redis) for idempotent delivery", "User notification preferences and rate-limit guardrails"]
    },
    {
      roles: ["Backend Developer", "Software Engineer"],
      languages: ["General"],
      difficulty: "Hard",
      question: "Design a Collaborative Real-time Document Editing Service (similar to Google Docs).",
      expectedAnswer: "Key components: WebSocket gateway servers for bi-directional live updates, operational transformation (OT) or CRDT (Conflict-free Replicated Data Types) for concurrent conflict resolution, snapshot service with Redis/PostgreSQL, and pub-sub messaging for room broadcasting.",
      explanation: "Focuses on complex distributed state synchronization, network latency mitigation, and data consistency models.",
      keyPoints: ["WebSocket/WebTransport for low-latency full-duplex communication", "CRDT vs Operational Transformation (OT) for conflict resolution", "Periodic document snapshots combined with change-log delta streams", "Redis pub/sub for cross-server room coordination"]
    }
  ]
};

// Generate custom questions tailored to role, experience, difficulty, etc.
export const generateMockQuestions = ({
  jobRole = "Full Stack Developer",
  skills = "React, Node.js, JavaScript",
  experience = "Fresher",
  interviewType = "Technical Interview",
  difficulty = "Medium",
  programmingLanguage = "JavaScript",
  count = 5
}) => {
  const targetCount = Number(count) || 5;
  const questions = [];

  // Determine categories to draw from based on interview type
  let categoriesToUse = [];
  if (interviewType === "Technical Interview") {
    categoriesToUse = ["Technical", "Technical", "Coding", "Scenario-Based"];
  } else if (interviewType === "HR Interview") {
    categoriesToUse = ["HR", "HR", "Behavioral"];
  } else if (interviewType === "Coding Interview") {
    categoriesToUse = ["Coding", "Coding", "Technical"];
  } else if (interviewType === "Behavioral Interview") {
    categoriesToUse = ["Behavioral", "Behavioral", "HR", "Scenario-Based"];
  } else if (interviewType === "Scenario-Based Interview") {
    categoriesToUse = ["Scenario-Based", "System Design", "Technical"];
  } else {
    // Mixed Interview
    categoriesToUse = ["Technical", "Coding", "Behavioral", "HR", "Scenario-Based", "System Design"];
  }

  // Helper to pick items
  let addedKeys = new Set();

  for (let i = 0; i < targetCount; i++) {
    const cat = categoriesToUse[i % categoriesToUse.length];
    const pool = QUESTION_POOL[cat] || QUESTION_POOL.Technical;
    
    // Find closest match by difficulty
    let candidates = pool.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
    if (candidates.length === 0) candidates = pool;

    // Pick one not yet added if possible
    let chosen = candidates.find(q => !addedKeys.has(q.question));
    if (!chosen) {
      chosen = pool[i % pool.length];
    }
    addedKeys.add(chosen.question);

    // Contextualize question based on user profile
    const questionObj = {
      id: `q-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
      question: chosen.question,
      category: cat,
      difficulty: chosen.difficulty || difficulty,
      jobRole: jobRole,
      skills: skills,
      programmingLanguage: cat === "Coding" ? programmingLanguage : (chosen.languages[0] || programmingLanguage),
      expectedAnswer: chosen.expectedAnswer,
      explanation: chosen.explanation,
      keyPoints: chosen.keyPoints,
      codingDetails: chosen.codingDetails ? {
        ...chosen.codingDetails,
        programmingLanguage: programmingLanguage
      } : null,
      isFavorite: false,
      createdAt: new Date().toISOString()
    };

    questions.push(questionObj);
  }

  return questions;
};

// Evaluate user's answer
export const evaluateUserAnswer = ({
  question,
  userAnswer,
  expectedAnswer,
  keyPoints = [],
  category = "Technical",
  difficulty = "Medium",
  codingDetails = null
}) => {
  const answer = (userAnswer || "").trim();
  const wordCount = answer.split(/\s+/).filter(Boolean).length;

  // Empty or trivial answer check
  if (!answer || wordCount < 3) {
    return {
      score: 1.0,
      correctness: "Low",
      relevance: "Answer is either missing or too brief to demonstrate technical competence.",
      strengths: "Attempted to submit an answer.",
      missingPoints: keyPoints.length > 0 ? keyPoints.join("; ") : "Did not provide core concepts or definitions.",
      suggestions: "Provide a detailed answer explaining the fundamental concepts, use cases, and code/architecture examples.",
      idealAnswer: expectedAnswer || "Refer to the model answer for full breakdown."
    };
  }

  // Keyword & key point matching
  let matchedPoints = 0;
  const lowerAnswer = answer.toLowerCase();
  
  keyPoints.forEach(kp => {
    const words = kp.toLowerCase().split(/\s+/).filter(w => w.length > 4);
    const hasWord = words.some(w => lowerAnswer.includes(w));
    if (hasWord) matchedPoints++;
  });

  const matchRatio = keyPoints.length > 0 ? matchedPoints / keyPoints.length : 0.5;

  // Length & depth factor
  let depthScore = Math.min(3.5, (wordCount / 35) * 3.5);
  let contentScore = matchRatio * 4.5;
  let baselineScore = 2.0;

  let totalScore = Math.min(10, Math.max(2.5, Number((baselineScore + contentScore + depthScore).toFixed(1))));

  let correctness = "Moderate";
  if (totalScore >= 8.5) correctness = "High";
  else if (totalScore < 5.5) correctness = "Needs Improvement";

  const strengthsList = [];
  const missingList = [];
  const suggestionsList = [];

  if (wordCount >= 25) {
    strengthsList.push("Clear explanation structure with sufficient descriptive elaboration.");
  }
  if (matchedPoints > 0) {
    strengthsList.push(`Accurately addressed key core concepts relating to ${category.toLowerCase()} principles.`);
  } else {
    strengthsList.push("Demonstrated basic familiarity with the problem terminology.");
  }

  if (category === "Coding") {
    if (lowerAnswer.includes("time") || lowerAnswer.includes("o(") || lowerAnswer.includes("complexity")) {
      strengthsList.push("Good habit of discussing computational time/space complexity.");
    } else {
      missingList.push("Mention time complexity O(...) and auxiliary space efficiency explicitly.");
    }
    suggestionsList.push("Always mention edge cases (empty input, null pointers, bounds) before finalizing the code.");
  } else if (category === "HR" || category === "Behavioral") {
    if (lowerAnswer.includes("situation") || lowerAnswer.includes("result") || lowerAnswer.includes("impact")) {
      strengthsList.push("Effectively applied STAR storytelling principles.");
    } else {
      suggestionsList.push("Structure behavioral responses using STAR: Situation, Task, Action, and Measurable Result.");
    }
  }

  // Find missed key points
  keyPoints.forEach(kp => {
    const words = kp.toLowerCase().split(/\s+/).filter(w => w.length > 4);
    const hasWord = words.some(w => lowerAnswer.includes(w));
    if (!hasWord && missingList.length < 3) {
      missingList.push(kp);
    }
  });

  if (missingList.length === 0) {
    missingList.push("Could provide deeper real-world production incident examples or benchmarking numbers.");
  }

  suggestionsList.push("Be concise on definitions, and pivot quickly to practical application or code tradeoffs.");

  return {
    score: totalScore,
    correctness: correctness,
    relevance: totalScore >= 7.5 ? "Directly relevant, well aligned with standard industry interview expectations." : "Partially addresses the question; needs additional technical depth.",
    strengths: strengthsList.join(" "),
    missingPoints: missingList.join("; "),
    suggestions: suggestionsList.join(" "),
    idealAnswer: expectedAnswer || "The candidate should clearly state definition, trade-offs, and edge cases."
  };
};

// Generate comprehensive final session report
export const generateFinalSessionReport = (interviewSession) => {
  const questions = interviewSession.questions || [];
  if (questions.length === 0) {
    return {
      overallScore: 7.0,
      technicalScore: 7.0,
      communicationScore: 7.0,
      problemSolvingScore: 7.0,
      hrScore: 7.0,
      percentage: 70,
      strongAreas: ["Interview completed successfully."],
      weakAreas: ["More comprehensive answers needed."],
      personalizedSuggestions: ["Practice answering with structured frameworks."]
    };
  }

  // Calculate scores per category
  let totalScore = 0;
  let techTotal = 0, techCount = 0;
  let hrTotal = 0, hrCount = 0;
  let codingTotal = 0, codingCount = 0;

  questions.forEach(q => {
    const sc = q.evaluation ? Number(q.evaluation.score) : 7.0;
    totalScore += sc;
    if (q.category === "Technical" || q.category === "System Design") {
      techTotal += sc;
      techCount++;
    } else if (q.category === "Coding") {
      codingTotal += sc;
      codingCount++;
    } else {
      hrTotal += sc;
      hrCount++;
    }
  });

  const overall = Number((totalScore / questions.length).toFixed(1));
  const technical = techCount > 0 ? Number((techTotal / techCount).toFixed(1)) : overall;
  const problemSolving = codingCount > 0 ? Number((codingTotal / codingCount).toFixed(1)) : Math.min(10, Number((overall + 0.3).toFixed(1)));
  const hr = hrCount > 0 ? Number((hrTotal / hrCount).toFixed(1)) : Math.max(5, Number((overall - 0.2).toFixed(1)));
  const communication = Number((Math.min(10, (overall * 0.95) + 0.5)).toFixed(1));

  const strongAreas = [];
  const weakAreas = [];
  const personalizedSuggestions = [];

  if (technical >= 7.5) {
    strongAreas.push(`Strong core grasp of ${interviewSession.targetRole || 'engineering'} concepts and runtime internals.`);
  } else {
    weakAreas.push("Technical explanations lacked depth on fundamental architecture and concurrency concepts.");
    personalizedSuggestions.push("Review fundamental computer science topics: data structures, caching, and async pipelines.");
  }

  if (problemSolving >= 7.5) {
    strongAreas.push("Clear problem-solving approach and systematic identification of algorithmic time/space complexities.");
  } else {
    weakAreas.push("Need stronger analysis of edge cases and computational trade-offs before proposing code solutions.");
    personalizedSuggestions.push("Practice two-pointer, hash table, and sliding window algorithms on LeetCode-style problems.");
  }

  if (communication >= 7.5) {
    strongAreas.push("Articulate delivery with structured responses and professional tone.");
  } else {
    weakAreas.push("Answers could be structured more cleanly using bullet points or the STAR method.");
    personalizedSuggestions.push("Use the STAR framework (Situation, Task, Action, Result) for all scenario and HR questions.");
  }

  if (strongAreas.length === 0) {
    strongAreas.push("Good effort attempting questions across varying difficulty levels.");
  }

  personalizedSuggestions.push(`Mock interviews for ${interviewSession.targetRole || 'your target role'} should be repeated at 'Hard' difficulty once confident.`);

  return {
    overallScore: overall,
    technicalScore: technical,
    communicationScore: communication,
    problemSolvingScore: problemSolving,
    hrScore: hr,
    percentage: Math.round((overall / 10) * 100),
    strongAreas,
    weakAreas,
    personalizedSuggestions
  };
};

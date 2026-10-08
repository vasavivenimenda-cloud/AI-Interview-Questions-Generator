import { getSettings } from './dbService.js';
import * as mockAi from './mockAiEngine.js';

/**
 * Generate questions using either Gemini/OpenAI or the intelligent Mock engine.
 */
export const generateQuestions = async (params) => {
  const settings = getSettings();
  const apiKey = (settings.provider === 'gemini' ? settings.geminiApiKey : settings.openaiApiKey) || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

  if (settings.provider === 'gemini' && apiKey) {
    try {
      const result = await callGeminiGenerateQuestions(params, apiKey, settings.model);
      if (result && Array.isArray(result) && result.length > 0) {
        return result;
      }
    } catch (err) {
      console.warn('Gemini API failed or timed out, falling back to mock generator:', err.message);
    }
  }

  if (settings.provider === 'openai' && apiKey) {
    try {
      const result = await callOpenAIGenerateQuestions(params, apiKey, settings.model);
      if (result && Array.isArray(result) && result.length > 0) {
        return result;
      }
    } catch (err) {
      console.warn('OpenAI API failed or timed out, falling back to mock generator:', err.message);
    }
  }

  // Fallback to offline mock engine
  return mockAi.generateMockQuestions(params);
};

/**
 * Evaluate an individual answer using AI or the Mock engine.
 */
export const evaluateAnswer = async (evalParams) => {
  const settings = getSettings();
  const apiKey = (settings.provider === 'gemini' ? settings.geminiApiKey : settings.openaiApiKey) || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

  if (settings.provider === 'gemini' && apiKey) {
    try {
      const result = await callGeminiEvaluateAnswer(evalParams, apiKey, settings.model);
      if (result && result.score !== undefined) {
        return result;
      }
    } catch (err) {
      console.warn('Gemini evaluation failed, falling back to mock evaluator:', err.message);
    }
  }

  if (settings.provider === 'openai' && apiKey) {
    try {
      const result = await callOpenAIEvaluateAnswer(evalParams, apiKey, settings.model);
      if (result && result.score !== undefined) {
        return result;
      }
    } catch (err) {
      console.warn('OpenAI evaluation failed, falling back to mock evaluator:', err.message);
    }
  }

  // Fallback to offline mock evaluator
  return mockAi.evaluateUserAnswer(evalParams);
};

/**
 * Generate final interview summary report
 */
export const generateReport = (interviewSession) => {
  return mockAi.generateFinalSessionReport(interviewSession);
};

// ================== Gemini API Helpers ==================
async function callGeminiGenerateQuestions(params, apiKey, modelName = 'gemini-1.5-flash') {
  const model = modelName || 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const prompt = `You are an expert technical and HR interviewer. Generate exactly ${params.count || 5} realistic interview questions in valid JSON format for:
Job Role: ${params.jobRole}
Experience Level: ${params.experience}
Interview Type: ${params.interviewType}
Difficulty: ${params.difficulty}
Programming Language: ${params.programmingLanguage}
Skills: ${params.skills}

Categories supported: Technical, HR, Coding, Behavioral, Scenario-Based, System Design.
For Coding questions, include a codingDetails object with problemStatement, input, output, constraints, example, expectedApproach, and solutionExplanation.

Return ONLY a JSON array of objects with the following schema:
[
  {
    "question": "string",
    "category": "Technical|HR|Coding|Behavioral|Scenario-Based|System Design",
    "difficulty": "Easy|Medium|Hard",
    "jobRole": "${params.jobRole}",
    "skills": "${params.skills}",
    "programmingLanguage": "${params.programmingLanguage}",
    "expectedAnswer": "string",
    "explanation": "string",
    "keyPoints": ["point1", "point2", "point3"],
    "codingDetails": null
  }
]
Do not include Markdown backticks or commentary outside JSON.`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini HTTP ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from Gemini');
  
  return JSON.parse(text);
}

async function callGeminiEvaluateAnswer(params, apiKey, modelName = 'gemini-1.5-flash') {
  const model = modelName || 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const prompt = `You are a strict, constructive interview evaluator.
Evaluate the candidate's answer for the following question:
Question: ${params.question}
Category: ${params.category}
Difficulty: ${params.difficulty}
Expected Answer Guide: ${params.expectedAnswer}
Key Points: ${Array.isArray(params.keyPoints) ? params.keyPoints.join(", ") : ""}

Candidate Answer:
"${params.userAnswer}"

Return ONLY a JSON object with this exact structure:
{
  "score": number between 1.0 and 10.0,
  "correctness": "High" | "Moderate" | "Needs Improvement",
  "relevance": "string describing how relevant the response was",
  "missingPoints": "string describing crucial concepts omitted",
  "strengths": "string describing what the candidate did well",
  "suggestions": "actionable advice to improve score",
  "idealAnswer": "complete benchmark answer"
}
Do not include markdown outside JSON.`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    })
  });

  if (!response.ok) throw new Error(`Gemini HTTP error ${response.status}`);
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(text);
}

// ================== OpenAI API Helpers ==================
async function callOpenAIGenerateQuestions(params, apiKey, modelName = 'gpt-4o-mini') {
  const model = modelName || 'gpt-4o-mini';
  const url = 'https://api.openai.com/v1/chat/completions';

  const prompt = `Generate exactly ${params.count || 5} realistic interview questions in JSON array format for:
Job Role: ${params.jobRole}, Experience: ${params.experience}, Type: ${params.interviewType}, Difficulty: ${params.difficulty}, Language: ${params.programmingLanguage}, Skills: ${params.skills}.
Each item must have: question, category, difficulty, jobRole, skills, programmingLanguage, expectedAnswer, explanation, keyPoints (array of strings), codingDetails (optional).`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) throw new Error(`OpenAI HTTP ${response.status}`);
  const data = await response.json();
  const parsed = JSON.parse(data.choices[0].message.content);
  return Array.isArray(parsed) ? parsed : (parsed.questions || []);
}

async function callOpenAIEvaluateAnswer(params, apiKey, modelName = 'gpt-4o-mini') {
  const model = modelName || 'gpt-4o-mini';
  const url = 'https://api.openai.com/v1/chat/completions';

  const prompt = `Evaluate candidate's answer.
Question: ${params.question}
Expected Answer: ${params.expectedAnswer}
Candidate Answer: "${params.userAnswer}"

Return JSON object:
{ "score": number, "correctness": string, "relevance": string, "missingPoints": string, "strengths": string, "suggestions": string, "idealAnswer": string }`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) throw new Error(`OpenAI HTTP ${response.status}`);
  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

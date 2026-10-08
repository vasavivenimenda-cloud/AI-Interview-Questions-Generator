// Frontend API client service communicating with backend
const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `API error: ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error(`Error requesting ${endpoint}:`, err);
    throw err;
  }
}

export const api = {
  // Stats
  getStats: () => request('/stats'),

  // Profile
  getProfile: () => request('/profile'),
  updateProfile: (profileData) => request('/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  }),

  // Questions
  getQuestions: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/questions${query ? `?${query}` : ''}`);
  },
  generateQuestions: (params) => request('/questions/generate', {
    method: 'POST',
    body: JSON.stringify(params)
  }),
  toggleFavoriteQuestion: (id) => request(`/questions/${id}/favorite`, {
    method: 'POST'
  }),
  deleteQuestion: (id) => request(`/questions/${id}`, {
    method: 'DELETE'
  }),

  // Mock Interviews
  getInterviews: () => request('/interviews'),
  getInterviewById: (id) => request(`/interviews/${id}`),
  saveInterview: (sessionData) => request('/interviews', {
    method: 'POST',
    body: JSON.stringify(sessionData)
  }),
  evaluateAnswer: (evalData) => request('/interviews/evaluate', {
    method: 'POST',
    body: JSON.stringify(evalData)
  }),
  deleteInterview: (id) => request(`/interviews/${id}`, {
    method: 'DELETE'
  }),

  // Settings
  getSettings: () => request('/settings'),
  updateSettings: (settingsData) => request('/settings', {
    method: 'POST',
    body: JSON.stringify(settingsData)
  }),
  testAiConnection: (testData) => request('/settings/test', {
    method: 'POST',
    body: JSON.stringify(testData)
  }),
  resetDatabase: () => request('/reset-data', {
    method: 'POST'
  }),
};

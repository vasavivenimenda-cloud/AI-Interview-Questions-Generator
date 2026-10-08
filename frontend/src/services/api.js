/**
 * API Service for AI Interview Questions Generator
 */

const BASE_URL = '/api';

export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${BASE_URL}/health`);
    if (!response.ok) {
      throw new Error(`Health check returned status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('Backend connection check failed:', error.message);
    return { status: 'offline', error: error.message };
  }
};

export const fetchQuestions = async (filters = {}) => {
  const queryParams = new URLSearchParams();

  if (filters.role && filters.role !== 'All') {
    queryParams.append('role', filters.role);
  }
  if (filters.difficulty && filters.difficulty !== 'All') {
    queryParams.append('difficulty', filters.difficulty);
  }
  if (filters.category && filters.category !== 'All') {
    queryParams.append('category', filters.category);
  }

  const url = `${BASE_URL}/questions?${queryParams.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch questions from backend');
  }
  return await response.json();
};

export const createQuestion = async (questionData) => {
  const response = await fetch(`${BASE_URL}/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(questionData),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to save question');
  }

  return await response.json();
};

export const toggleFavorite = async (id) => {
  const response = await fetch(`${BASE_URL}/questions/${id}/favorite`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error('Failed to toggle favorite');
  }
  return await response.json();
};

export const deleteQuestion = async (id) => {
  const response = await fetch(`${BASE_URL}/questions/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete question');
  }
  return await response.json();
};

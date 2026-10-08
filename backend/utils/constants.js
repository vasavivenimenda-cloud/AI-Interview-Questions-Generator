// Application constants and enums for AI Interview Questions Generator

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const EXPERIENCE_LEVELS = [
  'Entry-Level / Fresher (0-1 yrs)',
  'Junior (1-3 yrs)',
  'Mid-Level (3-5 yrs)',
  'Senior (5+ yrs)',
  'Lead / Architect',
];

const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'];

const QUESTION_CATEGORIES = [
  'Technical / Core Concepts',
  'Coding & Problem Solving',
  'System Design / Architecture',
  'Behavioral & Situational',
  'Project & Resume Specific',
];

module.exports = {
  HTTP_STATUS,
  EXPERIENCE_LEVELS,
  DIFFICULTY_LEVELS,
  QUESTION_CATEGORIES,
};

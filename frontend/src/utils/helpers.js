/**
 * Utility helpers for frontend
 */

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getDifficultyColor = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'easy':
      return {
        bg: 'rgba(34, 197, 94, 0.15)',
        text: '#4ade80',
        border: 'rgba(34, 197, 94, 0.3)',
      };
    case 'hard':
      return {
        bg: 'rgba(239, 68, 68, 0.15)',
        text: '#f87171',
        border: 'rgba(239, 68, 68, 0.3)',
      };
    case 'medium':
    default:
      return {
        bg: 'rgba(245, 158, 11, 0.15)',
        text: '#fbbf24',
        border: 'rgba(245, 158, 11, 0.3)',
      };
  }
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
};

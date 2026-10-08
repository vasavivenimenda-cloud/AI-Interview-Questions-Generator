import * as dbService from '../services/dbService.js';

export const getProfile = (req, res) => {
  try {
    const profile = dbService.getProfile();
    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch user profile', error: err.message });
  }
};

export const updateProfile = (req, res) => {
  try {
    const { name, education, experience, targetRole, skills, programmingLanguage, preferredInterviewType, avatar } = req.body;

    if (!name || !targetRole) {
      return res.status(400).json({ success: false, message: 'Name and Target Job Role are required' });
    }

    const updated = dbService.updateProfile({
      name,
      education: education || '',
      experience: experience || 'Fresher',
      targetRole,
      skills: skills || '',
      programmingLanguage: programmingLanguage || 'JavaScript',
      preferredInterviewType: preferredInterviewType || 'Technical Interview',
      avatar: avatar || undefined
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update user profile', error: err.message });
  }
};

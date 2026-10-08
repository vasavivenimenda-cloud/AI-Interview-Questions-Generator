import * as dbService from '../services/dbService.js';
import * as aiService from '../services/aiService.js';

export const getStats = (req, res) => {
  try {
    const stats = dbService.getStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch statistics', error: err.message });
  }
};

export const getSettings = (req, res) => {
  try {
    const settings = dbService.getSettings();
    // Mask sensitive keys when sending back
    const masked = {
      ...settings,
      geminiApiKey: settings.geminiApiKey ? `${settings.geminiApiKey.substring(0, 6)}...` : '',
      openaiApiKey: settings.openaiApiKey ? `${settings.openaiApiKey.substring(0, 6)}...` : '',
      hasGeminiKey: Boolean(settings.geminiApiKey),
      hasOpenaiKey: Boolean(settings.openaiApiKey)
    };
    res.json({ success: true, data: masked });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch settings', error: err.message });
  }
};

export const updateSettings = (req, res) => {
  try {
    const { provider, geminiApiKey, openaiApiKey, model, temperature } = req.body;
    const current = dbService.getSettings();

    const newSettings = {
      provider: provider || current.provider || 'mock',
      geminiApiKey: geminiApiKey !== undefined && geminiApiKey !== '' ? geminiApiKey : current.geminiApiKey,
      openaiApiKey: openaiApiKey !== undefined && openaiApiKey !== '' ? openaiApiKey : current.openaiApiKey,
      model: model || current.model || 'gemini-1.5-flash',
      temperature: temperature !== undefined ? Number(temperature) : (current.temperature || 0.7)
    };

    const updated = dbService.updateSettings(newSettings);
    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: {
        provider: updated.provider,
        model: updated.model,
        hasGeminiKey: Boolean(updated.geminiApiKey),
        hasOpenaiKey: Boolean(updated.openaiApiKey)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update settings', error: err.message });
  }
};

export const testAiConnection = async (req, res) => {
  try {
    const { provider, apiKey, model } = req.body;
    const testParams = {
      jobRole: 'Software Engineer',
      skills: 'JavaScript, Algorithms',
      experience: 'Fresher',
      interviewType: 'Technical Interview',
      difficulty: 'Easy',
      programmingLanguage: 'JavaScript',
      count: 1
    };

    // Temporarily test with provided key
    let result;
    if (provider === 'gemini' && apiKey) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model || 'gemini-1.5-flash'}:generateContent?key=${apiKey}`;
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: "Respond with JSON: {\"status\": \"ok\", \"message\": \"Gemini Connected Successfully\"}" }] }] })
      });
      if (!resp.ok) {
        return res.status(400).json({ success: false, message: `Gemini verification failed (HTTP ${resp.status})` });
      }
      return res.json({ success: true, message: 'Gemini API Connected Successfully!' });
    } else if (provider === 'openai' && apiKey) {
      const resp = await fetch('https://api.openai.com/v1/models', {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      if (!resp.ok) {
        return res.status(400).json({ success: false, message: `OpenAI verification failed (HTTP ${resp.status})` });
      }
      return res.json({ success: true, message: 'OpenAI API Connected Successfully!' });
    } else {
      // Mock provider test
      return res.json({ success: true, message: 'Mock AI Engine is fully operational (Offline Mode).' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Connection test failed', error: err.message });
  }
};

export const resetDatabase = (req, res) => {
  try {
    const data = dbService.resetDatabase();
    res.json({ success: true, message: 'Database reset to default sample data successfully', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to reset database', error: err.message });
  }
};

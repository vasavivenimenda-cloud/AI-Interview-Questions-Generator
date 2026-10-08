const { runQuery, getQuery, allQuery } = require('../database/db');

class QuestionService {
  /**
   * Fetch all questions with optional filters
   */
  async getAllQuestions({ role, difficulty, category, limit = 50 } = {}) {
    let sql = 'SELECT * FROM questions WHERE 1=1';
    const params = [];

    if (role) {
      sql += ' AND role LIKE ?';
      params.push(`%${role}%`);
    }

    if (difficulty) {
      sql += ' AND difficulty = ?';
      params.push(difficulty);
    }

    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }

    sql += ' ORDER BY created_at DESC LIMIT ?';
    params.push(Number(limit));

    return await allQuery(sql, params);
  }

  /**
   * Fetch a single question by ID
   */
  async getQuestionById(id) {
    const sql = 'SELECT * FROM questions WHERE id = ?';
    return await getQuery(sql, [id]);
  }

  /**
   * Create a new question record
   */
  async createQuestion(data) {
    const {
      role,
      experience_level,
      tech_stack = '',
      question,
      difficulty = 'Medium',
      category = 'Technical',
      sample_answer = '',
    } = data;

    const sql = `
      INSERT INTO questions (role, experience_level, tech_stack, question, difficulty, category, sample_answer)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await runQuery(sql, [
      role,
      experience_level,
      tech_stack,
      question,
      difficulty,
      category,
      sample_answer,
    ]);

    return await this.getQuestionById(result.lastID);
  }

  /**
   * Delete a question by ID
   */
  async deleteQuestion(id) {
    const sql = 'DELETE FROM questions WHERE id = ?';
    const result = await runQuery(sql, [id]);
    return result.changes > 0;
  }

  /**
   * Toggle favorite state for a question
   */
  async toggleFavorite(id) {
    const item = await this.getQuestionById(id);
    if (!item) return null;

    const newFav = item.is_favorite ? 0 : 1;
    await runQuery('UPDATE questions SET is_favorite = ? WHERE id = ?', [newFav, id]);
    return await this.getQuestionById(id);
  }
}

module.exports = new QuestionService();

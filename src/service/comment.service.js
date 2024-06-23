const connection = require('../app/database');

class CommentService {
  async create (data) {
    const { momentId, userId, content } = data;
    const statement = `INSERT INTO comment (content, user_id, moment_id) values (?, ?, ?);`;
    const [result] = await connection.execute(statement, [content, userId, momentId]);
    return result;
  }

  async replay(data) {
    const { commentId, momentId, userId, content } = data;
    const statement = `INSERT INTO comment (content, user_id, moment_id, comment_id) values (?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [content, userId, momentId, commentId]);
    return result;
  }

  async update(data) {
    const { content, commentId } = data;
    const statement = `UPDATE comment SET content = ? WHERE comment.id = ?;`;
    const [result] = await connection.execute(statement, [content, commentId]);
    return result;
  }

  async delete(commentId) {
    const statement = `DELETE FROM comment WHERE comment.id = ?;`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }

  async getCommentBymomentId(momentId) {
    const statement = `
      SELECT
        c.id, c.content, c.moment_id momentId, c.comment_id commentId, c.createAt createTime,
        JSON_OBJECT('id', u.id, 'name', u.name) user
      FROM comment c
      LEFT JOIN user u ON u.id = c.user_id 
      WHERE c.moment_id = ?;
    `;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new CommentService();

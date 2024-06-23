const connection = require('../app/database');

class AuthService {
  async checkResource (data) {
    try {
      const { id, userId, tableName } = data;

      const statement = `SELECT * FROM ${tableName} m WHERE m.id = ? AND m.user_id = ?;`
      const result = await connection.query(statement, [id, userId]);
      return result[0].length > 0 ? true : false;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AuthService();

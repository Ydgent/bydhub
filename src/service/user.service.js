const connection = require('../app/database');

class UserService {
  async create (user) {
    const { userName, passWord } = user;

    const statement = `INSERT INTO user (name, password) values (?, ?);`
    const result = await connection.query(statement, [userName, passWord]);

    return result[0];
  }

  async getUserByName(user) {

    const statement =  `SELECT * FROM user WHERE name = ?;`;
    const result = await connection.query(statement, [user]);
    
    return result[0];
  }

  async setAvatarToUser({ userId, avatarUrl }) {
    try {
      const statement =  `UPDATE user SET avatar_url = ? WHERE id = ?;`;
      const result = await connection.query(statement, [avatarUrl, userId]);
      
      return result[0];
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new UserService();

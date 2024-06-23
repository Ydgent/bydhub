const connection = require('../app/database');

class TagService {
  async create (data) {
    try {
      const { tagId, tagName } = data;
      const statement =  `INSERT INTO tag (tag_id, tag_name) values (?, ?);`;
      const [result] = await connection.execute(statement, [tagId, tagName]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getCreateByName(name) {
    try {
      const statement =  `SELECT * FROM tag WHERE tag_name = ?;`;
      const [result] = await connection.execute(statement, [name]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getTagByMomentId(data) {
    const { momentId, tagId } = data;
    try {
      const statement =  `SELECT * FROM moment_tag_courses WHERE tag_id = ? AND moment_id = ?;`;
      const [result] = await connection.execute(statement, [tagId, momentId]);
      return result[0] ? true : false;
    } catch (error) {
      console.log(error);
    }
  }

  async createMomentTagCourses(data) {
    try {
      const { tagId, momentId } = data;
      const statement =  `INSERT INTO moment_tag_courses (tag_id, moment_id) values (?, ?);`;
      const [result] = await connection.execute(statement, [tagId, momentId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

};

module.exports = new TagService();

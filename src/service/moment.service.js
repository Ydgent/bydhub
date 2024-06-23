const connection = require('../app/database');
const tagService = require('./tag.service');

class MomentService {
  async create (data) {
    const { content, id } = data;

    const statement = `INSERT INTO moment (content, user_id) values (?, ?);`;
    const [result] = await connection.execute(statement, [content, id]);

    return result;
  }

  async getMomentById(momentId) {
    const statement = `
      SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) user,
        (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'content', c.content)
        ),null) FROM comment c LEFT JOIN user u ON m.user_id = u.id WHERE m.id = c.comment_id) comment,
        IF(COUNT(t.tag_id),JSON_ARRAYAGG(
          JSON_OBJECT('id', t.tag_id, 'name', t.tag_name)
        ),null) tag,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.filename)) FROM file WHERE m.id = file.moment_id) images
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      LEFT JOIN moment_tag_courses mtc ON mtc.moment_id = m.id
      LEFT JOIN tag t on t.id = mtc.tag_id
      WHERE m.id = ?
      GROUP BY m.id;
    `;
    const [result] = await connection.execute(statement, [momentId]);

    return result[0];
  }

  async getMomentList(data) {
    const { pageNo, pageSize } = data;
    const statement = `
      SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) user,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_tag_courses mtc WHERE mtc.moment_id = m.id) tagCount
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      LIMIT ?, ?;
    `;
    const [result] = await connection.execute(statement, [pageNo, pageSize]);
    
    return result;
  }

  async updateList(data) {
    const { momentId, content } = data;
    const statement = `UPDATE moment SET content = ? WHERE moment.id = ?;`;
    const [result] = await connection.execute(statement, [content,Number(momentId)]);
    return result;
  }

  async deleteById(momentId) {
    const statement = `DELETE FROM moment WHERE moment.id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new MomentService();

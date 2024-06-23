const mySql = require('mysql2');
const config = require('./config');

const connection = mySql.createPool({
  host: config.MSQ_HOST,
  port: config.MSQ_PORT,
  database: config.MSQ_DATABASE,
  user: config.MSQ_USER,
  password: config.MSQ_PASSWORD,
});

connection.getConnection((error, conn) => {
  conn.connect((error) => {
    if (error) {
      console.log('数据库连接失败');
    } else {
      console.log('数据库连接成功');
    }
  })
});

module.exports = connection.promise();


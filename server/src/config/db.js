const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'yangotrip',
  'root',
  'root', {
      'dialect': 'mysql', // 数据库使用mysql
      'host': 'localhost', // 数据库服务器ip
      'port': 3306, // 数据库运行端口
      'timestamp': false, // 这个参数为true是MySQL会自动给每条数据添加createdAt和updateAt字段
      'quoteIdentifiers': true
  }
);

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');
const Introduce = require('./introduce');
const Local = require('./local');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
db.Introduce = Introduce;
db.Local = Local;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Introduce.init(sequelize);
Local.init(sequelize);


User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Introduce.associate(db);

module.exports = db;
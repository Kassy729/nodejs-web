const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');


const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];  
//config.json에서 데이터베이스 설정을 불러온 후 new Sequelize를 통해 MySQL연결 객체 생성
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.sequelize = Sequelize;
//연결객체를 나중에 사용하기 위해 db.sequelize에 넣어두었음

db.User = User;
db.Comment = Comment;
//db라는 객체에 User와 Comment 모델을 담아 두었습니다.
//앞으로 db객체를 require하여 User와 Comment 모델에 접근할 수 있습니다.


User.init(sequelize);
Comment.init(sequelize);
//User.init과 Comment.init은 각각의 모델의 static.init 메소드를 호출하는 것입니다.
//init이 실행되어야 테이블이 모델로 연결됩니다.

User.associate(db);
Comment.associate(db);
//다른 테이블과의 관계를 연결하는 associate메소드도 미리생성

module.exports = db;
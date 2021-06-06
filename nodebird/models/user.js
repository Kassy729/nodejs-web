const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {  //컬럼 생성
    return super.init({
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      provider: {  //local 또는 SNS 로그인서비스 제공자명(kakao)
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {  //SNS 로그인서비스 이용시 SNS ID를 저장
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,  //createdAt, updatedAt 컬럼도 생성
      underscored: false,  //created_at이 아니라, createdAt
      modelName: 'User',
      tableName: 'users',
      paranoid: true,  //deleteAt 컬럼 생성
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {  //다른 모델(table)과의 관계설정
    db.User.hasMany(db.Post);  //1:N의 관계
        //user.getPosts(), user.addPosts()메소드 자동 사용 가능하게됨
    db.User.belongsToMany(db.User, { //팔로워:팔로잉 관계 -- N:M, 그림9-5
      foreignKey: 'followingId',  //userId를 외래키 값으로 참조
      as: 'Followers', //db.sequelize.models.Follow라 모델사용가능
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',  //userId를 외래키 값으로 참조
      as: 'Followings',
      through: 'Follow',  //user.getFollowers(), user.getFollowings()
    });
  }
};
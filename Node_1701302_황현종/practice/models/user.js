const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({  //테이블에 대한 설정
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,  //null값 허용
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
      provider: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,  //생성일, 삭제일, 수정일 저장
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,

      //한글 지원
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      foreignKey: 'followingId',  //누가 팔로워인지 팔로잉인지 알아보기위해 이름을 설정
      as: 'Followers',  //foreignkey와 as는 반대로 설정
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
};






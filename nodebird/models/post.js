const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: Sequelize.STRING(140),  //트위터처럼 140자 나타내기
        allowNull: false,
      },
      img: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,  //deletedAt 필드 안생김
      charset: 'utf8mb4',  //이미지 사용가능해짐
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Post.belongsTo(db.User);  // N:1 post.getUser(), post.addUser() 등 사용가능
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    //게시글:해시태그 = N:M 328페이지, 그림7-59 참고
    //postId, hashtagId가 외래키
    //post.getHashtags(), post.addHashtags(), hashtag.getPosts() 등 사용가능 
  }
};
const passport = require('passport');
const local = require('./localStrategy');  //로그인 전략
const kakao = require('./kakaoStrategy');  //로그인 전략
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
      //직렬화사용자, 로그인시 실행
      //req.session객체에 어떤 데이터를 저장할 지 설정
    done(null, user.id);  //req.session객체에 user.id값이 저장됨
  });

  passport.deserializeUser((id, done) => {
    //   //매번 Request에 대해 실행
    //   //passport.session()에서 호출하는 매소드
    //   //deserializeUser(1번인자, 2번인자)
    //   //1번인자-serializeUser()의 done()의 2nd인자
    // User.findOne({ where: { id } })
    //   .then(user => done(null, user))
    //   .catch(err => done(err));
    //   // User모델에서 id로 저장된 row를 찾아 user객체로 전달
    //   // done()호출, user객체를 req.user에 객체를 저장함(req.user=user)

    User.findOne(
      {
        where:{id},
        include:[{
          model:User,
          attributes:['id', 'nick'],
          as: 'Followers',
        }, { model:User,
          attributes:['id', 'nick'],
          as: 'Followings'
        }],
      }
    ).then(user=>done(null,user)).catch(err=>done(err));
    
  });

  local();
  kakao();
};
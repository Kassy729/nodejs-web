const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
//로그인을 했는지 안했는지 검사하는 용도

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {  //기존에 가입한 사람이 있는지 검사
      return res.redirect('/join?error=exist');  
    } 
    const hash = await bcrypt.hash(password, 12);  //비밀번호를 해쉬화
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');  //다시 메인페이지로
  } catch (error) {
    console.error(error);
    return next(error);
  }
});


router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {  //done함수가 호출되면 여기로 옮
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        return res.redirect(`/?loginError=${info.message}`);
      }
      return req.login(user, (loginError) => {  //passport 
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        //세션 쿠키를 브라우저로 보내줍니다.
        return res.redirect('/');
      });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
  });

  router.get('/logout', isLoggedIn, (req, res) => {
    req.user;  //사용자 정보
    req.logout();
    req.session.destroy();  //세션 파괴
    res.redirect('/');
  });
  
  router.get('/kakao', passport.authenticate('kakao'));
  
  router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
  }), (req, res) => {
    res.redirect('/');
  });

module.exports = router;
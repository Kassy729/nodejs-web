const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');  
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {  //POST /auth/join 요청 라우터
  const { email, nick, password } = req.body;  //237페이지
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);  //bcrypt.hash(평문, 반복횟수)
    await User.create({  //sequelize로 users 한 row생성
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {  //POST /auth/login 요청
  passport.authenticate('local', (authError, user, info) => {  //passport.authenticate(로그인전략설정, 콜백)
    //로그인 성공하든 실패하든지 콜백이 실행됨
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {  //passport.serializeUser()호출
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get(  //GET /auth/kakao 로그인 시도
    '/kakao',   
    passport.authenticate('kakao'));  //GET /auth/kakao

router.get('/kakao/cd', passport.authenticate('kakao', {  //GET /auth/kakao/cd
                                                        //로그인 성공하면 호출해주는 라우터                                                     
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

module.exports = router;
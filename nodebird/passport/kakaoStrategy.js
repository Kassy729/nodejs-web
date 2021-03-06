const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
  passport.use(new KakaoStrategy({
      // 카카오 로그인을 위한 설정
      // KAKAO에서 발급받은 개발자ID
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/cd',
    //카카오 인증 종료후 결과를 받을 라우터주소
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('kakao profile', profile);
    try {
      const exUser = await User.findOne({
        where: { snsId: profile.id, provider: 'kakao' },
      });
      if (exUser) {
        done(null, exUser);
        //auth.js의 콜백 (authError, user, info) => {} 호출
      } else {
        const newUser = await User.create({
          email: profile._json && profile._json.kakao_account_email,
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'kakao',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
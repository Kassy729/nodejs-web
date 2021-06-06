const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(new LocalStrategy(
  {   //사용자로부터 입력받는 정보 설정
    usernameField: 'email',  //layout.html의 input태그의 name 속성 참고
    passwordField: 'password',
  }, async (email, password, done) => {
    try { //로그인 구현
      const exUser = await User.findOne({ where: { email } });
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password); 
                                            //DB패스워드와 패스워드를 비교한다
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
          // (authError, user, info) => {}
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
        //(authError, user, info) => {}
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
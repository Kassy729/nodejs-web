const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',  //req.body.email
    passwordField: 'password',  //req.body.password
  }, async (email, password, done) => {
    try {
      const exUser = await User.findOne({ where: { email } });
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        //DB에 있는 비밀번호와 비밀번호를 비교 한다.
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
        //done은 인자를 3개를 받는데 첫번째는 서버에러, 두번째는 로그인이 성공, 세번째는 실패했을때의 메세지
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();  //.env의 내용을 읽어서 노드 환경 변수값 설정
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');


const { sequelize } = require("./models");
//  /models/index.js파일 임포트
//테이블 까지 생성

const passportConfig = require('./passport');
// const passport = require('passport');
const { post } = require('./routes/page');
const app = express();  //서버객체 생성

passportConfig();  //패스포트관련 설정

app.set('port', process.env.PORT || 8002);  //.env PORT값을 주지 않으면 8001이 디폴트값이 됨
app.set('view engine', 'html');  //넌적스 설정
nunjucks.configure('views', {  //views 폴더가 뷰 내용 작업폴더임을 설정
  express: app,
  watch: true,
});

sequelize.sync({force:false})
.then(() => {
  console.log("DB서버 연결 성공");
})
.catch((err) => {
  console.error(err);
});

app.use(morgan('dev'));  //LOG 관련
app.use(express.static(path.join(__dirname, 'public')));  
  //정적 리소스(html, js, jpg, png, css파일등....)에 대한 설정
  //폴더를 public 설정
app.use(express.json());  //json처리, body-parser에서 처리해줌
app.use(express.urlencoded({ extended: false }));  //body-parser 처리해줌
app.use(cookieParser(process.env.COOKIE_SECRET));
//쿠키처리, 쿠키를 암호화하기 위해 사용하는 키값을 설정
app.use(session({  //express-session 패키지 설정
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
//사용자 정의 미들웨어 구현
//미들웨어 req, res, next

app.use(passport.initialize());
  // req에 passport모듈관련 설정 정보를 저장
app.use(passport.session());  //패스포트 모듈이 session객체를 관리
  //express-session 미들웨어보다 뒤에 작성되어야 함
  //req.session객체를 만든 뒤에 실행해야 하기 때문,  *미들웨어는 위치(순서)가 중요


app.use('/', pageRouter);  //미들웨어 설정
//라우터는 미들웨어 중에 하나
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {  //404처리 미들웨어
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {  //에러처리 미들웨어
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
//위에까지가 미들웨어 설정

app.listen(app.get('port'), () => {  //서버가 실행되면서 대기중 표시됨
  console.log(app.get('port'), '번 포트에서 대기중');
});


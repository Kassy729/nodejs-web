const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();  //dot.env 는 최대한 위에 작성  아래부터 적용되므로...
const pageRouter = require('./routes/page');

const app = express();
app.set('port', process.env.PORT || 8001);  //개발할때는 8001번 포트를 사용하고 배포할때 .env에 포트 80번으로..
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

//6장 내용임 까먹었으면 복습!
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));


app.use('/', pageRouter);  // '/'이므로 page.js도 '/'

//404처리 미들웨어
app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

//에러처리 미들웨어 , 에러처리 미들웨어는 next를 안쓰더라도 생략할수 없다
app.use((err, req, res, next) => {
    //템플릿엔진의 변수
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};  //배포모드일때는 에러를 안보여주고 개발할때만 보여줌
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
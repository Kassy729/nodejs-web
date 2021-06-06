const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
//파일의 종류 : 일반 파일, 폴더-파일로 취급

const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.readdirSync('uploads');
  //동기식으로 동작
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
//uploads 폴더 생성처리 또는 읽기 처리


const upload = multer({  //multer객체를 upload라는 이름으로 생성
    //업로드된 파일의 저장옵션
  storage: multer.diskStorage({
    destination(req, file, cb) {  //목적지 지정
      cb(null, 'uploads/');  //업로드된 파일의 저장위치를 
                             //uploads폴더로 지정
    },
    filename(req, file, cb) {  
        //업로드된 파일의 이름을 지정하는 함수
      const ext = path.extname(file.originalname);
        //ext에는 파일명의 확장자(jpg, gif, png,....)
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        //path.basename(file.originalname, ext): 확장자
        //              제거 파일명
        //업로드한 날짜와 확장자를 추가
    },
  }),
  //업로드된 파일의 저장용량 제한 5Mbytes
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/img', //POST/post/img 요청
            isLoggedIn, //로그인여부체크 미들웨어
            upload.single('img'),  //멀티 미들웨어
            //249페이지 참고
            (req, res) => {
                console.log(req.file);
                res.json({ url: `/img/${req.file.filename}` });
            }
            //static미들웨어로 /img 경로로 정적파일 서비스
            //가능하게 설정할 필요(app.js)
);

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(),  //249페이지
//POST /post
  async (req, res, next) => {
  try {
    //게시글 모델(Post)에 내용을 생성
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,  //PassPort 미들웨어
    });
    const hashtags = req.body.content.match(/#[^\s#]*/g);  //어디에 매치된다, 잘맛다
    // 정규표현식 /#[&'ㅒㅖ]
        // #으로 시작하는 문자열
    // g = 전역
    // '/'페턴의  시작과 끝
    // hashtages: ['#노드', '#익스프레스', '#제로초']

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag => {
            //findOrCreate(): 시퀄라이즈 메서드 --> 프로미스
            //--> 프로미스객체반환
            //발견되면 발견한 row를 반환, 발견못하면 생성한뒤 반환
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
            //tag의 #이 잘린상태(영문-소문자로 변경)
          })
        }),
      );// results: [[모델값, 생성여부bool], [모델값, bool], [모델값, bool]]
      await post.addHashtags(result.map(r => r[0]));
      //[모델값, 모델값, 모델값]
    }
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
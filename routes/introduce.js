const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Introduce, User } = require('../models');
const { isLoggedIn } = require('./middlewares');
const { render } = require('nunjucks');

const router = express.Router();


router.get('/', async(req, res) => {
    try {
        const introduce = await Introduce.findOne({
            where : { UserId : req.user.id }
        })
        res.render('introduce', { introduce : introduce, title : '자기소개'});
        
    } catch (error) {
        console.error(error);
        next(error);
    }
  });


  try {
    fs.readdirSync('uploads');
  } catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
  
  const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, 'uploads/');
      },
      filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  });
  
  router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
  });
  
  const upload2 = multer();
  router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
    try {
      console.log(req.user);
      const check = await Introduce.findOne({
          where : { UserId : req.user.id}
      });
      if( check != null){
          const introduceUpdate = await Introduce.update({
              content : req.body.content
          },{
              where : {UserId : req.user.id}
          });
          return res.redirect('introduce');
      } 

      const introduce = await Introduce.create({
        content: req.body.content,
        img: req.body.url,
        UserId: req.user.id,
      });
      res.redirect('introduce');
    } catch (error) {
      console.error(error);
      next(error);
    }
});

module.exports = router;

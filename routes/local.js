const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Local, User } = require('../models');
const { isLoggedIn } = require('./middlewares');
const { render } = require('nunjucks');

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const local = await local.findOne({
            where : { UserId : req.user.id }
        })
        res.render('local', { local, title : '자기소개'});
        
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
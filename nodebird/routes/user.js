const express = require('express');

const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
    //POST /user/123/follow --> req.params.id == 123
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    //사용자모델 조건에 맞는 사용자 있는지 쿼리
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));  //10진수
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
//GET /로 접속했을 때의 라우터
const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll(); //User.findAll 메서드로 모든 사용자를 찾은 후,
    //sequelize.html을 렌더링할 때 결괏값인 users를 넣습니다.
    res.render("sequelize", { users });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

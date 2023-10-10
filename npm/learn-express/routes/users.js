var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("user 정보를 get하는 곳이래");
});

module.exports = router;

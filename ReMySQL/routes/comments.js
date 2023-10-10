const express = require("express");
const { Comment } = require("../models");

const router = express.Router();
//POST /comments, PATCH /comments/:id, DELETE /comments/:id를 등록했습니다.

//POST /comments 라우터: 댓글을 생성하는 라우터입니다.
router.post("/", async (req, res, next) => {
  try {
    const comment = await Comment.create({
      commenter: req.body.id, //commenter 속성에 사용자 아이디를 넣어 사용자와 댓글을 연결
      comment: req.body.comment,
    });
    console.log(comment);
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
//PATCH /comments/:id와 DELETE /comments/:id : 각각 댓글을 수정, 삭제하는 라우터
//수정과 삭제에는 각각 update와 destroy 메서드를 사용합니다.
router
  .route("/:id")
  .patch(async (req, res, next) => {
    try {
      const result = await Comment.update(
        {
          comment: req.body.comment,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Comment.destroy({ where: { id: req.params.id } });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;

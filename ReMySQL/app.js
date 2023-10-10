// 패키지 불러오기
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");

const { sequelize } = require("./models");

const indexRouter = require("./routes");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");
//require('./models/index.js')와 같음
//폴더 내의 index.js 파일은 require할 때 이름을 생략할 수 있습니다.

const app = express();
app.set("port", process.env.PORT || 3001);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
//db.sequelize를 불러와서 sync 메서드를 사용해 서버를 실행할 때 MySQL과 연동되도록 했다.
//force: false 옵션 - 이 옵션을 true로 설정하면 서버를 실행할 때마다 테이블을 재생성.
//테이블을 잘못 만든 경우에 true로 설정하면 됩니다.
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
});

// middlewares/index.js
// 회원가입, 로그인, 로그아웃 라우터에는 접근 조건이 있음.

// 로그인 O 유저 → 회원가입, 로그인 X

// 로그인 X 유저 → 로그아웃 X

// **라우터에 접근권한을 제어하는 미들웨어가 필요함.**
//→ Passport가 req 객체에 추가해주는 `req.isAuthenticated` 메소드 사용

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};

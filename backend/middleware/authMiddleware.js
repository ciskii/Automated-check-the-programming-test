const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: "You are not authorized to view this resource" });
  }
};

const isTeacher = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "teacher") {
    next();
  } else {
    res.status(401).json({
      msg: "You are not authorized to view this resource because you are not a teacher.",
    });
  }
};

const isStudent = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "student") {
    next();
  } else {
    res.status(401).json({
      msg: "You are not authorized to view this resource because you are not a student.",
    });
  }
};

module.exports = {
  isAuth,
  isTeacher,
  isStudent,
};

const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res
      .status(401)
      .send({ error: "Invalid token. Ensure that correct token is passed" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    // used to execute the next set of instrcutions where fetchUser will be passed
    next();
  } catch (error) {
    res
      .status(401)
      .send({ error: "Invalid token. Ensure that correct token is passed" });
  }
};

module.exports = fetchUser;

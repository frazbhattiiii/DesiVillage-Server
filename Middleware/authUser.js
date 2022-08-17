const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

//authUser is a middleware which will be used to check if the user is logged in or not
//if the user is logged in it will provide userID using his/her jwt token and then async function will be called
const authUser = (req, res, next) => {
  const authHeader = req.header("authtoken");
  try {
    if (!authHeader) {
      return next();
    } else {
      const data = jwt.verify(authHeader, jwt_secret);
      req.user = data; //this will be available in the request object
      next();
    }
  } catch (error) {
    res.status(401).json({ msg: "Some error occured" });
  }
};

module.exports = authUser;

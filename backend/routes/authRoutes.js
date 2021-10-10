const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
// npm package to store password with a salt
var bcrypt = require("bcryptjs");
// npm package for generating jwt token for auth purpose
var jwt = require("jsonwebtoken");
// configuration for reading an env file
const dotenv = require("dotenv");
dotenv.config();
// persist a user object without any Auth : endpoint: /api/auth/createuser
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be atleast 7 characters").isLength({
      min: 7,
    }),
  ],
  // make a async-await request when posting a user in DB
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // User.findOne returns a promise. Hence, await
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        // checking for duplicate user email
        return res
          .status(400)
          .json({ error: "Invalid Request. Email already exists." });
      }
      const password = req.body.password;
      const salt = bcrypt.genSaltSync(10);
      const securePass = await bcrypt.hash(password, salt);
      // creating a new user
      user = await User.create({
        name: req.body.name,
        password: securePass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id
        },
      };
      var authToken = jwt.sign(data, process.env.JWT_SECRET);
      // returning the auth token to user which can be used later for authentication purposes
      res.json({auth:authToken});
      // display the response, either correct or the error to user
      // res.json({ user: user });
    } catch (err) {
      console.error(err.message);
      res.status(500).json(`Oops. Error found: ${err.message}`);
    }
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

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
    // User.findOne returns a promise. Hence, await
    let user = await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({error: "Invalid Request. Email already exists."});
    }
    user = await User.create({
      name: req.body.name, 
      password: req.body.password,
      email: req.body.email,
    });
    // display the response, either correct or the error to user
    res.json({user: user});
      // check whether email already exists

      // .then((user) => res.json(user))
      // .catch((error) => {
      //   console.log(error);
      //   res.json({
      //     error: "Please enter a unique email.",
      //     message: error.message
      //   });
      // });
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);
  }
);

module.exports = router;

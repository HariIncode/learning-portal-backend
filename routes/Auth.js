const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const JWT_SECRET = "learningportal$357";
var jwt = require("jsonwebtoken");

router.post(
  "/createUser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
    body("mobile", "Enter a valid mobile number").isLength({ min: 10 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let userEmail = await User.findOne({ email: req.body.email });
    let userMobile = await User.findOne({ mobile: req.body.mobile });

    try {
      if (userEmail || userMobile) {
        return res
          .status(400)
          .json({
            success: success,
            error: "Sorry email or mobile number already exist",
          });
      }

      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(req.body.password, salt);
      let user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        mobile: req.body.mobile,
      });

      const data = {
        user: {
          id: user.id,
          name: user.name,
        },
      };

      let name = data.user.name;
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ authToken, success, name });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
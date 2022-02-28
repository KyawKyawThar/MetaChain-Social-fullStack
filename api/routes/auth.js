const router = require("express").Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const validUser = await userModel.findOne({ email: req.body.email });
    !validUser && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      validUser.password
    );
    !validPassword && res.status(404).json("password went wrong");

    res.status(200).json(validUser);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;

const router = require("express").Router();
const User = require("../models/Users");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const { username, email, phone } = req.body;

  const newUser = new User({
    username,
    email,
    phone,
    password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC),
  });
  try {
    //check if email exist
    if(req.body.email !== await User.findOne({email: req.body.email})){
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    }
    else{
      res.status(403).json('Email exist')
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(200).json("Wrong details");

    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const initialPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
    initialPassword !== req.body.password &&
      res.status(401).json("wrong password!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAmin: user.isAdmin,
        isAgent: user.isAgent,
      },
      process.env.JWT_SEC,
      {
        expiresIn: "2d",
      }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGOUT

module.exports = router;

const router = require("express").Router();
const User = require("../models/Users");
const CryptoJs = require("crypto-js");

//REGISTER
router.post("/register", async (req, res) => {
  const { username, email, number } = req.body;

  const newUser = new User({
    username,
    email,
    number,
    password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC),
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne(
            {
                username: req.body.username
            })
        !user && res.status(401).json("wrong details");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        )
        const initialPassword = hashedPassword.toString(CryptoJs.enc.Utf8)
            initialPassword !== req.body.password &&
            res.status(401).json("wrong details!")

            const { password, ...others} = user._doc;
            
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router
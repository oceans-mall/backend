const router = require("express").Router()
const User = require("../models/Users")
const Profile = require("../models/Profile")
const CryptoJS = require("crypto-js")
const {verifyTokenAuthorization, verifyTokenAndAdmin, verifyTokenAndAgent,} = require('./verifyToken')
const Users = require("../models/Users")
const jwt = require('jsonwebtoken')


//UPDATE USER
router.put("/:id", verifyTokenAuthorization, async (req, res) => {
    const { password } = req.body
    if(password){
        password = CryptoJS.AES.encrypt(
            password,
            process.env.PASS_SEC
        ).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE
router.delete("/:id", verifyTokenAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err)
    }
})
//GET ALL USER
router.get("/",verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
        const users = query ? await User.find().sort({_id: -1}).limit(10) : await User.find()
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL FISHER-FOLKS
router.get("/profile",verifyTokenAndAgent, async (req, res) => {
    const query = req.query.new
    try {
        const fisherman = query ? await Profile.find().sort({_id: -1}).limit(10) : await Profile.find()
        res.status(200).json(fisherman)
    } catch (err) {
        res.status(500).json(err)
    }
})
//login user
router.post("/login", async (req, res) => {
    try {
        const user = await Users.findOne({username: req.body.username})
        !user && res.status(200).json("user not found");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        )
        const initialPswd = hashedPassword.toString(CryptoJS.enc.Utf8)
        initialPswd != req.body.password && res.status(403).json("incorrect password")

        const accesstoken = jwt.sign({
            id: user._id,
            isAdmin: user._isAdmin,
            isAgent: user._isAgent
        },
            process.env.JWT_SEC,
            {expiresIn: "1d"}
        )
        const {password, ...others} = user._doc;
        res.status(200).json({...others, accesstoken})
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router
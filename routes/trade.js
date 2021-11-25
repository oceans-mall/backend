const router = require("express").Router()
const Trades = require("../models/Trade")
const {verifyTokenAgentAndAdmin} = require('./verifyToken')

//CREATE TRADE
router.get("/trades", verifyTokenAgentAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
        const trade = query ? await Trades.find().sort({_id: -1}).limit(10) : await Trades.find()
        res.status(200).json(trade)
    } catch (err) {
        res.status(403).json(err)
    }
})

module.exports = router;
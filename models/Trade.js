const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema(
    {
        userId: {type: String, required:true, unique:true},
        folksName: {type: String, required:true},
        type: {type: Array},
        source: {type: Array},
        price: {type: Number, required:true},
        quantity: {type: Number, required:true},
    },{timestamps: true}
)

module.exports = mongoose.model("Trade", TradeSchema)
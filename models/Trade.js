const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema(
    {
        useId: {type: String, required:true, unique:true},
        categories: {type: Array},
        source: {type: Array},
        price: {type: Number, required:true},
        quantity: {type: Number, required:true},
    },{timestamps: true}
)

module.exports = mongoose.model("Trade", TradeSchema)
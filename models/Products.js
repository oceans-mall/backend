const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        type: {type: Array, required:true },
        price:{ type: Number, required: true},
        source: {type: Array},
    },
    {timestamps: true}
)

module.exports = mongoose.model("Product", ProductSchema)
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        useId: {type: String, required:true},
        products: [
            {
                productId:{
                    type: String,
                },
                quantity:{
                    type: Number,
                    default: 1
                }
            }
        ],
        amount: {type: Number, required},
        address: {type: Object, required: true},
        status: { type: String, default:"pending"}
    },
    {timestamps: true}
)

module.exports = mongoose.model("User", userSchema)
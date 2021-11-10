const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({
    name:{ type: String, required:true},
    location:{type: String, required:true},
    age: {type: Number, required: true},
    contact: {type: Number, required:true, unique:true},
    gender: ["Male", "Female"],
}, {timestamps:true})

module.exports = mongoose.model("Profile", ProfileSchema)
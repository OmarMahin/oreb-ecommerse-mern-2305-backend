const { default: mongoose, Schema } = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        unique: [true, "Email must be unique"],
        required: [true, "Email is required"]
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    phone: {
        type: Number,
        default: null
    },

    avatar: {
        type: String,
        default: null
    },

    address: {
        type: String,
        default: null
    },

    verified: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        default: "member",
        enum: ["member", "admin", "merchant"]
    },
}, {timestamps: true})


module.exports = mongoose.model("User", userSchema)
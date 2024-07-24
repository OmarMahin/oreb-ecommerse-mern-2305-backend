const { default: mongoose, Schema } = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: [true, "First name is required"]
    },
    last_name:{
        type: String,
        required: [true, "Last name is required"]
    },

    fullname:{
        type: String,
        required: [true, "Full Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    phone: {
        type: Number,
        required: [true, "Phone number is required"]
    },

    address1: {
        type: String,
        required: [true, "Address 1 is required"]
    },

    address2: {
        type: String,
        default: null,
    },

    city: {
        type: String,
        required: [true, "City is required"]
    },

    post_code: {
        type: String,
        required: [true, "Post code is required"]
    },

    country: {
        type: String,
        required: [true, "Country is required"]
    },

    avatar: {
        type: String,
        default: null
    },

    newsletter: {
        type: Boolean,
        default: false
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
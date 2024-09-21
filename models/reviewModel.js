const { default: mongoose, Schema, mongo } = require("mongoose")

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviewDescription: {
        type: String,
        required: true
    },
    pros: {
        type: String,
        required: true
    },
    cons: {
        type: String,
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model("Review", reviewSchema)
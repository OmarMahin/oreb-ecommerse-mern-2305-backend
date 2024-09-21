const { default: mongoose, Schema } = require("mongoose")

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {   
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true
            },
            productName: {
                type: String,
                required: true
            },
            productQuantity: {
                type: Number,
                default: 1
            },
            productPrice: {
                type: Number,
                required: true
            },
            productImage: {
                type: String,
                required: true
            },
            productLink:{
                type: String,
                required: true
            },
            productAvailibility: {
                type: Number,
                required: true
            }
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model("Cart", cartSchema)
const { default: mongoose, Schema } = require("mongoose")

const shopSchema = new mongoose.Schema({

    shopName: {
        type: String,
        required: true
    },
    shopAddress: {
        type: String,
        required: true
    },
    shopEmail: {
        type: String,
        required: true
    },
    shopPhone: {
        type: Number,
        required: true
    },
    shopOwner: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    shopLogo: {
        type: String,
        default: null
    },
    shopProducts: [{
        type: mongoose.Schema.ObjectId,
        ref: "Product",
    }]
}, {timestamps: true})

module.exports = mongoose.model("Shop", shopSchema)
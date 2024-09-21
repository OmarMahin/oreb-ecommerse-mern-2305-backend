const { default: mongoose, Schema, mongo } = require("mongoose")

const productSchema = new mongoose.Schema(
	{
		productName: {
			type: String,
			required: true,
		},
		productPrice: {
			type: Number,
			required: true,
		},
		productQuantity: {
			type: Number,
			required: true,
		},
		productDescription: {
			type: String,
			required: true,
		},
		productImage: {
			type: String,
			default: null,
		},
		productCategory: {
			type: mongoose.Schema.ObjectId,
			ref: "Category",
			required: true,
		},
		productShop: {
			type: mongoose.Schema.ObjectId,
			ref: "Shop",
			required: true,
		},
		productOrigin: {
			type: String,
			required: true,
		},
		productDiscount: {
			type: Number,
			default: 0,
		},
		productType: {
			type: String,
			required: true,
			enum: ["Electronics", "Appliances", "Food", "Clothes"],
		},
		totalReviews: {
			type: Number,
			default: 0,
		},
		totalRatings: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
)


module.exports = mongoose.model("Product", productSchema)
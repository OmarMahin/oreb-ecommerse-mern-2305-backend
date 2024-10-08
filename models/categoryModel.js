const { default: mongoose, Schema } = require("mongoose")

const categorySchema = new mongoose.Schema(
	{
		categoryName: {
			type: String,
			required: true,
		},

		categoryType: {
			type: String,
			required: true,
			enum: ["Electronics", "Appliances", "Food", "Clothes"],
		},

		subCategory: {
			type: Array,
			default: null,
		},

		products: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "Product",
			},
		],

		activeStatus: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model("Category", categorySchema)

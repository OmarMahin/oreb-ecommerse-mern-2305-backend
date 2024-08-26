const productModel = require("../models/productsModel")
const categoryModel = require("../models/categoryModel")
const shopModel = require("../models/shopModel")
const fs = require("fs")
const cloudinary = require("cloudinary").v2

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function addProduct(req, res) {
	const {
		productName,
		productPrice,
		productQuantity,
		productDescription,
		productCategory,
		productShop,
		productOrigin,
		productType,
	} = JSON.parse(req.body.productData)

	try {
		const product = new productModel({
			productName,
			productPrice,
			productQuantity,
			productDescription,
			productCategory,
			productShop,
			productOrigin,
			productType,
		})

		await product.save()

		cloudinary.uploader.upload(
			req.file.path,
			{
				folder: "products",
				use_filename: false,
				public_id: product._id,
				overwrite: true,
				secure: true,
			},
			async (error, result) => {
				if (error) {
					res.status(200).send({ success: false, message: "Something went wrong", error })
				} else {
					await productModel.findOneAndUpdate(
						{ _id: product._id },
						{ productImage: result.url },
						{ new: true }
					)
					await categoryModel.findOneAndUpdate(
						{ _id: productCategory },
						{ $push: { products: product._id } },
						{ new: true }
					)
					await shopModel.findOneAndUpdate(
						{ _id: productShop },
						{ $push: { shopProducts: product._id } },
						{ new: true }
					)

					fs.unlinkSync(req.file.path)
					res.status(200).send({ success: true, message: "Product Created Successfully" })
				}
			}
		)
	} catch (error) {
		res.status(200).send({ success: false, message: "Something went wrong", error })
	}
}

async function getCategoryAndShopList(req, res) {
	try {
		const categories = await categoryModel.find({})
		const shops = await shopModel.find({})
		res.status(200).send({ success: true, data: { categories, shops } })
	} catch (error) {
		res.status(200).send({ success: false, error })
	}
}

module.exports = { addProduct, getCategoryAndShopList }

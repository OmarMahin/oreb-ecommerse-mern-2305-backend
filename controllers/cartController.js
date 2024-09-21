const productSchema = require("../models/productsModel")
const userModel = require("../models/userModel")
const cartModel = require("../models/cartModel")

async function addToCart(req, res) {
	const {
		user,
		productId,
		productName,
		productQuantity,
		productPrice,
		productImage,
		productLink,
		productAvailibility,
	} = req.body

	try {
		const findUserCart = await cartModel.findOne({ user })
		if (findUserCart) {
			await cartModel.findOneAndUpdate(
				{ user },
				{
					$push: {
						products: {
							productId,
							productName,
							productQuantity,
							productPrice,
							productImage,
							productLink,
							productAvailibility,
						},
					},
				}
			)

			return res
				.status(200)
				.send({ success: true, message: "Product added successfully to the cart" })
		} else {
			const cart = new cartModel({
				user,
				products: [
					{
						productId,
						productName,
						productQuantity,
						productPrice,
						productImage,
						productLink,
						productAvailibility,
					},
				],
			})
			await cart.save()
			res.status(200).send({ success: true, message: "Cart created successfully" })
		}
	} catch (error) {
		res.status(200).send({ success: false, message: "An error occurred", data: { error } })
	}
}

async function updateCart(req, res) {
	const { user, product, quantity } = req.body

	try {
		await cartModel.findOneAndUpdate(
			{ user, "products.productId": product },
			{ $set: { "products.$.productQuantity": quantity } }
		)

		res.status(200).send({ success: true, message: "Cart updated successfully" })
	} catch (error) {
		res.status(200).send({ success: false, message: "An error occurred", data: { error } })
	}
}

async function deleteFromCart(req, res) {
	const { user, product } = req.body

	try {
		await cartModel.findOneAndUpdate({ user }, { $pull: { products: { productId: product } } })

		res.status(200).send({ success: true, message: "Product deleted successfully from cart" })
	} catch (error) {
		res.status(200).send({ success: false, message: "An error occurred", data: { error } })
	}
}

async function getAllProductsFromCart(req, res) {
	const { user } = req.params
	try {
		const cart = await cartModel.findOne({ user })
		res.status(200).send({ success: true, data: cart.products })
	} catch (error) {
		res.status(200).send({ success: false, message: "An error occurred", data: { error } })
	}
}
module.exports = { addToCart, updateCart, deleteFromCart, getAllProductsFromCart }

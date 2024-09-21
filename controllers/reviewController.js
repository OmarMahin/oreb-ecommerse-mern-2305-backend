const reviewSchema = require("../models/reviewModel")
const productSchema = require("../models/productsModel")

async function addReview(req, res) {
	const { user, product, rating, reviewDescription, pros, cons } = req.body
	try {
		const review = new reviewSchema({
			user,
			product,
			rating,
			reviewDescription,
			pros,
			cons,
		})
		await review.save()

		await productSchema.findOneAndUpdate(
			{ _id: product },
			{ $inc: { totalReviews: 1, totalRatings: rating } }
		)

		res.status(200).send({ success: true, message: "Review created successfully" })
	} catch (error) {
		res.status(200).send({ success: false, message: "An error occurred", data: { error } })
	}
}

module.exports = { addReview }

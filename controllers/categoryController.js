const categoryModel = require("../models/categoryModel")

async function addCategory(req, res) {
	let { categoryName, categoryType, activeStatus } = req.body

	try {
		let category = new categoryModel({
			categoryName,
			categoryType,
			activeStatus,
		})

		await category.save()

		res.status(200).send({ success: true, message: "Category created successfully" })
	} catch (error) {
		res.status(200).send({ success: false, message: "An error occurred", data: { error } })
	}
}

async function get_all_data(req, res) {
	try {
		const data = await categoryModel.find({})

		res.status(200).send({ success: true, data })
	} catch (error) {
		res.status(200).send({
			success: false,
			message: "An error occurred retrieving category data",
			data: { error },
		})
	}
}

async function delete_data(req, res) {
	const { id } = req.body

    console.log(id)

	try {
		await categoryModel.findOneAndDelete({ _id: id })
		res.status(200).send({ success: true, message: "Deleted category" })
	} catch (error) {
		res.status(200).send({
			success: false,
			message: "An error occurred deleting the category",
			data: { error },
		})
	}
}

async function update_data(req, res) {
	const { id, data } = req.body

	try {
		await categoryModel.findOneAndUpdate({ _id: id }, data, { new: true })

		res.status(200).send({ success: true, message: "Category updated successfully" })
	} catch (error) {
		res.status(200).send({
			success: false,
			message: "An error occured in the update",
			data: { error },
		})
	}
}

module.exports = { addCategory, get_all_data, update_data,delete_data }

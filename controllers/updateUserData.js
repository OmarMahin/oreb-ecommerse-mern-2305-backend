const userModel = require("../models/userModel")

async function updateUserById(req, res) {
	let { id, data } = req.body
	data.fullname = data.first_name + " " + data.last_name
	try {
		await userModel.findOneAndUpdate({ _id: id }, data, { new: true })

		res.status(200).send({ success: true, data: "User updated successfully" })
	} catch (error) {
		res.status(200).send({ success: false, error })
	}
}

module.exports = updateUserById

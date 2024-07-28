const bcrypt = require("bcrypt")
const userModel = require("../models/userModel")

async function changePassword(req, res) {
	let { id, password } = req.body

	bcrypt.hash(password, 5, async (err, hashedPass) => {
		try {
			await userModel.findOneAndUpdate({ _id: id }, { password: hashedPass, otp: null })
			res.status(200).send({ success: true, message: "Password changed successfully" })
		} catch (error) {
			console.log(error)
			res.status(200).send({ success: false, error })
		}
	})
}

module.exports = changePassword

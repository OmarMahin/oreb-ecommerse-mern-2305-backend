const userModel = require("../models/userModel")

async function get_all_users(req, res) {
	try {
		const users = await userModel.find({})
		res.status(200).send({ success: true, data: users })
	} catch (error) {
		console.log(error)
		res.status(200).send({ success: false, error: "An error occured" })
	}
}

async function get_user_by_email(req, res){
    let {email} = req.body
    try {
		const user = await userModel.findOne({email})
		res.status(200).send({ success: true, data: user })
	} catch (error) {
		console.log(error)
		res.status(200).send({ success: false, error: "An error occured" })
	}
}


module.exports = {get_all_users, get_user_by_email}
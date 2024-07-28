const { decryptString } = require("../helpers/encryption")
const userModel = require("../models/userModel")

async function pageVerification(req, res) {
	let { pageLink } = req.body

	const data = decryptString(pageLink)

	const user_id = data.split("|")[0]

	try {

        const user = await userModel.findOne({_id: user_id})

        if (!user){
            res.status(200).send({ valid: false, error: "No user exist" })
            return
        }

        if (user.otp != pageLink){
            res.status(200).send({ valid: false, error: "Invalid page" })
            return
        }

        res.status(200).send({ valid: true, data: {id: user_id} })

	} catch (error) {
		console.log(error)
		res.status(200).send({ valid: false, error: "An error occured" })
	}
}

module.exports = pageVerification

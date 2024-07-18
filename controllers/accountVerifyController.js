const { decryptString } = require("../helpers/encryption")
const userModel = require("../models/userModel")

async function accountVerification(req, res) {
	const { url } = req.body

	const result = decryptString(url)

    if (!result){
        res.status(400).send({ valid: false, error: "Invalid data" })
        return
    }
	if (!result.includes("verified_user")) {
		res.status(400).send({ valid: false, error: "Invalid data" })
        return
	}

	const user_email = result.split("|")[0]

	try {
        const userExist = await userModel.findOne({email: user_email})
        if (!userExist){
            res.status(400).send({ valid: false, error: "No user exist" })
        }
        if (userExist.verified){
            res.status(200).send({valid: false, message: "User is verified"})
            return
        }
		const user = await userModel.findOneAndUpdate(
			{ email: user_email },
			{ verified: true },
			{ new: true }
		)
        res.status(200).send({valid: true, message: "User is verified"})
	} catch (error) {
        res.status(400).send({ valid: false, error: "Error getting user data" })
    }
}

module.exports = accountVerification

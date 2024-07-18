const userModel = require("../models/userModel")
const nodemailer = require("nodemailer")
const handleBars = require("handlebars")
const bcrypt = require("bcrypt")
const { encryptString } = require("../helpers/encryption")

async function registrationController(req, res) {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.MAIL_ID,
			pass: process.env.MAIL_KEY,
		},
	})

	

	let { name, email, password } = req.body

	bcrypt.hash(password, 5, async (err, hashedPass) => {
		const user = new userModel({
			name,
			email,
			password: hashedPass,
		})

		const encryptedString = encryptString(email + "|verified_user" )

        const source = '<div style= "font-family: sans-serif; font-size: 19px"><span style="margin-bottom: 20px">Hello</span><p style="margin-bottom: 20px">Please click on the button below to verify your account for Orebi Ecommerse.</p><a href="http://localhost:5173/verifyUser/{{id}}" target="_blank"><button style="padding: 10px 20px; background-color: #262626;color: white;font-size: 16px; border-style: none; cursor: pointer;">Verify</button></a></div>'

        const template = handleBars.compile(source)

        const result = template({"id": encryptedString})

		try {
			await user.save()

			const info = await transporter.sendMail({
				from: process.env.MAIL_ID,
				to: email,
				subject: "Account Verification",
				html: result,
			})

			res.send({ message: "Email send" })
		} catch (error) {
			res.send(error)
		}
	})
}

async function loginController(req, res) {
	let { email, password } = req.body

	const user = await userModel.findOne({ email })

	if (user) {
		bcrypt.compare(password, user.password, (error, result) => {
			if (result) {
				res.send(user)
			} else {
				res.send({ error: "Invalid credentials" })
			}
		})
	} else {
		res.send({ error: "Invalid credentials" })
	}
}

module.exports = { registrationController, loginController }

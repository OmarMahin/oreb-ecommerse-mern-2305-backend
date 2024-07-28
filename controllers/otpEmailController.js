const userModel = require("../models/userModel")
const nodemailer = require("nodemailer")
const handleBars = require("handlebars")
const { encryptString } = require("../helpers/encryption")

async function sendOTP(req, res) {
	let { email } = req.body
	try {
		const user = await userModel.findOne({ email })
		if (!user) {
			res.status(200).send({ success: false, error: "No user exist with this email" })
			return
		}

		const otp = Math.floor(Math.random() * (999999 - 100000) + 100000)
		try {
			await userModel.findOneAndUpdate(
				{ email },
				{
					otp,
					otpAt: Math.floor(Date.now() / 1000),
					otpExpireTime: 500,
				},
				{ new: true }
			)

			const transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: process.env.MAIL_ID,
					pass: process.env.MAIL_KEY,
				},
			})

			const source =
				'<div style= "font-family: sans-serif; font-size: 19px"><span style="margin-bottom: 20px">Hello</span><p style="margin-bottom: 20px">Your requested OTP is {{otp}}. This otp is valid for 10 minutes only.</p></div>'

			const template = handleBars.compile(source)

			const result = template({ otp })

			const info = await transporter.sendMail({
				from: process.env.MAIL_ID,
				to: email,
				subject: "OTP",
				html: result,
			})

			res.status(200).send({ success: true, message: "An email has been sent for OTP" })
		} catch (error) {
			res.status(200).send({ success: false, error })
		}
	} catch (error) {
		console.log(error)
		res.status(200).send({ success: false, error: "An error occured" })
	}
}

async function verifyOtp(req, res) {
	let { email, otp } = req.body

	try {
		const user = await userModel.findOne({ email })
		const user_otp = user.otp
		const otp_time = user.otpAt
		const otp_expireTime = user.otpExpireTime
		const current_time = Math.floor(Date.now() / 1000)

		try {
			if (user_otp == otp && current_time - otp_time <= otp_expireTime) {

				const pageLink = user._id + "|" + Date.now()
				const encryptedString = encryptString(pageLink)

				await userModel.findOneAndUpdate(
					{ email },
					{
						otp: encryptedString,
						otpAt: null,
						otpExpireTime: null,
					},
					{ new: true }
				)
				res.status(200).send({ success: true, data: { link: encryptedString } })
				return
			} else {
				await userModel.findOneAndUpdate(
					{ email },
					{
						otp: null,
						otpAt: null,
						otpExpireTime: null,
					},
					{ new: true }
				)
			}

			res.status(200).send({ success: false, error: "Invalid otp" })
		} catch (error) {
			console.log(error)
			res.status(200).send({ success: false, error: "An error occured" })
		}
	} catch (error) {
		console.log(error)
		res.status(200).send({ success: false, error: "An error occured" })
	}
}

module.exports = { sendOTP, verifyOtp }

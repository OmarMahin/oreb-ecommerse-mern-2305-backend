const jwt = require("jsonwebtoken")

function generateAccesssTokenForMembers(req, res, id) {
	const token = jwt.sign(
		{
			id,
			type: "member",
			valid: true,
		},
		process.env.SECRET_KEY,
		{ expiresIn: "1m" }
	)

	res.cookie(`${process.env.ACCESS_TOKEN}`, token, {
		maxAge: 1 * 60000,
		httpOnly: true,
		secure: true,
		sameSite: "strict",
	})
}

function generateRefreshTokenForMembers(req, res, id) {
	const token = jwt.sign(
		{
			id,
			type: "member",
			valid: true,
		},
		process.env.SECRET_KEY,
		{ expiresIn: "5m" }
	)

	res.cookie(`${process.env.REFRESS_TOKEN}`, token, {
		maxAge: 5 * 60000,
		httpOnly: true,
		secure: true,
		sameSite: "strict",
	})
}

function generateAccesssTokenForAdmin(req, res, id) {
	const token = jwt.sign(
		{
			id,
			type: "admin",
			valid: true,
		},
		process.env.SECRET_KEY,
		{ expiresIn: "1m" }
	)

	res.cookie(`${process.env.ACCESS_TOKEN}`, token, {
		maxAge: 1 * 60000,
		httpOnly: true,
		secure: true,
		sameSite: "strict",
	})
}

function generateLogoutTokens(req, res) {
	const token = jwt.sign(
		{
			id: null,
			type: null,
			valid: false,
		},
		process.env.SECRET_KEY,
		{ expiresIn: "1m" }
	)

	res.cookie(`${process.env.ACCESS_TOKEN}`, token, {
		maxAge: 1 * 60000,
		httpOnly: true,
		secure: true,
		sameSite: "strict",
	})

	res.cookie(`${process.env.REFRESS_TOKEN}`, token, {
		maxAge: 1 * 60000,
		httpOnly: true,
		secure: true,
		sameSite: "strict",
	})
}

function generateRefreshTokenForAdmin(req, res, id) {
	const token = jwt.sign(
		{
			id,
			type: "admin",
			valid: true,
		},
		process.env.SECRET_KEY,
		{ expiresIn: "5m" }
	)

	res.cookie(`${process.env.REFRESS_TOKEN}`, token, {
		maxAge: 5 * 60000,
		httpOnly: true,
		secure: true,
		sameSite: "strict",
	})
}

function verifyJWTToken(req, res) {
	let accessTokenName = process.env.ACCESS_TOKEN
	let refreshTokenName = process.env.REFRESS_TOKEN

	let accessToken = req.cookies[accessTokenName] || null
	let refreshToken = req.cookies[refreshTokenName] || null

	if (accessToken) {
		try {
			jwt.verify(accessToken, process.env.SECRET_KEY, (error, decoded) => {
				if (error) {
					res.status(200).send({ authorized: false, error })
				} else {
					const data = decoded
					if (data.valid) {
						res.status(200).send({ authorized: true, data })
					} else {
						res.status(200).send({ authorized: false, data })
					}
				}
			})
		} catch (error) {
			console.log(error)
		}
	} else if (refreshToken) {
		try {
			jwt.verify(refreshToken, process.env.SECRET_KEY, (error, decoded) => {
				if (error) {
					res.status(200).send({ authorized: false, error })
				} else {
					const data = decoded
					if (data.type == "member") {
						generateAccesssTokenForMembers(req, res, data.id)
					} else if (data.type == "admin") {
						generateAccesssTokenForAdmin(req, res, data.id)
					}
					res.status(200).send({ authorized: true, data })
				}
			})
		} catch (error) {
			console.log(error)
		}
	} else {
		res.status(200).send({ authorized: false })
	}
}

module.exports = {
	generateAccesssTokenForMembers,
	generateRefreshTokenForMembers,
	verifyJWTToken,
	generateRefreshTokenForAdmin,
	generateAccesssTokenForAdmin,
	generateLogoutTokens,
}

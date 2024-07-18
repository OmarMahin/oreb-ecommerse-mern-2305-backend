const Cryptr = require("cryptr")

const cryptr = new Cryptr(process.env.SECRET_KEY)

function encryptString(string) {
	const result = cryptr.encrypt(string)

	return result
}

function decryptString(string) {
	try {
		const result = cryptr.decrypt(string)
		return result
	} catch (error) {
        return null
    }
}

module.exports = { encryptString, decryptString }

const otpLib = require("otplib")

const totp = otpLib.totp

totp.options = { digits: 6, epoch: Date.now(), step: 600 }

function generateOTP() {
    const otp = totp.generate(process.env.SECRET_KEY)
    return otp
}


function verifyOTP(otp){
    try {
        const key = process.env.SECRET_KEY
        const valid = totp.verify({otp, key})

        return valid
        
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {generateOTP, verifyOTP}
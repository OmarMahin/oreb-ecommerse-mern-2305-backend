const express = require("express")
const accountVerification = require("../../../controllers/accountVerifyController")
const { sendOTP, verifyOtp } = require("../../../controllers/otpEmailController")
const { verifyJWTToken } = require("../../../helpers/jwtHandler")
const _router = express.Router()

_router.post("/verify_account", accountVerification)
_router.get("/authorize_user", verifyJWTToken)
_router.post("/sendOTP", sendOTP)
_router.post("/verifyOTP", verifyOtp)



module.exports = _router
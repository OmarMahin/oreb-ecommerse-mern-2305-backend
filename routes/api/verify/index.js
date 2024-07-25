const express = require("express")
const accountVerification = require("../../../controllers/accountVerifyController")
const { verifyJWTToken } = require("../../../helpers/jwtHandler")
const _router = express.Router()

_router.post("/verify_account", accountVerification)
_router.get("/authorize_user", verifyJWTToken)



module.exports = _router
const express = require("express")
const accountVerification = require("../../../controllers/accountVerifyController")
const _router = express.Router()

_router.post("/verify_account", accountVerification)



module.exports = _router
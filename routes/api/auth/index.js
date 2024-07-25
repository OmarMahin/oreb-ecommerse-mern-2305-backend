const express = require("express")
const {registrationController, memberLogin, adminLogin} = require("../../../controllers/authController")
const _router = express.Router()

_router.post("/registration", registrationController)
_router.post("/member_login", memberLogin)
_router.post("/admin_login", adminLogin)


module.exports = _router
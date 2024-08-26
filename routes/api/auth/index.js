const express = require("express")
const {registrationController, memberLogin, adminLogin, logoutController} = require("../../../controllers/authController")
const _router = express.Router()

_router.post("/registration", registrationController)
_router.post("/member_login", memberLogin)
_router.post("/admin_login", adminLogin)
_router.get("/logout", logoutController)

module.exports = _router
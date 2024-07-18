const express = require("express")
const {registrationController, loginController} = require("../../../controllers/authController")
const _router = express.Router()

_router.post("/registration", registrationController)
_router.post("/login", loginController)


module.exports = _router
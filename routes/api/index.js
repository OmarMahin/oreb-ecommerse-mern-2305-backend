const express = require("express")
const _router = express.Router()
const auth = require("./auth")
const verify = require("./verify")
const user_data = require("./user_data")

_router.use("/auth", auth)
_router.use("/verify", verify)
_router.use("/user_data", user_data)


module.exports = _router
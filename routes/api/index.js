const express = require("express")
const _router = express.Router()
const auth = require("./auth")
const verify = require("./verify")

_router.use("/auth", auth)
_router.use("/verify", verify)


module.exports = _router
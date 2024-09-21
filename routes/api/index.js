const express = require("express")
const _router = express.Router()
const auth = require("./auth")
const verify = require("./verify")
const user_data = require("./user_data")
const category = require("./category")
const files = require("./files")
const product = require('./product')
const shop = require('./shop')
const review = require('./review')
const cart = require('./cart')

_router.use("/auth", auth)
_router.use("/verify", verify)
_router.use("/user_data", user_data)
_router.use("/category", category)
_router.use("/file", files)
_router.use("/product", product)
_router.use("/shop", shop)
_router.use("/review", review)
_router.use("/cart", cart)


module.exports = _router
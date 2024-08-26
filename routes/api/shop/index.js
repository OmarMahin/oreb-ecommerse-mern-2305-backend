const express = require("express")
const { createShop } = require("../../../controllers/shopController")

const _router = express.Router()


_router.post("/create_shop", createShop)


module.exports = _router
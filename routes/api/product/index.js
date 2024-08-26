const express = require("express")
const { addProduct, getCategoryAndShopList } = require("../../../controllers/productController")
const upload = require("../../../middleware/multerMiddleware")
const _router = express.Router()

_router.post("/add_product", upload.single("productImage"), addProduct)
_router.get("/get_category_shops", getCategoryAndShopList)

module.exports = _router

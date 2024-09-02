const express = require("express")
const { addProduct, getCategoryAndShopList, getAllProducts, getSingleProduct } = require("../../../controllers/productController")
const upload = require("../../../middleware/multerMiddleware")
const _router = express.Router()

_router.post("/add_product", upload.single("productImage"), addProduct)
_router.post("/find_product", getSingleProduct)
_router.get("/get_category_shops", getCategoryAndShopList)
_router.get("/get_all_products", getAllProducts)

module.exports = _router

const express = require("express")
const { addToCart, updateCart, deleteFromCart, getAllProductsFromCart } = require("../../../controllers/cartController")
const _router = express.Router()


_router.post("/add_to_cart", addToCart)
_router.post("/update_cart", updateCart)
_router.post("/delete_from_cart", deleteFromCart)
_router.get("/get_products/:user", getAllProductsFromCart)

module.exports = _router
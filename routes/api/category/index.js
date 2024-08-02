const express = require("express")
const _router = express.Router()
const {addCategory, get_all_data, update_data, delete_data} = require("../../../controllers/categoryController")

_router.post("/add_category", addCategory)
_router.get("/get_all_data", get_all_data)
_router.post("/update_data", update_data)
_router.delete("/delete_data", delete_data)



module.exports = _router
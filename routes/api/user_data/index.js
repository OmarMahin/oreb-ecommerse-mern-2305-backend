const express = require("express")
const { get_all_users, get_user_by_email } = require("../../../controllers/getUserData")
const updateUserById = require("../../../controllers/updateUserData")
const _router = express.Router()

_router.get("/all_users", get_all_users)
_router.post("/user_by_id", get_user_by_email)
_router.post("/update_user", updateUserById)


module.exports = _router
const express = require("express")
const { addReview } = require("../../../controllers/reviewController")
const _router = express.Router()

_router.post("/add_review", addReview)


module.exports = _router

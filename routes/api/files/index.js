const express = require("express")
const upload = require("../../../middleware/multerMiddleware")
const _router = express.Router()

_router.post("/upload_single", upload.single("file"), (req, res) => {
	res.send(JSON.parse(req.body.productData))
})

module.exports = _router

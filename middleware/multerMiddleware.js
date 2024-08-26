const multer = require("multer")

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./client-files")
	},
	filename: function (req, file, cb) {
		//   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random())
		//   cb(null, file.fieldname + '-' + uniqueSuffix)
		cb(null, file.originalname)
	},
})

const upload = multer({ storage: storage })

module.exports = upload

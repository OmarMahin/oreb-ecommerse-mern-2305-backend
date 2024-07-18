const express = require("express")
const _router = express.Router()
const api = require("./api")

const api_routes = process.env.API_ROUTES

_router.use(api_routes, api)
_router.use(api_routes, (req, res)=>{
    res.send("No api found on this url")
})


module.exports = _router
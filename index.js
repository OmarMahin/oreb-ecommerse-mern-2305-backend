const express = require("express")
require('dotenv').config()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const routes = require("./routes")
const dbConnection = require("./config/dbConfig")

const app = express()

dbConnection()

app.use(cors({
    origin: [`http://localhost:5173`],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)

app.use(routes, (req, res)=>{
    res.status(500).send({message: "Something broke"})
})

// http://localhost:3000/api/v1/auth/registration
app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`Server is running on ${process.env.SERVER_PORT}`)
})


const mongoose = require("mongoose")

function dbConnection(){
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("Database is connected.")
    }).catch((error)=>{
        console.log(error)
    })
}


module.exports = dbConnection
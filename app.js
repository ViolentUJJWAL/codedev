const colors = require('colors')
const express = require("express")
const cors = require("cors")
require("dotenv").config()
const contactRoutes = require("./routes/contactRoutes")


const appServer = async () => {
    try {

        const PORT = process.env.PORT || 8000

        // rest object
        const app = express()

        

        // middelware
        app.use(cors({
                origin: "http://localhost:5173",
                credentials: true,
            })
        );
        app.use(express.json())

        // routes
        app.use("/api/v1", contactRoutes)
        
        // server listen
        app.listen(PORT, () => {
            console.log(`Server running on Post- ${PORT}`.bgBlue.black)
        })

    }
    catch (err) {
        console.log(`app occur error {\n${err}\n}`.bgRed.black)
    }
}

module.exports = appServer
import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import routes from "./routes/routes"

const app = express()
app.use(cors())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))

app.use("/api",routes)

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))

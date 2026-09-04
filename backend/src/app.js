const express = require("express")
const CookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.routes")
const songRouter = require("./routes/song.routes")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(CookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use("/api" , authRouter)
app.use("/api/songs" , songRouter)
module.exports = app 
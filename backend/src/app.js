const express = require("express")
const CookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.routes")

const app = express()

app.use(express.json())
app.use(CookieParser())
app.use("/api" , authRouter)
module.exports = app 
const express = require("express")
const CookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.routes")

app.use(express.json())
app.use(CookieParser())
app.use("/api" , authRouter)
module.exports = app 
const express = require("express")
const CookieParser = require("cookie-parser")


app.use(express.json())
app.use(CookieParser())

module.exports = app 
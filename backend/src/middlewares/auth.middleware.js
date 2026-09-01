const userModel = require("../models/user.model")
const blacklist = require("../models/blacklist.model")
const jwt = require("jsonwebtoken")
const redis = require("../config/cache")

async function authUser ( req , res , naxt){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Token not provided"
        })
    }

// const isTokenBlacklisted = await blacklist.findOne({
//     token
// })
const isTokenBlacklisted = await redis.get(token)

if(!isTokenBlacklisted){
    return res.status(401).json({
        message: "Invalid token"
    })
}

    try{
        const verify = jwt.verify( token , 
            process.env.JWT_SECRET_KEY 
        )

        req.user = verify 
        next()

    } catch(err){
        return res.status(401).json({
            message : "Invalid token"
        })

    }
}

module.exports = { authUser }
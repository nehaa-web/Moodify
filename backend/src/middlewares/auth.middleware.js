const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

async function authUser ( req , res , naxt){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Token not provided"
        })
    }
    try{

        const verify = jwt.verify( token , 
            process.env.JWT_SECRET_KEY 
        )

        req.user = verify 
        next()

    }catch(err){
        return res.status(401).json({
            message : "Invalid token"
        })

    }
}

module.exports = { authUser }
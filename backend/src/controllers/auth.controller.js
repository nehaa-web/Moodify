const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

async  function registerUser ( req ,res ){

    const { username , email , password} = req.body

    const isAlreadyRegistered = findOne({
        $or: [ {username} , {email} ]
    })
if(isAlreadyRegistered){
      return res.status(409).json({
      message:
        isUserAlreadyExist.email == email
          ? "Email already exist"
          : "Username already exist",
    });
}

const hash = await bcrypt.hash(password , 10)

const user = await userModel.create({
    username ,
    email,
    password : hash 
})

const token = jwt.sign(
    { id : user._id , email : user.email},
    process.env.JWT_SECRET_KEY ,
    { expiresIn : "3d"}
)

res.cookie("token" . token)

res.status(201).json({
    message: "User Registored succesfully ",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImg: user.profileImg,
    },
  });
}

async  function loginUser ( req ,res ){

    const { username , email , password} = req.body

    const user = findOne({
        $or: [ {username} , {email} ]
    })
if(!user){
      return res.status(409).json({
      message:  "User not found"
    });
}

const isPasswordValid = await bcrypt.compare(password , user.password)

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "password is Invalid",
    });
  }


const token = jwt.sign(
    { id : user._id , username : user.username},
    process.env.JWT_SECRET_KEY ,
    { expiresIn : "3d"}
)

res.cookie("token" . token)

res.status(201).json({
    message: "User Registored succesfully ",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImg: user.profileImg,
    },
  });
}




module.exports = { registerUser , loginUser} 
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
username:{
    type : String ,
    required : [true ,"Username is required"],
    unique : [true ,"Username is unique"]
},
email : {
    type : String ,
    required : [true , "Email is required"],
    unique: [ture ,"Email is unique"]
},
password:{
    type: String ,
    required:[true ,"Password is required"]
}

})

const userModel = mongoose.model("users" , userSchema)

module.exports = userModel
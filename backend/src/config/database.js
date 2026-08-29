const mongoose = require('mongoose')

const connectDB = async () =>{
    await mongoose.connect()
    .then(()=>{
        console.log("DB connected");
    })
}

module.exports = connectDB
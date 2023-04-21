const mongoose = require('mongoose')

//schema replica of document in database
const employeeSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }


},{timestamps:true})

module.exports = mongoose.model('employees',employeeSchema)
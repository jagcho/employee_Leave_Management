const mongoose = require('mongoose')

//schema replica of document in database
const employeeLeaveSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    employeeId:{
        type:String,
        required:true
    },
    toDate:{
        type:String,
        required:true
    },
    PFA:{
        type:String,
        required:true
    }, 
    fromDate:{
        type:String,
        required:true
    },
    radioValue:{
        type:String,
        required:true
    },


},{timestamps:true})

module.exports = mongoose.model('employeesLeave',employeeLeaveSchema)
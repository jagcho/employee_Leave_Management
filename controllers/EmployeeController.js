const employeeLeaveModel = require("../models/employeeLeaveModel");
const employeeModel = require('../models/employeeModel')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
//Api to store and fetch details of employee from database




const createEmployee = async (req, res) => {
  try {
    let { firstName, lastName,email,phone,password} = req.body;

    if (!firstName)
      return res
        .status(400)
        .send({ status: false, message: "firstName is required" });

    if (!/^([a-zA-Z]+)$/.test(firstName))
      return res
        .status(400)
        .send({ status: false, message: "firstName is invalid" });
        
        if (!lastName)
      return res
        .status(400)
        .send({ status: false, message: "lastName is required" });

    if (!/^([a-zA-Z]+)$/.test(lastName))
      return res
        .status(400)
        .send({ status: false, message: "lastName is invalid" });

   

         //===== validate email ======//

    if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
      return res.status(400).send({ status: false, message: `${email} is not a valid email` });
    }


    let checkEmail = await employeeModel.findOne({ email: email });
    if (checkEmail) {
      return res
        .status(400)
        .send({
          status: false,
          message: ` ${email} email address is present `,
        });
    }

      


    //===== validate phone ======//

    if (!/^\s*(?=[6789])[0-9]{10}\s*$/.test(phone)) {
      return res
        .status(400)
        .send({
          status: false,
          message: `Heyyy....! ${phone} is not a valid phone`,
        });
    }

        //===== validate and hash password ======//
   
        if (!/^[a-zA-Z0-9@*&$#!]{8,15}$/.test(password)) {
          return res.status(400).send({
            status: false,
            message: "please enter valid password min 8 or max 15 digit",
          });
        }
    
        //hashing
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);
        password = hash;

    //save
    const employee = await new employeeModel({
      firstName,
      lastName,
      email,
      phone,
      password
    }).save();

    res.status(201).send({
      success: true,
      message: "Leave applied Successfully",
      employee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Applying",
      error,
    });
  }
};

let loginEmployee = async function (req, res) {
  try {
    let data = req.body;
   
    const {email,password} =data

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide details in body" });
    }
    if (!email|| email.trim().length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide Email" });
    }
    if (!password || password.trim().length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide Password" });
    }
    if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
      return res.status(400).send({
        status: false,
        message: "Email should be valid email address",
      });
    }
    if (!/^.{8,15}$/.test(password)) {
      return res.status(400).send({
        status: false,
        message: "password length should be in between 8 to 15",
      });
    }

    let employeeData = await employeeModel.findOne({ email: email });
    
    if (!employeeData) {
      return res.status(400).send({
        status: false,
        message: "Email or the Password doesn't match",
      });
    }

    const checkPassword = await bcrypt.compare(password, employeeData.password)

    if (!checkPassword) return res.status(401).send({ status: false, message: `Login failed!! password is incorrect.` });
    let userId = employeeData._id
    let token = jwt.sign(
      {
        userId: userId,
      }, "group71-project5", { expiresIn: '7d' },

    );

    {
      res.status(200).send({ status: true, message: "Employee login successfull", data: { employeeId: userId, Token: token } });
    }
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

const applyLeave = async (req, res) => {
  try {
    let { firstName, lastName,employeeId, toDate,PFA,fromDate,radioValue} = req.body;
    
    if (!firstName)
      return res
        .status(400)
        .send({ status: false, message: "firstName is required" });

    if (!/^([a-zA-Z]+)$/.test(firstName))
      return res
        .status(400)
        .send({ status: false, message: "firstName is invalid" });
        
        if (!lastName)
      return res
        .status(400)
        .send({ status: false, message: "lastName is required" });

    if (!/^([a-zA-Z]+)$/.test(lastName))
      return res
        .status(400)
        .send({ status: false, message: "lastName is invalid" });

        if (!employeeId)
      return res
        .status(400)
        .send({ status: false, message: "employeeId is required" });



        let ReasonOFLeaves = ['Sick_Leave','Casual_Leave','Religious_Leave','Others']

        if(radioValue=='1'){
          radioValue=ReasonOFLeaves[0]
        }else if(radioValue=='2'){
          radioValue=ReasonOFLeaves[1]
        }else if(radioValue=='3'){
          radioValue=ReasonOFLeaves[2]
        }else if(radioValue=='4'){
          radioValue=ReasonOFLeaves[3]
        }

    //save
    const employee = await new employeeLeaveModel({
      firstName,
      lastName,
      employeeId,
      toDate,
      PFA,
      fromDate,
      radioValue,
    }).save();

    res.status(201).send({
      success: true,
      message: "Leave applied Successfully",
      employee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Applying",
      error,
    });
  }
};

//Api to get students according to Pagination (filter)
const getEmployeeByPagination = async (req, res) => {
  try {
    let data = req.query;

    let {firstName,LastName } = data;

    const filter = {};

    if (firstName) {
      filter.firstName = firstName;
    }

    if (LastName) {
      filter.LastName = LastName;
    }
   console.log(filter)
   // const Order =parseInt(order)
    const fetchEmployee = await employeeLeaveModel.find(filter)
      // .sort({ standard: Order })

    return res.status(200).send({
      Info: fetchEmployee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in fetch",
      error,
    });
  }
};

module.exports = { createEmployee,applyLeave ,getEmployeeByPagination,loginEmployee};

const express=require('express');
const { applyLeave, getEmployeeByPagination, createEmployee, loginEmployee, } = require('../controllers/EmployeeController');


//router instance from express
const router=express.Router()


//Routes with endpoints
router.post('/register',createEmployee)
router.post('/applyLeave',applyLeave);
router.post('/login',loginEmployee);

router.get('/employees',getEmployeeByPagination);







module.exports = router
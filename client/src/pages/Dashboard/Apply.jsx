import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Toaster } from "react-hot-toast";


const Apply = ({ employee, setEmployee, setApply }) => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeId, setemployeeId] = useState("");
  const [toDate, setToDate] = useState("");
  const [PFA, setPFA] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [radioValue, setRadioValue] = useState('');


  const radios = [
    { name: 'Sick_Leave', value: '1' },
    { name: 'Casual_Leave', value: '2' },
    { name: 'Religious_Leave', value: '3' },
    {name:'Others',  value:'4'}
  ];


 
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/applyLeave", {
        firstName,
        lastName,
        employeeId,
        toDate,
        PFA,
        fromDate,
        radioValue
      });
      console.log(res);
      if (res && res.data.success) {
        toast.success(res.data.message);
        
      } else {
        toast.error(res.data.message);
      }

      setTimeout(()=>{
        setApply(false)
      },2000)
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4>Apply FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your First Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your last Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={employeeId}
              onChange={(e) => setemployeeId(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Email Id"
              required
            />
          </div>

          <div className="mb-3">
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={ 'outline-dark' }
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
          </div>

    
          <div className="mb-3">
            <form action="/action_page.php">
              <input type="date" 
              
              value={fromDate}
              onChange={(e) => setfromDate(e.target.value)}
              className="form-control"
              placeholder="from Date"
              />
            </form>
          </div>
          <div className="mb-3">
          <form action="/action_page.php">
              <input type="date"   
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="form-control"
              placeholder="to Date"
              />
              
            </form>
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={PFA}
              onChange={(e) => setPFA(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Reason for Leave"
            />
          </div>
          <Toaster />
          <button type="submit" className="btn btn-success">
            Apply 
            
          </button>
          
        </form>
      </div>
    </>
  );
};

export default Apply;

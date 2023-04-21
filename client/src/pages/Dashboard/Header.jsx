import Button from "react-bootstrap/Button";
import React from 'react'

const Header = ({setApply}) => {
  return (
    <>
    <h1> Employee Leave Management System</h1>
    <div className="mb-3 text-end">
    <Button onClick={()=>{setApply(true)}} variant="dark">Apply Leave</Button>
    </div>
    </>
  )
}

export default Header
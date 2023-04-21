import {React, useState ,useEffect} from 'react';
import {  Link,useNavigate} from 'react-router-dom'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import axios from 'axios'

export  function Registration() {

  const data = { firstName: '',lastName:'', email: '', password: '', phone:''} 
  const [inputData, setInputData] = useState(data)
  const [flag,setflag]=useState(false)

  console.log(inputData)

  useEffect(()=>{
     console.log('Registered')
  },[flag])

  function handleData(e) {
    setInputData((inputData)=>{
  
      const updatedInputData={ ...inputData, [e.target.name]: e.target.value }
      
      return updatedInputData
    })
    
  }
  
    async function PostData (e){
      e.preventDefault();
      const {firstName,lastName,email,password,phone}=inputData;
      
       if (!firstName||!lastName || !email || !password ||!phone ) {

       return  alert('All fields are Mandatory')

      } else{
        
         setflag(true)
          }
      
          const res = await axios.post("/api/v1/register", {
            firstName,
            lastName,
            email,
            password,
            phone
          });
          console.log(res);
          if (res && res.data.success) {
            toast.success(res.data.message);
            goToLogIn()
          } else {
            toast.error(res.data.message);
          }


    }
  const navigate=useNavigate()
  function goToLogIn(){
        navigate("/LogIn")
  }



  
  return (
    <div>
      <Container>

        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4" >
                  <h2 className="fw-bold mb-2 text-center ">
                  Register
                  </h2>
                  <div className="mb-3">
                    <Form method="POST"  >
                      <Form.Group className="mb-3" controlId="Name"  >
                        <Form.Label className="text-center">firstName</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" name="firstName" value={inputData.firstName} onChange={handleData}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="Name"  >
                        <Form.Label className="text-center">lastName</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" name="lastName" value={inputData.lastName} onChange={handleData}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail"  >
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={inputData.email} onChange={handleData}/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword" 
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="password" 
                        name="password"
                        value={inputData.password} onChange={handleData}
                        />
                      </Form.Group>
                     
                        <Form.Group
                        className=" mb-3"
                        controlId="formNumber" 
                      >
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text"  placeholder="Number" 
                        name="phone" 
                        value={inputData.phone} onChange={handleData}
                        />
                      </Form.Group>
                      
                      <div className="d-grid">
                        <Button variant="primary" type="submit" onClick={PostData} >
                          Create Account
                        </Button>
                      </div>
                      <Toaster />
                      </Form>
                    
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{' '}
                        <Link to="/LogIn">Sign In</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
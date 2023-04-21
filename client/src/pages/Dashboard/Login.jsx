import {React,useEffect,useState} from 'react';
import { Link ,useNavigate } from 'react-router-dom'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import axios from 'axios'

export  function LogIn() {
  const data = {  email: '', password: ''}
  const [inputData, setInputData] = useState(data)
  const [flag,setflag]=useState(false)
  useEffect(()=>{
     console.log('Logged-In')
  },[flag])
  function handleData(e) {
    setInputData((inputData)=>{
      const updatedInputData={ ...inputData, [e.target.name]: e.target.value }
      console.log(inputData)
      return updatedInputData
    })
  }

    async function PostData (e){
      e.preventDefault();
      const {email,password}=inputData;
       if ( !email || !password ) {

       return  alert('All fields are Mandatory')

      } else{
         setflag(true)
          }
          const res = await axios.post("/api/v1/login", {
            email,
            password
          });
          console.log(res);
          if (res && res.data) {
            toast.success(res.data.message);
            goTodashboard()
          } else {
            toast.error(res.data.message);
            //goTodashboard()
          }  

    }
  
    const navigate=useNavigate()
  function goTodashboard(){
        navigate("/dashboard")
  }
  
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className=" mb-2 text-center text-uppercase ">
                     Login
                  </h2>
                  <div className="mb-3">
                    <Form >
                      <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={inputData.name} onChange={handleData}/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={inputData.password} onChange={handleData}/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                      <Button variant="primary" type="submit" onClick={PostData}>
                          Log-In
                        </Button>
                        </div>
                        <Toaster />
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account??{' '}
                        <Link to="/">Sign Up</Link>
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
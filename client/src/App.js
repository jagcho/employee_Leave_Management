import './App.css';
import{Routes,Route} from "react-router-dom"
import { Container } from "react-bootstrap";
import {Dashboard} from './pages/Dashboard/Dashboard';
import { Registration } from './pages/Dashboard/Registration';
import { LogIn } from './pages/Dashboard/Login';

function App() {
  return (
    <Container className="mb-4">
    <Routes>
      <Route path='/' element={<Registration/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/LogIn' element={<LogIn/>}/>
    </Routes>
  </Container>
  );
}

export default App;

import './App.css';
import NavComp from './Components/NavComp';
import { Routes, Route } from "react-router-dom";
import Employees from './Pages/Employees';
import Departments from './Pages/Departments';
import Users from './Pages/Users';
import Signin from './Pages/Signin';
import React, { useState, useEffect ,useContext} from "react";
import { AuthContext } from './Contexts/AuthContext';
import {Navbar,Container,Row,Col} from 'react-bootstrap';
import Overview from './Pages/Overview';
import Sidebar from './Components/Sidebar';
import * as Icon from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  //AuthContext
  const {user,dispatch} = useContext(AuthContext);
  const [state,setState] = useState(null);
  const [userLoggedIn,setUserLoggedIn] = useState(false);
  const Role = user?.Role;
  useEffect(() => {
    if(Role === "admin"){
      setUserLoggedIn(true);
      
    }
  },[user])
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    // Function to update screen width on resize
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };
  
    // Set up an event listener for window resize
    useEffect(() => {
      window.addEventListener("resize", updateScreenWidth);
  
      // Cleanup listener on component unmount
      return () => {
        window.removeEventListener("resize", updateScreenWidth);
      };
    }, []);
  return (
    <div className="App">
       {(screenWidth) < 768 && <NavComp />}
       <Row className="g-0"> 
       <Col sm={2}>
         {(screenWidth) >= 768 && <Sidebar/>}
       </Col>
        <Col sm={10}>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={userLoggedIn? <Overview />:<Signin/>} />
          <Route path="/employees" element={userLoggedIn? <Employees />:<Signin/>} />
          <Route path="/departments" element={userLoggedIn? <Departments />:<Signin/>} />
          <Route path="/users" element={userLoggedIn? <Users />:<Signin/>} />
        </Routes>
        </Col>
      </Row>
    </div>
  );
}

export default App;

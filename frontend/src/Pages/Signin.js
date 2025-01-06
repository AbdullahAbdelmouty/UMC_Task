import React ,{useContext}from "react";
import {Row,Col,Form,Button} from 'react-bootstrap';
import { useState } from "react";
import { AuthContext } from '../Contexts/AuthContext';
    
// signin page
export default function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const api = `${process.env.REACT_APP_BACKEND_URL}/api/v1`;
    const {dispatch} = useContext(AuthContext);
    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // fetch API to sign in
        fetch( `${api}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // save the user to the context
            dispatch({type: 'LOGIN', payload: data});
            // redirect to the overview page
            // window.location.href = '/';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    return (
        <Row>
            <Col  md={{ span: 6, offset: 3 }} className="mt-5 bg-white rounded p-4">
                <h1 className="fs-2" style={{color:"#121c3e"}}>Sign In</h1>
                <Form onSubmit={handleSubmit}> 
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} value={password} />
                    </Form.Group>
                    <Button variant="primary" className="border-0" style={{backgroundColor:"#121c3e"}} type="submit">
                        Sign In
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}
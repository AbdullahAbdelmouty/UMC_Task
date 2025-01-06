import React from "react";
import {Row,Col,Modal, Container, Button,Form} from 'react-bootstrap';
import { Trash3,EyeFill,BoxArrowLeft,PencilSquare,BuildingAdd } from 'react-bootstrap-icons';
import { useState,useContext,useEffect } from 'react';
import { UserContext } from "../Contexts/UserContext";
import { AuthContext } from '../Contexts/AuthContext';
import logo from '../logo.svg';
export default function Users() {
    // Add Department Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // User Context
    const {users,dispatch} = useContext(UserContext);
    const {user} = useContext(AuthContext);
    // fetch all users
    // useEffect(() => {
    //     fetch("http://localhost:5000/api/users")
    //     .then((res) => res.json())
    //     .then((data) => {
    //         dispatch({type:"GET_USERS",payload:data});
    //     });
    // }, []);
    // states
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // fetch API to create a new department
        fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                password,
                role
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // add the new department to the context
            dispatch({type: 'ADD_USER', payload: data});
            // close the modal
            handleClose();
            // refresh the page
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    // delete user
    const deleteUser = (id) => {
        fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // delete the department from the context
            dispatch({type: 'DELETE_USER', payload: id});
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }
    // update user
    const updateUser = (id) => {
        fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                password,
                role
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // update the department in the context
            dispatch({type: 'UPDATE_USER', payload: data});
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    return (
    <Container className="p-4">
        <Row className="flex-column">
            <Col xs={12} className="p-2 rounded" style={{backgroundColor: "#e3edf9"}}>
            <Button variant="primary" style={{backgroundColor:"#121c3e"}} className="rounded border-0"  onClick={handleShow}><BuildingAdd/> Add User</Button>
            </Col>
        </Row>
        <Row className="g-2 flex-column bg-white rounded p-3">
            <Col xs={12} className="p-2 rounded" style={{backgroundColor: "#e3edf9"}}>
                <Row className="align-items-center">
                <Col xs={3} md={3}>
                    <p className="mb-0">John Doe</p>
                </Col>
                <Col xs={3} md={3}>
                    <p className="mb-0">John Doe</p>
                </Col>
                
                <Col xs={6} md={6} className="d-flex justify-content-end align-items-center gap-2" >
                    <Button variant="primary" style={{backgroundColor:"#121c3e"}} className="rounded border-0"><PencilSquare/></Button>
                    <Button variant="primary" style={{backgroundColor:"#121c3e"}} className="rounded border-0"><Trash3/></Button>
                </Col>
                </Row>
            </Col>
            <Col xs={12} className="p-2 rounded" style={{backgroundColor: "#e3edf9"}}>
                <Row className="align-items-center">
                <Col xs={3} md={3}>
                    <p className="mb-0">John Doe</p>
                </Col>
                <Col xs={3} md={3}>
                    <p className="mb-0">John Doe</p>
                </Col>
                
                <Col xs={6} md={6} className="d-flex justify-content-end align-items-center gap-2" >
                    <Button variant="primary" style={{backgroundColor:"#121c3e"}} className="rounded border-0"><PencilSquare/></Button>
                    <Button variant="primary" style={{backgroundColor:"#121c3e"}} className="rounded border-0"><Trash3/></Button>
                </Col>
                </Row>
            </Col>

        </Row>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{backgroundColor:"#121c3e"}} className="border-0">
          <Modal.Title className="text-center text-white">Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"#121c3e"}} className="border-0 text-white">
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Username</Form.Label>
                <Form.Control type="name" placeholder="Ex: HR" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" placeholder="Ex: HR" />
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center" style={{backgroundColor:"#121c3e"}} >
          <Button variant="secondary" style={{backgroundColor:"#ffc20e"}} className="border-0 text-black"  onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" style={{backgroundColor:"#ffc20e"}} className="border-0 text-black" onClick={handleClose}>
            Add Department
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    );
    }
import React from "react";
import {Row,Col,Modal, Container, Button,Form} from 'react-bootstrap';
import { Trash3,EyeFill,BoxArrowLeft,PencilSquare,BuildingAdd } from 'react-bootstrap-icons';
import { useState,useContext,useEffect } from 'react';
import { DepartmentContext } from '../Contexts/DepartmentContext';
import logo from '../logo.svg';
export default function Departments() {
    const api = process.env.REACT_APP_API_URL;
    // Add Department Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // states
    const [name, setName] = useState('');
    // context
    const {departments,dispatch} = useContext(DepartmentContext);
    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // fetch API to create a new department
        fetch(  `${api}/department`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // add the new department to the context
            dispatch({type: 'ADD_DEPARTMENT', payload: data});
            // close the modal
            handleClose();
            // refresh the page
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    // fetch API to get all departments
    useEffect(() => {
        fetch(`${api}/department`)
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // add the departments to the context
            dispatch({type: 'GET_DEPARTMENTS', payload: data});
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);
    // delete department
    const deleteDepartment = (id) => {
        fetch(`${api}/department/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            // remove the department from the context
            dispatch({type: 'DELETE_DEPARTMENT', payload: id});
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    // update department
    const updateDepartment = (id) => {
        fetch(`${api}/department/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // update the department in the context
            dispatch({type: 'UPDATE_DEPARTMENT', payload: data});
            // close the modal
            handleClose();
            // refresh the page
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    return (
    <Container className="p-4">
        <Row className="flex-column">
            <Col xs={12} className="p-2 rounded" style={{backgroundColor: "#e3edf9"}}>
            <Button variant="primary" style={{backgroundColor:"#121c3e"}} className="rounded border-0"  onClick={handleShow}><BuildingAdd/> Add Department</Button>
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
                    <Button variant="primary" style={{backgroundColor:"#121c3e"}} className="rounded border-0"><EyeFill/></Button>
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
                    <Button variant="primary"  style={{backgroundColor:"#121c3e"}} className="rounded border-0"><BoxArrowLeft/></Button>
                    <Button variant="primary"  style={{backgroundColor:"#121c3e"}} className="rounded border-0"><BoxArrowLeft/></Button>
                    <Button variant="primary"  style={{backgroundColor:"#121c3e"}} className="rounded border-0"><BoxArrowLeft/></Button>
                </Col>
                </Row>
            </Col>
        </Row>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{backgroundColor:"#121c3e"}} className="border-0">
          <Modal.Title className="text-center text-white">Add New Department</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"#121c3e"}} className="border-0 text-white">
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Department Name</Form.Label>
                <Form.Control type="name" placeholder="Ex: HR" />
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
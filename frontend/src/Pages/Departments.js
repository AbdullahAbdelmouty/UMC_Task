import React from "react";
import {Row,Col,Modal, Container, Button,Form} from 'react-bootstrap';
import { Trash3,EyeFill,BoxArrowLeft,PencilSquare,BuildingAdd } from 'react-bootstrap-icons';
import { useState,useContext,useEffect } from 'react';
import { DepartmentContext } from '../Contexts/DepartmentContext';
import { AuthContext } from '../Contexts/AuthContext';
// router reloads the page
import logo from '../logo.svg';
export default function Departments() {
    const api = `${process.env.REACT_APP_BACKEND_URL}/api/v1`;
    // Add Department Modal
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleShow = () => setShow(true);
    const handleShow2 = () => setShow2(true);
    const [id, setId] = useState('');
    // states
    const [name, setName] = useState('');
    const [name2, setName2] = useState('');
    // context
    const {departments,dispatch} = useContext(DepartmentContext);
    console.log(departments,"departments in department");
    
    const {user} = useContext(AuthContext);
    // handle form submission
    const getDepartments = async () => {
        fetch(`${api}/department`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                withCredentials: true,
            }
            )
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // add the departments to the context
                dispatch({type: 'GET_DEPARTMENTS', payload: data.departments});
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // fetch API to create a new department
        fetch(  `${api}/department`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            withCredentials: true,
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
            getDepartments();

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    // fetch API to get all departments
    useEffect(() => {
        fetch(`${api}/department`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            withCredentials: true,
        }
        )
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // add the departments to the context
            dispatch({type: 'GET_DEPARTMENTS', payload: data.departments});
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);
    // delete department
    const deleteDepartment = (id) => {
        fetch(`${api}/department/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user.token}`
            },
            withCredentials: true,
        })
        .then(() => {
            // remove the department from the context
            dispatch({type: 'DELETE_DEPARTMENT', payload: id});
            getDepartments();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    // update department
    const updateDepartment = (id) => {
        fetch(`${api}/department/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user.token}`
            },
            withCredentials: true,
            body: JSON.stringify({
                name:name2
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // update the department in the context
            dispatch({type: 'UPDATE_DEPARTMENT', payload: data});
            // close the modal
            handleClose2();
            // refresh the page
            getDepartments();
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
            {departments&& departments.map((department) => (
                <Col xs={12} key={department.Id} className="p-2 rounded" style={{backgroundColor: "#e3edf9"}}>
                <Row className="d-flex justify-content-between">
                    <Col xs={6} className="d-flex align-items-center">
                        <img src={logo} alt="logo" className="rounded-circle" style={{width: "50px", height: "50px"}}/>
                        <h5 className="m-0 ms-3">{department.Name}</h5>
                    </Col>
                    <Col xs={6} className="d-flex justify-content-end">
                        <Button variant="primary" style={{backgroundColor:"#121c3e"}} className="rounded border-0 me-2" onClick={()=>{setShow2(true);setId(department.Id)}}><PencilSquare/></Button>
                        <Button variant="primary" style={{backgroundColor:"#121c3e"}} className="rounded border-0" onClick={() => deleteDepartment(department.Id)}><Trash3/></Button>
                    </Col>
                </Row>
                </Col>
            ))}
        </Row>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{backgroundColor:"#121c3e"}} className="border-0">
          <Modal.Title className="text-center text-white">Add New Department</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"#121c3e"}} className="border-0 text-white">
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Department Name</Form.Label>
                <Form.Control type="name" placeholder="Ex: HR" onChange={(e)=>{setName(e.target.value)}} value={name}/>
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center" style={{backgroundColor:"#121c3e"}} >
          <Button variant="secondary" style={{backgroundColor:"#ffc20e"}} className="border-0 text-black"  onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" style={{backgroundColor:"#ffc20e"}} className="border-0 text-black" type="submit" onClick={handleSubmit}>
            Update Department
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton style={{backgroundColor:"#121c3e"}} className="border-0">
          <Modal.Title className="text-center text-white">Update Department</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"#121c3e"}} className="border-0 text-white">
            <Form onSubmit={()=>updateDepartment(id)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Department Name</Form.Label>
                <Form.Control type="name" placeholder="Ex: HR" onChange={(e)=>{setName2(e.target.value)}} value={name2}/>
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center" style={{backgroundColor:"#121c3e"}} >
          <Button variant="secondary" style={{backgroundColor:"#ffc20e"}} className="border-0 text-black"  onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" style={{backgroundColor:"#ffc20e"}} className="border-0 text-black" type="submit" onClick={()=>updateDepartment(id)}>
          Update Department
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    );
    }
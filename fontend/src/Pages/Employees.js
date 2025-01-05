import React from "react";
import {Row,Col,Image, Container, Button, Form,Modal} from 'react-bootstrap';
import { Trash3,EyeFill,BoxArrowLeft,PencilSquare,PersonAdd } from 'react-bootstrap-icons';
import { useState ,useContext,useEffect} from 'react';
import { EmployeeContext } from '../Contexts/EmployeeContext';
import logo from '../logo.svg';
export default function Sidebar() {
    // Add Employee Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // form data
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');
    const [hireDate, setHireDate] = useState('');
    // context
    const {employees,dispatch} = useContext(EmployeeContext);
    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // fetch API to create a new employee
        fetch('http://localhost:5000/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                department,
                salary,
                hireDate
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // add the new employee to the context
            dispatch({type: 'ADD_EMPLOYEE', payload: data});
            // close the modal
            handleClose();
            // refresh the page
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    // fetch API to get all employees
    useEffect(() => {
        fetch('http://localhost:5000/employees')
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // add the employees to the context
            dispatch({type: 'GET_EMPLOYEES', payload: data});
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);
    // delete employee
    const handleDelete = (id) => {
        // fetch API to delete an employee
        fetch(`http://localhost:5000/employees/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // delete the employee from the context
            dispatch({type: 'DELETE_EMPLOYEE', payload: id});
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    // edit employee
    const handleEdit = (employee) => {
        // fetch API to edit an employee
        fetch(`http://localhost:5000/employees/${employee._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // edit the employee in the context
            dispatch({type: 'EDIT_EMPLOYEE', payload: data});
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
return (
    <Container className="p-4">
        <Row className="flex-column">
            <Col xs={12} className="p-2 rounded" style={{backgroundColor: "#e3edf9"}}>
            <Button variant="primary" style={{backgroundColor:"#121c3e"}} className="rounded border-0"  onClick={handleShow}><PersonAdd/> Add Department</Button>
            </Col>
        </Row>
        <Row className="g-2 flex-column bg-white rounded p-3">
        <Col className="p-2 rounded" style={{backgroundColor: "#e3edf9"}}>
                <Row className="align-items-center">
                <Col xs={3} md={2} >
                    <Image src={logo} width={90} roundedCircle />
                </Col>
                <Col xs={3} md={2}>
                    <p className="mb-0">John Doe</p>
                    <p className="mb-0 d-block d-lg-none">Position</p>
                </Col>
                <Col xs={3} md={2} className="d-none d-lg-block">
                    <p className="mb-0">Position</p>
                </Col>
                <Col xs={3} md={2} className="d-none d-md-block">
                    <p className="mb-0">Sales</p>
                </Col>
                <Col xs={3} md={2} className="d-none d-md-block">
                    <p className="mb-0">1/1/2010</p>
                </Col>
                <Col xs={6} md={2} className="d-flex justify-content-center align-items-center gap-2" >
                    <Button variant="primary" style={{backgroundColor:"#121c3e"}} className="rounded border-0"><EyeFill/></Button>
                    <Button variant="primary" style={{backgroundColor:"#121c3e"}} className="rounded border-0"><PencilSquare/></Button>
                    <Button variant="primary" style={{backgroundColor:"#121c3e"}} className="rounded border-0"><Trash3/></Button>
                </Col>
                </Row>
            </Col>
        </Row>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{backgroundColor:"#121c3e"}} className="border-0">
            <Modal.Title className="text-center text-white">Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"#121c3e"}} className="border-0 text-white">
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Employee First Name</Form.Label>
                <Form.Control type="name" placeholder="Ex: Abdullah" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Employee Last Name</Form.Label>
                <Form.Control type="name" placeholder="Ex: Abdelmouty" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Employee Email</Form.Label>
                <Form.Control type="email" placeholder="Ex: abdullahabdelmouty@gmail.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Employee Department</Form.Label>
                <Form.Control type="name" placeholder="Ex: HR" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Employee Salary</Form.Label>
                <Form.Control type="name" placeholder="Ex: 25000" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Employee Hire Date</Form.Label>
                <Form.Control type="name" placeholder="Ex: 1/2/2025" />
            </Form.Group>

            </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center" style={{backgroundColor:"#121c3e"}} >
            <Button variant="secondary" style={{backgroundColor:"#ffc20e"}} className="border-0 text-black"  onClick={handleClose}>
            Close
            </Button>
            <Button variant="primary" style={{backgroundColor:"#ffc20e"}} className="border-0 text-black" onClick={handleClose}>
            Add Employee
            </Button>
        </Modal.Footer>
        </Modal>
    </Container>
);
}
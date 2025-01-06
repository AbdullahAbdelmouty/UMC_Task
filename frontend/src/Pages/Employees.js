import React from "react";
import {Row,Col,Image, Container, Button, Form,Modal} from 'react-bootstrap';
import { Trash3,EyeFill,BoxArrowLeft,PencilSquare,PersonAdd } from 'react-bootstrap-icons';
import { useState ,useContext,useEffect} from 'react';
import { EmployeeContext } from '../Contexts/EmployeeContext';
import { AuthContext } from '../Contexts/AuthContext';
import logo from '../logo.svg';
export default function Sidebar() {
    const api = `${process.env.REACT_APP_BACKEND_URL}/api/v1`;
    // Add Employee Modal
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleShow = () => setShow(true);
    const handleShow2 = () => setShow2(true);
    // form data
    const [firstName, setFirstName] = useState('');
    const [firstName2, setFirstName2] = useState('');
    const [lastName, setLastName] = useState('');
    const [lastName2, setLastName2] = useState('');
    const [email, setEmail] = useState('');
    const [email2, setEmail2] = useState('');
    const [department, setDepartment] = useState('');
    const [department2, setDepartment2] = useState('');
    const [salary, setSalary] = useState('');
    const [salary2, setSalary2] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [hireDate2, setHireDate2] = useState('');
    // context
    const {employees,dispatch} = useContext(EmployeeContext);
    const {user} = useContext(AuthContext);
    const [id, setId] = useState('');
    const [id2, setId2] = useState('');

    const getEmployees = async () => {
        fetch(`${api}/employee`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                withCredentials: true,
            }
            )
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // add the employees to the context
                dispatch({type: 'GET_EMPLOYEES', payload: data.employees});
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // fetch API to create a new employee
        fetch(`${api}/employee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            withCredentials: true,
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                departmentId:department,
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
    
            getEmployees();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    // fetch API to get all employees
    useEffect(() => {
        fetch(`${api}/employee`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user.token}`
            },
            withCredentials: true,
        }
        )
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // add the employees to the context
            dispatch({type: 'GET_EMPLOYEES', payload: data.employees});
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);
    // delete employee
    const handleDelete = (id) => {
        // fetch API to delete an employee
        fetch(`${api}/employee/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            },
            withCredentials: true,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // delete the employee from the context
            dispatch({type: 'DELETE_EMPLOYEE', payload: id});
            getEmployees();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    // edit employee
    const handleEdit = (id) => {
        // fetch API to edit an employee
        fetch(`${api}/employee/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            withCredentials: true,
            body: JSON.stringify({
                firstName:firstName2,
                lastName:lastName2,
                email:email2,
                departmentId:department2,
                salary:salary2,
                hireDate:hireDate2
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // add the new employee to the context
            dispatch({type: 'ADD_EMPLOYEE', payload: data});
            // close the modal
            handleClose2();
            getEmployees();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    const convertDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    };
return (
    <Container className="p-4">
        <Row className="flex-column">
            <Col xs={12} className="p-2 rounded" style={{backgroundColor: "#e3edf9"}}>
            <Button variant="primary" style={{backgroundColor:"#121c3e"}} className="rounded border-0"  onClick={handleShow}><PersonAdd/> Add Employee</Button>
            </Col>
        </Row>
        <Row className="g-2 flex-column bg-white rounded p-3">
            {employees.map((employee) => (
                <Col className="p-2 rounded" style={{backgroundColor: "#e3edf9"}}>
                <Row className="align-items-center">
                <Col xs={3} md={2} >
                    <Image src={logo} width={90} roundedCircle />
                </Col>
                <Col xs={3} md={2}>
                    <p className="mb-0">{employee.FirstName}</p>
                    <p className="mb-0 d-block d-lg-none">{employee.DepartmentId}</p>
                </Col>
                <Col xs={3} md={2} className="d-none d-md-block">
                    <p className="mb-0">{employee.LastName}</p>
                </Col>
                <Col xs={3} md={2} className="d-none d-lg-block">
                    <p className="mb-0">{employee.DepartmentId}</p>
                </Col>
    
                <Col xs={3} md={2} className="d-none d-md-block">
                    <p className="mb-0">{convertDate(employee.HireDate)}</p>
                </Col>
                <Col xs={6} md={2} className="d-flex justify-content-center align-items-center gap-2" >
                    <Button variant="primary" style={{backgroundColor:"#121c3e"}} className="rounded border-0" onClick={()=>{setShow2(true);setId(employee.Id)}}><PencilSquare/></Button>
                    <Button variant="primary" style={{backgroundColor:"#121c3e"}} className="rounded border-0" onClick={()=>{handleDelete(employee.Id)}}><Trash3/></Button>
                </Col>
                </Row>
                </Col>
            ))}
        </Row>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{backgroundColor:"#121c3e"}} className="border-0">
            <Modal.Title className="text-center text-white">Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"#121c3e"}} className="border-0 text-white">
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Employee First Name</Form.Label>
                <Form.Control type="name" placeholder="Ex: Abdullah" onChange={(e)=>{setFirstName(e.target.value)}} value={firstName} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Employee Last Name</Form.Label>
                <Form.Control type="name" placeholder="Ex: Abdelmouty"  onChange={(e)=>{setLastName(e.target.value)}} value={lastName}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Employee Email</Form.Label>
                <Form.Control type="email" placeholder="Ex: abdullahabdelmouty@gmail.com"  onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Employee Department</Form.Label>
                <Form.Control type="name" placeholder="Ex: HR"  onChange={(e)=>{setDepartment(e.target.value)}} value={department} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Employee Salary</Form.Label>
                <Form.Control type="name" placeholder="Ex: 25000"  onChange={(e)=>{setSalary(e.target.value)}} value={salary} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Employee Hire Date</Form.Label>
                <Form.Control type="date" placeholder="Ex: 1/2/2025"  onChange={(e)=>{setHireDate(e.target.value)}} value={hireDate} />
            </Form.Group>

            </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center" style={{backgroundColor:"#121c3e"}} >
            <Button variant="secondary" style={{backgroundColor:"#ffc20e"}} className="border-0 text-black"  onClick={handleClose}>
            Close
            </Button>
            <Button variant="primary" style={{backgroundColor:"#ffc20e"}} className="border-0 text-black" type="submit" onClick={handleSubmit}>
            Add Employee
            </Button>
        </Modal.Footer>
        </Modal>
        <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton style={{backgroundColor:"#121c3e"}} className="border-0">
            <Modal.Title className="text-center text-white">Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"#121c3e"}} className="border-0 text-white">
            <Form onSubmit={()=>handleEdit(id)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Employee First Name</Form.Label>
                <Form.Control type="name" placeholder="Ex: Abdullah" onChange={(e)=>{setFirstName2(e.target.value)}} value={firstName2} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Employee Last Name</Form.Label>
                <Form.Control type="name" placeholder="Ex: Abdelmouty"  onChange={(e)=>{setLastName2(e.target.value)}} value={lastName2}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Employee Email</Form.Label>
                <Form.Control type="email" placeholder="Ex: abdullahabdelmouty@gmail.com"  onChange={(e)=>{setEmail2(e.target.value)}} value={email2}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Employee Department</Form.Label>
                <Form.Control type="name" placeholder="Ex: HR"  onChange={(e)=>{setDepartment2(e.target.value)}} value={department2} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Employee Salary</Form.Label>
                <Form.Control type="name" placeholder="Ex: 25000"  onChange={(e)=>{setSalary2(e.target.value)}} value={salary2} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Employee Hire Date</Form.Label>
                <Form.Control type="date" placeholder="Ex: 1/2/2025"  onChange={(e)=>{setHireDate2(e.target.value)}} value={hireDate2} />
            </Form.Group>

            </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center" style={{backgroundColor:"#121c3e"}} >
            <Button variant="secondary" style={{backgroundColor:"#ffc20e"}} className="border-0 text-black"  onClick={handleClose2}>
            Close
            </Button>
            <Button variant="primary" style={{backgroundColor:"#ffc20e"}} className="border-0 text-black" type="submit" onClick={()=>handleEdit(id)}>
            Update Employee
            </Button>
        </Modal.Footer>
        </Modal>
    </Container>
);
}
import React from "react";
import { Container ,Row,Col, Card,Button} from "react-bootstrap";
import { GridFill,People,Boxes,BoxArrowLeft } from 'react-bootstrap-icons';
import { DepartmentContext } from '../Contexts/DepartmentContext';
import { useContext } from "react";

export default function Overview() {
    return (
        <Container className="p-4">
            <h3 className="fs-4  mb-3">Overview</h3>
            <Row className="g-4 mb-4" >
                <Col xs={6} md={3} >
                <Button variant="primary" className="p-3 d-flex bg-white text-black border-0 justify-content-between align-items-center">
                    <Boxes size={30} className="me-2"/>
                    <p className="me-2 mb-0">Departments</p>
                    <span className="badge bg-light text-dark">2</span>
                </Button>
                </Col>
                <Col xs={6} md={3} >
                <Button variant="primary" className="p-3 d-flex bg-white text-black border-0 justify-content-between align-items-center">
                    <Boxes size={30} className="me-2"/>
                    <p className="me-2 mb-0">Departments</p>
                    <span className="badge bg-light text-dark">2</span>
                </Button>
                </Col>
                <Col xs={6} md={3} >
                <Button variant="primary" className="p-3 d-flex bg-white text-black border-0 justify-content-between align-items-center">
                    <Boxes size={30} className="me-2"/>
                    <p className="me-2 mb-0">Departments</p>
                    <span className="badge bg-light text-dark">2</span>
                </Button>
                </Col>
            </Row>
            <h3 className="fs-4  mb-3">Department distribution</h3>
            <Row className="g-4 mb-4" >
                <Col xs={6} md={3} >
                <Button variant="primary" className="p-3 d-flex bg-white text-black border-0 justify-content-between align-items-center">
                    <Boxes size={30} className="me-2"/>
                    <p className="me-2 mb-0">Departments</p>
                    <span className="badge bg-light text-dark">2</span>
                </Button>
                </Col>
                <Col xs={6} md={3} >
  
                </Col>
            </Row>
            <h3 className="fs-4  mb-3">Recent Hires</h3>
            <Row>
                <Col>
                <Card>
                    <Card.Body>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Date of hire</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>John Doe</td>
                                        <td>Software Engineer</td>
                                        <td>12/12/2021</td>
                                    </tr>
                                    <tr>
                                        <td>Jane Doe</td>
                                        <td>HR</td>
                                        <td>12/12/2021</td>
                                    </tr>
                                </tbody>
                            </table>
                    </Card.Body>
                </Card>
                </Col>

            </Row>
        </Container>
    );
    }
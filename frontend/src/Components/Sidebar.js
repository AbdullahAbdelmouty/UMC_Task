import React from "react";
import {Row,Col,Image, Container, Button} from 'react-bootstrap';
import { GridFill,People,Boxes,BoxArrowLeft,PeopleFill } from 'react-bootstrap-icons';
import logo from '../logo.svg';
import { Link } from "react-router-dom";
export default function Sidebar() {
    return (
        <Container className="p-3" style={{borderRight: "1px solid #e0e0e0",backgroundColor:"#121c3e",minHeight:"100vh"}} >
        <Row className="mb-4 mt-3 justify-content-center align-items-center rounded p-2 border border-2 border-white">   
            <Col xs={5} className="pe-0">
            <Image src={logo} rounded />
            </Col>
            <Col xs={5} className="ps-0">
              <h2 className="fs-6 text-white m-0">Abdullah</h2>
                <p className="fs-6 m-0 text-white">Software</p>
            </Col>
        </Row>
        <div className="list-group">
            <Row className="g-2 flex-column">
                <Col>
                    <Button variant="primary" className="list-group-item list-group-item-action rounded">
                        <Link to="/" className="text-white text-decoration-none">
                        <span><GridFill/></span> Overview
                        </Link>
                    </Button>
                </Col>
                <Col>
                    <Button variant="primary" className="list-group-item list-group-item-action rounded">
                        <Link to="/employees" className="text-white text-decoration-none">
                        <span><People/></span> Employees
                        </Link>
                    </Button>
                </Col>
                <Col>
                    <Button variant="primary" className="list-group-item list-group-item-action rounded">
                        <Link to="/departments" className="text-white text-decoration-none">
                        <span><Boxes/></span> Departments
                        </Link>
                    </Button>
                </Col>
                {/* <Col>
                    <Button variant="primary" className="list-group-item list-group-item-action rounded">
                        <Link to="/users" className="text-white text-decoration-none">
                        <span><PeopleFill/></span> Users
                        </Link>
                    </Button>
                </Col> */}
                <Col>
                    <Button variant="primary" className="list-group-item list-group-item-action rounded"><span><BoxArrowLeft/></span> Logout</Button>
                </Col>
            </Row>
        </div>
        </Container>
    );
    }
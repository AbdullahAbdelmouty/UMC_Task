import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Sidebar from './Sidebar';

function OffcanvasExample() {
  return (
    <>
        <Navbar expand="xxl" className="mb-3" style={{backgroundColor:"#121c3e !important"}}> 
          <Container fluid>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xxl`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-xxl`}
              aria-labelledby={`offcanvasNavbarLabel-expand-xxl`}
              placement="start"
            >
              <Offcanvas.Header closeButton style={{backgroundColor:"#121c3e"}}>
      
              </Offcanvas.Header>
              <Offcanvas.Body className='p-0' >
                <Sidebar/>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}

export default OffcanvasExample;
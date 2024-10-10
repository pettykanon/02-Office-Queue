import { Container, Row, Col, Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import './NextCustomer.css';

function NextCustomer() {
  return (<>
    <Navbar className='bg-d custom-navbar'>
      <Container>
        <Navbar.Text className='navbar-text-custom' >
          COUNTER 1
        </Navbar.Text>
      </Container>
    </Navbar>
    <Container fluid className='mt-4'>
      <Row>
        <Col md={5}>
          <div className='rect-left bg-d mx-5 my-5'>
            <h3 className='rect-title'>Services provided:</h3>
            <ol className="list-custom">
              <li>Shipping</li>
              <li>Payments</li>
              <li>Payments</li>
              <li>Payments</li>
              <li>Payments</li>
              <li>Payments</li>
              <li>Payments</li>
              <li>Payments</li>
              <li>Payments</li>
              <li>Payments</li>
              <li>Payments</li>
              <li>Payments</li>
              <li>Payments</li>
              <li>Payments</li>
              <li>Payments</li>

            </ol>
          </div>
        </Col>
        <Col md={7}>
            <div className="rect-right bg-green mx-5 my-5">
              <p className="serving-text">Serving Client:</p>
              <p className='serving-client'>B18</p>
            </div>
            <div className="button">
            <Button className="call-next-btn mt-3">Call Next</Button>
            </div>
        </Col>
  </Row >
    </Container >
  </>)
}

export { NextCustomer }
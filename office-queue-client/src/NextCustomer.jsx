import { Container, Row, Col, Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ChooseCounter() {
  const counters = ["Counter 1", "Counter 2", "Counter 3", "Counter 4"];

  return (
      <>
          <Navbar className='bg-d custom-navbar'>
              <Container>
                  <Navbar.Text className='navbar-text-custom c-w'>
                      CHOOSE A COUNTER
                  </Navbar.Text>  
              </Container>
          </Navbar>
          <Container fluid>
              <div className="service-container">
                  {counters.map((s) => (
                      <CounterCard s={s} key={s}/>
                  ))}
              </div>
          </Container>
      </>
  );
}

function CounterCard(props) {
  return (
      <div className="service-card">
          <Link to={props.s}>
          <Button className="service-button">
              <Row>
                  <Col className='btn-font-1'>{props.s}</Col>
              </Row>
          </Button>
          </Link>
      </div>
  );
}

function NextCustomer() {
  const params = useParams()

  //Get service provided of counter#
  const serviceprovided = ['Shipping','Payments','other']

  //Get current customer served
  const customerserved = 'C18'

  return (<>
    <Navbar className='bg-d custom-navbar'>
      <Container>
        <Navbar.Brand>
            <Link to='/nextcustomer'><Button className='back-btn'><i class="bi bi-arrow-left-circle" style={{fontSize:"50px"}}></i></Button></Link>
         </Navbar.Brand>
        <Navbar.Text className='navbar-text-custom' >
          {params.counter}
        </Navbar.Text>
      </Container>
    </Navbar>
    <Container fluid className='mt-4'>
      <Row>
        <Col md={5}>
          <div className='rect-left bg-d mx-5 my-5'>
            <h3 className='rect-title'>Services provided:</h3>
            <ol className="list-custom">
              {serviceprovided.map((e)=><li className='my-2'>{e}</li>)}
            </ol>
          </div>
        </Col>
        <Col md={7}>
            <div className="rect-right bg-green mx-5 my-5">
              <p className="serving-text">Serving Client:</p>
              <p className='serving-client'>{customerserved}</p>
            </div>
            <div className="button">
            <Button className="call-next-btn mt-3">Call Next</Button>
            </div>
        </Col>
  </Row >
    </Container >
  </>)
}

export { ChooseCounter, NextCustomer }
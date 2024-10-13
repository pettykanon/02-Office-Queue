import { Container, Row, Col, Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import API from './API/API.mjs';

function ChooseCounter() {
  
  const [counters, setCounters] = useState([])

  // get all counters
  useEffect(()=>{
    const getCounters = async() =>{
        try{
            const c = await API.getCounters();
            setCounters(c)
        }
        catch(err){
            console.log(err);
        }
    }
    getCounters();
},[])

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
  const [servicesProvided, setServicesProvided] = useState()
  const [currentTicket, setCurrentTicket] = useState(0)

  //Get service provided of counter#

  useEffect(()=>{
    const getServicesCounters = async() =>{
        try{
            const serv = await API.getServicesCounter(params.counter);
            setServicesProvided(serv)
        }
        catch(err){
            console.log(err);
        }
    }
    getServicesCounters();
  },[])

  //Get next ticket served

  const handleNextClient = async () =>{
      try{
        const ct = API.nextCustomer(params.counter,currentTicket)
        setCurrentTicket(ct)
      }catch{
        console.log(err);
      }
  }

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
              {servicesProvided.map((e)=><li className='my-2'>{e}</li>)}
            </ol>
          </div>
        </Col>
        <Col md={7}>
            <div className="rect-right bg-green mx-5 my-5">
              <p className="serving-text">Serving Client:</p>
              <p className='serving-client'>{currentTicket}</p>
            </div>
            <div className="button">
            <Button className="call-next-btn mt-3" onClick={handleNextClient}>Call Next</Button>
            </div>
        </Col>
  </Row >
    </Container >
  </>)
}

export { ChooseCounter, NextCustomer }
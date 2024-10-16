import { Container, Row, Col, Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useParams, useNavigate } from 'react-router-dom';
import API from './API/API.mjs';

function ChooseCounter() {
  
  const [counters, setCounters] = useState([])

  const navigate = useNavigate()
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

  const handleClickCounter = (s) =>{
    navigate(`${s}`,{relative:"path"})
  }

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
                      <CounterCard s={s} key={s} handleClickCounter={handleClickCounter}/>
                  ))}
              </div>
          </Container>
      </>
  );
}

function CounterCard(props) {
  return (
      <div className="service-card">
            <Button className="service-button" onClick={()=>props.handleClickCounter(props.s)}>
                <Row>
                    <Col className='btn-font-1'>{props.s}</Col>
                </Row>
            </Button>
      </div>
  );
}

function NextCustomer() {
  const params = useParams()
  const [servicesProvided, setServicesProvided] = useState([])
  const [currentTicket, setCurrentTicket] = useState({code: "--"})

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

  const handleNextClient = async () => {
    try {
      if (currentTicket.code != '--') {
        console.log("Ticket: " + currentTicket.code);
        await API.newHistory(params.counter, currentTicket.code)
      }
      const ct = await API.nextCustomer(params.counter, currentTicket.code)
      console.log(ct);
      setCurrentTicket(ct)
      setTimer(0)
    } catch (err) {
      console.log("Errore QUI: " + err);
    }
  }

  return (<>
    <Navbar className='bg-d custom-navbar'>
      <Container>
        <Navbar.Brand>
            <Link to='/nextcustomer'><Button className='back-btn'><i className="bi bi-arrow-left-circle" style={{fontSize:"50px"}}></i></Button></Link>
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
              {servicesProvided.map((e)=><li className='my-2' key={e}>{e}</li>)}
            </ol>
          </div>
        </Col>
        <Col md={7}>
            <div className="rect-right bg-green mx-5 my-5">
              <p className="serving-text">Serving Client:</p>
              <p className='serving-client'>{currentTicket.code}</p>
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
import { Button, Container} from 'react-bootstrap';
import { Navbar, Row,Col,Modal,Card} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import QRcode from 'react-qr-code'
import API from './API/API.mjs';

function ChooseService() {
    const [services, setServices] = useState([])
    const [selectedService, setSelectedService] = useState(); 
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate()
    //get all services
    useEffect(()=>{
        const getServices = async() =>{
            try{
                const serv = await API.getServices();
                setServices(serv)
                console.log(serv)
            }
            catch(err){
                console.log(err);
            }
        }
        getServices();
    },[])

    const handleServiceClick = (s) =>{
        setSelectedService(s)
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false);
        setSelectedService(null);
    };

    // confirm and record ticket
    const handleConfirm = async () => {
        setShowModal(false);
        setSelectedService(null);
        console.log(selectedService.id)
        const ticket = await API.newTicket(selectedService.id)
        console.log(ticket)
        navigate(`${selectedService.name}/${ticket.id}`,{relative:"path"})
    };
    
    return (
        <>
            <Navbar className='bg-d custom-navbar'>
                <Container>
                    <Navbar.Text className='navbar-text-custom c-w'>
                        CHOOSE A SERVICE
                    </Navbar.Text>  
                </Container>
            </Navbar>
            <Container fluid>
                <div className="service-container">
                    {services.map((s) => (
                        <ServiceCard s={s} key={s.id} handleServiceClick={handleServiceClick}/>
                    ))}
                </div>
            </Container>

            <Modal show={showModal} onHide={handleClose} centered dialogClassName="custom-modal">
                <Modal.Body className='btn-font-1 text-center py-5 bg-d'>
                    <Modal.Title className='btn-font-4'>You chose:</Modal.Title>
                    <p>{selectedService? selectedService.name : ""}</p>
                    <Row>
                        <Col>
                            <Button className='btn-font-3 custom-btn-canc' onClick={handleClose}>
                                Cancel
                            </Button>
                        </Col>
                        <Col>
                            <Button className='btn-font-2 custom-btn-confirm' onClick={handleConfirm}>
                                Get the Ticket
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}

function ServiceCard(props) {
    
    return (
        <div className="service-card">
            <Button className="service-button" onClick={()=>props.handleServiceClick(props.s)}>
                <Row>
                    <Col className='btn-font-1'>{props.s.name}</Col>
                </Row>
                <Row>
                    <Col className='btn-font-2'>This is a service</Col>
                </Row>
            </Button>
        </div>
    );
}

function YourTicket() {

    const [code, setCode] = useState({code:"--"})
    const params = useParams()

    //get ticket value
    useEffect(()=>{

        const getTicket = async() =>{
            try{
                console.log(params.id)
                const c = await API.getTicket(params.id)
                setCode(c)
                console.log(c)
            }
            catch(err){
                console.log(err);
            }
        }
        getTicket();
    },[])

    return(
        <>
    <Navbar className='bg-d custom-navbar'>
        <Container>
            <Navbar.Text className='navbar-text-custom c-w'>
                YOUR TICKET
            </Navbar.Text>  
        </Container>
    </Navbar>

    <Card className='bg-transparent border-0'>
        <Card.Body className='custom-ticket my-3'>
            <Row>
                <Col className='p-2 m-3 bg-white rounded'>
                <QRcode value={`Your ticket code: ${code.code} \nEstimated Waiting Time: ${code.estimatedWaitingTime} m`} className='m-3'></QRcode>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='btn-font-4'>{`Your ticket code: ${code.code}`}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='btn-font-4'>{`Estimated Waiting Time: ${code.estimatedWaitingTime} m`}</p>
                </Col>
            </Row>
            <Row className='w-100 my-2'>

                <Link to='/getticket'><Button className='btn-font-5 custom-btn-confirm w-100 py-3'>
                    Done
                </Button></Link>
           
            </Row>
    </Card.Body>
    </Card>
    
    </>
    )
}

export {ChooseService, YourTicket}
import { Button, Container} from 'react-bootstrap';
import { Navbar, Row,Col,Modal} from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function ChooseService() {
    const services = ["servizio 1", "servizio 2", "servizio 3", "servizio 4"];

    const [selectedService, setSelectedService] = useState(); 
    const [showModal, setShowModal] = useState(false);

    const handleServiceClick = (s) =>{
        setSelectedService(s)
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false);
        setSelectedService(null);
    };

    const handleConfirm = () => {
        setShowModal(false);
        setSelectedService(null);
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
                        <ServiceCard s={s} key={s} handleServiceClick={handleServiceClick}/>
                    ))}
                </div>
            </Container>

            <Modal show={showModal} onHide={handleClose} centered dialogClassName="custom-modal">
                <Modal.Body className='btn-font-1 text-center py-5 bg-d'>
                    <Modal.Title className='btn-font-4'>You chose:</Modal.Title>
                    <p>{selectedService}</p>
                    <Row>
                        <Col>
                            <Button className='btn-font-3 custom-btn-canc' onClick={handleClose}>
                                Cancel
                            </Button>
                        </Col>
                        <Col>
                            <Link to={selectedService}><Button className='btn-font-2 custom-btn-confirm' onClick={handleConfirm}>
                                Get the Ticket
                            </Button></Link>
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
                    <Col className='btn-font-1'>{props.s}</Col>
                </Row>
                <Row>
                    <Col className='btn-font-2'>Questo è un servizio</Col>
                </Row>
            </Button>
        </div>
    );
}

function YourTicket() {
    return(
        <>
    <Navbar className='bg-d custom-navbar'>
        <Container>
            <Navbar.Text className='navbar-text-custom c-w'>
                YOUR TICKET
            </Navbar.Text>  
        </Container>
    </Navbar>

    
    </>
    )
}

export {ChooseService, YourTicket}
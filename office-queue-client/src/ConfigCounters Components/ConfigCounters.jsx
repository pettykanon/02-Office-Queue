import { Button, Container } from 'react-bootstrap';
import { Navbar, Row, Col, Modal, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import API from '../API/API.mjs';

function ConfigCounters() {
    const [selectedService, setSelectedService] = useState();

    const navigate = useNavigate()

    const handleServiceClick = (s) => {
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
        navigate(`${selectedService.name}/${ticket.id}`, { relative: "path" })
    };

    return (
        <>
            <div className="d-flex flex-column vw-100 vh-100">
                <Navbar className='bg-d custom-navbar'>
                    <Container>
                        
                        <Navbar.Text className='navbar-text-custom c-w'>
                            CONFIG COUNTERS
                        </Navbar.Text>
                    </Container>
                </Navbar>
                <div className="w-100 h-100 py-5 px-xxl-5">
                    <div className="d-flex flex-row w-100 h-100 justify-content-around">
                        <div
                            className="d-flex flex-column gap-xl-5 rounded-a_lot bg-d h-100 w-25 align-content-center justify-content-center" role="button"
                            onClick={() => {
                                navigate('/settingcounters')
                            }}>
                            <div className="w-100 text-center">
                                <p className="btn-font-1 text-white text-center m-0 p-0">Config</p>
                                <p className="btn-font-1 text-white text-center m-0 p-0">Counters</p>
                            </div>
                            <div className="w-100 text-center">
                                <i className="bi bi-gear icon"></i>
                            </div>
                        </div>
                        <div
                            className="d-flex flex-column gap-xl-5 rounded-a_lot bg-d h-100 w-25 align-content-center justify-content-center" role="button"
                            onClick={() => {
                                navigate('/stats')
                            }}>
                            <div className="w-100 text-center">
                                <p className="btn-font-1 text-white text-center m-0 p-0">See</p>
                                <p className="btn-font-1 text-white text-center m-0 p-0">Stats</p>
                            </div>
                            <div className="w-100 text-center">
                                <i className="bi bi-bar-chart-line icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export { ConfigCounters }
import {Alert, Button, Container, ModalDialog} from 'react-bootstrap';
import {Navbar, Row, Col, Modal, Card} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import API from '../API/API.mjs';
import "../App.css"

function SetUpCounter() {
    const {counterId} = useParams();
    const navigate = useNavigate()

    const [services, setServices] = useState([])

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const switchService = (id) => {
        setServices(services.map((s) => {
            if (s.id === id) {
                s.selected = !s.selected
            }
            return s
        }))
    }

    const sendNewConfiguration = async () => {
        const activeServices = services.filter((service) => service.selected).map((service) => service.id);
        try {
            await API.newCounterConfig(counterId, activeServices);
            setSuccessMessage('Configuration saved successfully');
        } catch (err) {
            setErrorMessage(err);
        }
    }

    useEffect(
        () => {
            const getServicesCounter = async (counterId) => {
                try {
                    const allServices = await API.getServices();
                    const activeServices = await API.getServicesCounterModified(counterId);
                    const services = allServices.map((service) => {
                            return {
                                id: service.id,
                                name: service.name,
                                selected: activeServices.includes(service.id)
                            }
                        }
                    )
                    setServices(services)
                } catch (err) {
                    console.log(err);
                }
            }
            getServicesCounter(counterId);
        }, [counterId]
    )

    useEffect(() => {
        if(errorMessage!=="" || successMessage!=="") {
            setTimeout(() => {
                setErrorMessage('')
                setSuccessMessage('')
            }, 2000)
        }
    }, [errorMessage, successMessage])

    return (
        <>
            <div className="d-flex flex-column vw-100 vh-100">
                <Navbar className='bg-d custom-navbar'>
                    <Container>
                        <Navbar.Text className='navbar-text-custom c-w'>
                            SET UP COUNTER {counterId}
                        </Navbar.Text>
                    </Container>
                </Navbar>
                <div className="w-100 h-100 py-5 px-xxl-5 min-h-0">
                    <div className="d-flex w-100 h-100">
                        <div
                            className="d-flex flex-column justify-content-center align-items-center w-100 h-100 rounded-a_lot bg-d p-8 gap-4">
                            <Modal show={!!errorMessage} dismissible>
                                <Modal.Body style={{ backgroundColor: 'red', color: "white" }}>
                                    {errorMessage}
                                </Modal.Body>
                            </Modal>
                            <Modal show={!!successMessage} dismissible>
                                <Modal.Body style={{ backgroundColor: 'green', color: "white" }}>
                                    {successMessage}
                                </Modal.Body>
                            </Modal>
                            <div className="d-flex flex-row w-50 text-white justify-content-center">
                                <p className="m-0 p-0 text-4xl font-bold">Services Provided</p>
                            </div>
                            <div className="w-1/3 h-4/6 text-white justify-content-center overflow-y-auto">
                                {services.map((service) => (
                                    <ServiceEntry key={service.id} service={service} switchService={switchService}/>
                                ))}
                            </div>
                            <div className="flex flex-row gap-4 h-1/6 w-1/3 text-white justify-content-center px-2">
                                <Button className='btn-font-3 custom-btn-canc' onClick={() => {
                                    navigate("/settingcounters")
                                }}>
                                    Cancel
                                </Button>
                                <Button className='btn-font-2 custom-btn-confirm' onClick={() => {
                                    sendNewConfiguration().then(r => {
                                    })
                                }}>
                                    Done
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function ContainerEntry({name, id}) {
    const navigate = useNavigate()

    return (
        <div className="service-card">
            <Button className="service-button" onClick={() => {
                navigate(`${id}`, {relative: "path"})
            }}>
                <Row>
                    <Col className='btn-font-1 text-white'>{name}</Col>
                </Row>
            </Button>
        </div>
    );
}

function ServiceEntry({service, switchService}) {
    return (
        <div className="flex flex-row justify-content-between align-items-center py-4 px-2">
            <div className="flex flex-row gap-4">
                <p className="m-0 p-0 font-normal text-2xl">{service.id + "."}</p>
                <p className="m-0 p-0 font-normal text-2xl">{service.name}</p>
            </div>
            <input className="m-0 p-0 w-8 h-8" type="checkbox" checked={service.selected} onChange={() => {
                switchService(service.id)
            }}/>
        </div>
    );
}

export {SetUpCounter}
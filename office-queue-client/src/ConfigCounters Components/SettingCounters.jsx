import { Button, Container } from 'react-bootstrap';
import { Navbar, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import API from '../API/API.mjs';

function SettingCounters() {
    const [counters, setCounters] = useState([])

    //get all counters
    useEffect(() => {
        const getCounters = async () => {
            try {
                const counters = await API.getCounters();
                setCounters(counters)
            } catch (err) {
                console.log(err);
            }
        }
        getCounters();
    }, [])

    return (
        <>
            <div className="d-flex flex-column vw-100 vh-100">
                <Navbar className='bg-d custom-navbar'>
                    <Container>
                        <Navbar.Brand>
                            <Link to='/configcounters'><Button className='back-btn'><i className="bi bi-arrow-left-circle"
                                style={{ fontSize: "50px" }}></i></Button></Link>
                        </Navbar.Brand>
                        <Navbar.Text className='navbar-text-custom c-w'>
                            SETTING COUNTERS
                        </Navbar.Text>
                    </Container>
                </Navbar>
                <div className="w-100 h-100 py-5 px-xxl-5">
                    <div className="d-flex flex-row w-100 h-100 justify-content-around">
                        <Container fluid>
                            <div className="service-container">
                                {
                                    counters.map((c) => (
                                        <ContainerEntry name={"Counter " + c} id={c} key={c}></ContainerEntry>
                                    ))
                                }
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
}

function ContainerEntry({ name, id }) {
    const navigate = useNavigate()

    return (
        <div className="service-card">
            <Button className="service-button" onClick={() => {
                navigate(`${id}`, { relative: "path" })
            }}>
                <Row>
                    <Col className='btn-font-1 text-white'>{name}</Col>
                </Row>
            </Button>
        </div>
    );
}

export { SettingCounters }
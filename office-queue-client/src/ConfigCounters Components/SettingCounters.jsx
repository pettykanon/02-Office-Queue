import {Button, Container} from 'react-bootstrap';
import {Navbar, Row, Col, Modal, Card} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import API from '../API/API.mjs';

function SettingCounters() {

    return (
        <>
            <div className="d-flex flex-column vw-100 vh-100">
                <Navbar className='bg-d custom-navbar'>
                    <Container>
                        <Navbar.Text className='navbar-text-custom c-w'>
                            SETTING COUNTERS
                        </Navbar.Text>
                    </Container>
                </Navbar>
                <div className="w-100 h-100 py-5 px-xxl-5">
                    <div className="d-flex flex-row w-100 h-100 justify-content-around">
                        <Container fluid>
                            <div className="service-container">
                                <ContainerEntry name="Counter1" id={1}></ContainerEntry>
                                <ContainerEntry name="Counter2" id={2}></ContainerEntry>
                                <ContainerEntry name="Counter3" id={3}></ContainerEntry>
                                <ContainerEntry name="Counter4" id={4}></ContainerEntry>
                            </div>
                        </Container>
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

export {SettingCounters}
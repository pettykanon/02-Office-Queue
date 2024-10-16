import { Container, Row, Col, Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import API from './API/API.mjs';

function SeeStats() {

    const [selectedFilter, setSelectedFilter] = useState("");
    const [selectedOption, setSelectedOption] = useState("");  // Nuovo stato per l'opzione selezionata

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleClear = () => {
        // Azzera filtri e opzioni
        setSelectedFilter("");
        setSelectedOption("");
        console.log("Filters cleared");
    };

    const handleApply = () => {
        // Applica i filtri
        console.log("Filters applied:", selectedFilter, selectedOption);
    };

    return (<>
        <Navbar className='bg-d custom-navbar'>
            <Container>
                <Navbar.Brand>
                    <Link to='/nextcustomer'><Button className='back-btn'><i className="bi bi-arrow-left-circle" style={{ fontSize: "50px" }}></i></Button></Link>
                </Navbar.Brand>
                <Navbar.Text className='navbar-text-custom' >
                </Navbar.Text>
            </Container>
        </Navbar>
        <Container fluid className='mt-4'>
            <Row>
                <Col md={5}>
                    <div className='rect-left bg-d mx-5 my-5'>
                        <h3 className='rect-title'>FILTERS</h3>
                        <div className="filter-container">
                            <div
                                className={`filter-item ${selectedFilter === "day" ? "active" : ""}`}
                                onClick={() => handleFilterClick("day")}
                            >
                                Day
                            </div>
                            <div
                                className={`filter-week ${selectedFilter === "week" ? "active" : ""}`}
                                onClick={() => handleFilterClick("week")}
                            >
                                Week
                            </div>
                            <div
                                className={`filter-month ${selectedFilter === "month" ? "active" : ""}`}
                                onClick={() => handleFilterClick("month")}
                            >
                                Month
                            </div>
                        </div>

                        <div
                            className={`select-day ${selectedFilter === "day" ? "" : "disabled"}`}
                            onClick={() => {
                                if (selectedFilter === "day") {
                                    console.log('Day selected');
                                }
                            }}
                        >
                            Select Day
                        </div>

                        <div className="option-container">
                            <div
                                className={`option-item ${selectedOption === "service" ? "active" : ""}`}
                                onClick={() => handleOptionClick("service")}
                            >
                                Customers served for service
                            </div>
                            <div
                                className={`option-item ${selectedOption === "counter" ? "active" : ""}`}
                                onClick={() => handleOptionClick("counter")}
                            >
                                Customers served for counter
                            </div>
                        </div>

                        <div className="button-container">
                            <Button className="clear-btn"  onClick={handleClear}>
                                Clear
                            </Button>
                            <Button className="apply-btn" variant="danger" onClick={handleApply}>
                                Apply
                            </Button>
                        </div>

                    </div>
                </Col>
                <Col md={7}>
                </Col>
            </Row >
        </Container >
    </>)
}

export { SeeStats }

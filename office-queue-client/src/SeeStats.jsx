import {Container, Row, Col, Button} from 'react-bootstrap';
import {Navbar} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import API from './API/API.mjs';
import {DatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import * as dayjs from 'dayjs'


function SeeStats() {
    const [selectedFilter, setSelectedFilter] = useState("day");
    const [selectedOption, setSelectedOption] = useState("");  // Nuovo stato per l'opzione selezionata
    const [selectedDate, setSelectedDate] = useState([]);

    const timeAssociation = new Map([
        ["day", ["day", "month", "year"]],
        ["week", ["day", "month", "year"]],
        ["month", ["month", "year"]]
    ]);

    useEffect(() => {
        console.log("Selected date:", selectedDate);}
    , [selectedDate])

    const [data, setData] = useState([
        {
            counterId: 1, stats: [
                {customersNumber: 14, serviceName: "Servizio1"},
                {customersNumber: 14, serviceName: "Servizio2"}
            ]
        },
        {
            counterId: 2, stats: [
                {customersNumber: 14, serviceName: "Servizio1"},
                {customersNumber: 14, serviceName: "Servizio2"}
            ]
        }
    ])

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

    return (
        <>
            <div className="d-flex flex-column vh-100 vw-100">
                <Navbar className='bg-d custom-navbar'>
                    <Container>
                        <Navbar.Brand>
                            <Link to='/nextcustomer'><Button className='back-btn'><i className="bi bi-arrow-left-circle" style={{fontSize: "50px"}}></i></Button></Link>
                        </Navbar.Brand>
                        <Navbar.Text className='navbar-text-custom'>
                            STATS
                        </Navbar.Text>
                    </Container>
                </Navbar>
                <Container fluid className='py-4'>
                    <Row className="h-100">
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
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label={"Select " + (selectedFilter ? (selectedFilter[0].toUpperCase() + selectedFilter.slice(1)) : "Above")}
                                            views={selectedFilter ? timeAssociation.get(selectedFilter) : ["day"]}
                                            onChange={(newValue) => {
                                                switch (selectedFilter) {
                                                    case "day":
                                                        setSelectedDate([newValue, newValue]);
                                                        break;
                                                    case "week":
                                                        setSelectedDate([newValue.startOf('week'), newValue.endOf('week')]);
                                                        break;
                                                    case "month":
                                                        setSelectedDate([newValue.startOf('month'), newValue.endOf('month')]);
                                                        break;
                                                }
                                            }}
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    color: 'white', // Change text color to white
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'transparent', // Change border color
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    border: "none",
                                                },
                                                '&:active .MuiOutlinedInput-notchedOutline': {
                                                    border: "none",
                                                }
                                            }}
                                            InputLabelProps={{
                                                sx: { display: 'none' } // Hide the label
                                            }}
                                        />
                                    </LocalizationProvider>
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
                                    <Button className="clear-btn" onClick={handleClear}>
                                        Clear
                                    </Button>
                                    <Button className="apply-btn" variant="danger" onClick={handleApply}>
                                        Apply
                                    </Button>
                                </div>

                            </div>
                        </Col>
                        <Col md={7}>
                            <div className="flex flex-column w-100 h-100 border border-2 border-black rounded">
                                <div className="d-flex flex-row bg-d w-100 text-white justify-content-center gap-2 p-3">
                                    <p className="m-0 p-0 w-auto">
                                        {"12/12/12"}
                                    </p>
                                    <p className="m-0 p-0 w-auto text-white-50">
                                        {selectedOption ? (selectedOption == "service" ? "Customers served for service" : "Customers served for counter") : "Not Selected"}
                                    </p>
                                </div>
                                <div className="p-3">
                                    {
                                        data.map(
                                            counter => {
                                                return <CounterStatLine key={counter.counterId} counterId={counter.counterId}
                                                                        stats={counter.stats}></CounterStatLine>
                                            }
                                        )
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

function CounterStatLine({counterId, stats}) {
    return (
        <p className="statEntry">
            {"Counter " + counterId + ": "}
            {
                stats.map(
                    stat => {
                        return <>
                            <span className="">{stat.customersNumber + " "}</span>
                            <span>{"(" + stat.serviceName + ")"}</span>
                            <span>{", "}</span>
                        </>

                    }
                )
            }
        </p>
    )
}

export {SeeStats}

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

    const [actualDataShowed, setActualDataShowed] = useState([]); //filter, dates, option

    const timeAssociation = new Map([
        ["day", ["day", "month", "year"]],
        ["week", ["day", "month", "year"]],
        ["month", ["month", "year"]]
    ]);

    const [data, setData] = useState([])

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleClear = () => {
        // Azzera filtri e opzioni
        setSelectedDate([]);
        setSelectedOption("");
        console.log("Filters cleared");
    };

    const handleApply = async () => {
        if (selectedOption !== "" && selectedDate.length !== 0 && selectedFilter !== "") {
            setActualDataShowed([selectedFilter, selectedDate, selectedOption])
        } else {
            return
        }
        try {
            if (selectedOption === "service" && selectedDate[0] && selectedFilter !== "") {
                const customersServed = await API.getServedCustomerByServiceType(selectedDate[0].format("YYYY-MM-DD"), selectedDate[1].format("YYYY-MM-DD"));
                setData(customersServed);
            } else if (selectedOption === "counter" && selectedDate[0]) {
                const customersServed = await API.getServedCustomerByCounter(selectedDate[0].format("YYYY-MM-DD"), selectedDate[1].format("YYYY-MM-DD"));
                const transformedData = customersServed.reduce((acc, current) => {

                    let existingCounter = acc.find(item => item.counterId === current.counterId);

                    if (existingCounter) {
                        existingCounter.stats.push({
                            customersNumber: current.customersCount,
                            serviceName: current.name
                        });
                    } else {
                        acc.push({
                            counterId: current.counterId,
                            stats: [
                                {
                                    customersNumber: current.customersCount,
                                    serviceName: current.name
                                }
                            ]
                        });
                    }
                    return acc;
                }, []);
                setData(transformedData);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-flex flex-column vh-100 vw-100">
            <Navbar className='bg-d custom-navbar'>
                <Container>
                    <Navbar.Brand>
                        <Link to='/configcounters'><Button className='back-btn'><i className="bi bi-arrow-left-circle"
                                                                                 style={{fontSize: "50px"}}></i></Button></Link>
                    </Navbar.Brand>
                    <Navbar.Text className='navbar-text-custom'>
                        STATS
                    </Navbar.Text>
                </Container>
            </Navbar>
            <Container fluid className='py-4 h-100'>
                <Row>
                    <Col md={3}>
                        <div className='rect-left bg-d m-3'>
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
                                            sx: {display: 'none'} // Hide the label
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
                    <Col md={9}>
                        <div className="flex flex-column w-100 h-100 border-darker-d rounded my-3">
                            <div className="d-flex flex-row bg-d w-100 text-white justify-content-center gap-2 p-3">
                                <p className="m-0 p-0 w-auto">
                                    {actualDataShowed.length!==0 ? (actualDataShowed[1][0].format("YYYY-MM-DD") + " : " + actualDataShowed[1][1].format("YYYY-MM-DD")) : ""}
                                </p>
                                <p className="m-0 p-0 w-auto text-white-50">
                                    {actualDataShowed.length!==0 ? (actualDataShowed[2] === "service" ? "Customers served for service" : "Customers served for counter") : "Not Selected"}
                                </p>
                            </div>
                            <div className="p-3">
                                {
                                    actualDataShowed[2] === "counter" ? (
                                            data.length !== 0 &&
                                            data.map(
                                                counter => {
                                                    return <CounterStatLine key={counter.counterId}
                                                                            counterId={counter.counterId}
                                                                            stats={counter.stats}></CounterStatLine>
                                                })
                                        )
                                        : (
                                            data.length !== 0 &&
                                            data.map(
                                                counter => {
                                                    return <p className="statEntry" key={counter.name}>
                                                        <span className="text-my_red">{"Service " + counter.name + ": "}</span>
                                                        {
                                                                <span className="">{counter.customersCount}</span>
                                                        }
                                                    </p>
                                                })
                                        )
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

function CounterStatLine({counterId, stats}) {
    return (
        <p className="statEntry">
            <span className="text-my_red">{"Counter " + counterId + ": "}</span>
            {
                stats !== undefined &&
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

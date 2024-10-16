import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Row, Col, Table } from "react-bootstrap";

import API from "./API/API.mjs";

function CallCustomer() {
  const [queuesLength, setQueuesLength] = useState([]);
  const [waitingList, setWaitingList] = useState([]);
  const [servingList, setServingList] = useState([]);

  useEffect(() => {
    const getQueues = async () => {
      try {
        const queues = await API.getQueues();

        const extractedQueuesLength = extractQueuesLength(queues);
        const extractedWaitingList = extractWaitingList(queues);
        const extractedServingList = extractServingList(queues);

        setQueuesLength(extractedQueuesLength);
        setWaitingList(extractedWaitingList);
        setServingList(extractedServingList);

        console.log("TICKETS:");
        console.log(queues);
      } catch (err) {
        console.log(err);
      }
    };

    getQueues();
    const intervalId = setInterval(getQueues, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const extractQueuesLength = (tickets) => {
    const serviceCount = {};
    tickets.forEach((ticket) => {
      const serviceName = ticket.serviceName;
      if (!serviceCount[serviceName]) {
        serviceCount[serviceName] = 0;
      }
      if (ticket.statusId === 1) {
        serviceCount[serviceName]++;
      }
    });

    // Convert the serviceCount object to an array of { serviceName, length }
    return Object.keys(serviceCount).map((serviceName) => ({
      serviceName,
      length: serviceCount[serviceName],
    }));
  };

  const extractWaitingList = (tickets) => {
    return tickets
      .filter((ticket) => ticket.statusId === 1)
      .map((ticket) => ({
        serviceName: ticket.serviceName,
        ticketCode: ticket.code,
      }));
  };

  const extractServingList = (tickets) => {
    return tickets
      .filter((ticket) => ticket.statusId === 2)
      .map((ticket) => ({
        ticketCode: ticket.code,
        counter: ticket.counterId,
      }));
  };

  return (
    <>
      <Navbar className="bg-d custom-navbar">
        <Container>
          <Navbar.Text className="navbar-text-custom c-w">QUEUE</Navbar.Text>
        </Container>
      </Navbar>

      <Container className="my-4">
        <Row>
          {/* Section 1 (Left) - QUEUE LENGTH Card */}
          <Col md={4} className="d-flex justify-content-center">
            <div className="cc-queue-length-card">
              <p className="cc-large-text">QUEUE LENGTH</p>
              <Table className="transparent-table">
                <tbody>
                  {queuesLength.map((q, index) => (
                    <tr key={index}>
                      <td>{q.serviceName}</td>
                      <td>{q.length}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>

          {/* Section 2 (Middle) - WAITING Card */}
          <Col md={4} className="d-flex justify-content-center">
            <div className="cc-waiting-card">
              <p className="cc-large-text">WAITING</p>
              <Table className="transparent-table">
                <tbody>
                  {waitingList.map((w, index) => (
                    <tr key={index}>
                      <td>{w.serviceName}</td>
                      <td>{w.ticketCode}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>

          {/* Section 3 (Right) - SERVING Card */}
          <Col md={4} className="d-flex justify-content-center">
            <div className="cc-serving-card">
              <p className="cc-large-text">SERVING</p>
              <Table className="transparent-table">
                <tbody>
                  {servingList.map((s, index) => (
                    <tr key={index}>
                      <td>{s.ticketCode}</td>
                      <td>{"COUNTER " + s.counter}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export {CallCustomer};

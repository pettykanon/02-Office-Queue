import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Row, Col, Table } from "react-bootstrap";

function GamePage() {
  const [queues, setQueues] = useState([
    { serviceName: "ServiceA", length: 10 },
    { serviceName: "ServiceB", length: 5 },
    { serviceName: "ServiceC", length: 8 },
  ]);
  const [waitingList, setWaitingList] = useState([
    { serviceName: "ServiceC", ticketCode: "C2" },
    { serviceName: "ServiceA", ticketCode: "A15" },
  ]);
  const [servingList, setServingList] = useState([
    { ticketCode: "C1", counter: 3 },
    { ticketCode: "A13", counter: 1 },
    { ticketCode: "A14", counter: 2 },
  ]);

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
                  {queues.map((q, index) => (
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

export default GamePage;

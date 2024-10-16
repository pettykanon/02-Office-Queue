import { useState } from "react";
import { ChooseService, YourTicket } from "./GetTicket"
import { SeeStats } from "./SeeStats";
import { NextCustomer, ChooseCounter } from "./NextCustomer"
import { Routes , Route, Link} from "react-router-dom";
import { Row } from "react-bootstrap";
import {CallCustomer} from "./CallCustomer";
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>

        <Route path="/" element={<>
        <Row>
          <Link to="getticket"> Get Ticket</Link>
        </Row>
        <Row>
        <Link to="nextcustomer">Next Customer</Link>
        </Row>
        <Row>
        <Link to="CallCustomer">Call Customer</Link>
        </Row>
        <Row>
        <Link to="stats">Stats</Link>
        </Row>
          </>
        }>
        </Route>

        <Route path='/getticket' element={
          <ChooseService></ChooseService>
        } />

        <Route path='/getticket/:service/:id' element={
          <YourTicket></YourTicket>
        } />


        <Route path='/nextcustomer' element={
          <ChooseCounter></ChooseCounter>
        } />

        <Route path='/nextcustomer/:counter' element={
          <NextCustomer></NextCustomer>
        } />

        <Route path='/stats' element={
          <SeeStats></SeeStats>
        } />

        <Route path="/CallCustomer" element={<CallCustomer />} />

      </Routes>
    </>
  );
}

export default App;

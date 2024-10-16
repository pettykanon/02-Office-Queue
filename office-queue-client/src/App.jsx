import { useState } from "react";
import {ChooseService,YourTicket} from "./GetTicket"
import { NextCustomer, ChooseCounter } from "./NextCustomer"
import { Routes , Route} from "react-router-dom";
import CallCustomer from "./CallCustomer";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
      
        <Route path= '/getticket' element={
          <ChooseService></ChooseService>
        }/>

        <Route path= '/getticket/:service/:id' element={
          <YourTicket></YourTicket>
          }/>
          

         <Route path= '/nextcustomer' element={
          <ChooseCounter></ChooseCounter>
        }/>

        <Route path= '/nextcustomer/:counter' element={
          <NextCustomer></NextCustomer>
        }/>

        <Route path="/CallCustomer" element={<CallCustomer />} />

      </Routes>
    </>
  );
}

export default App;

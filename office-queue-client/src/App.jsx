import { useState } from "react";
import {ChooseService,YourTicket} from "./GetTicket"
import {ChooseService} from "./GetTicket"
import { NextCustomer } from "./NextCustomer"
import { Routes , Route} from "react-router-dom";
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
      
        <Route path= '/getticket' element={
          <ChooseService></ChooseService>
        }/>

        <Route path= '/getticket/:service' element={
          <YourTicket></YourTicket>
          }/>
          
         <Route path= '/nextcustomer' element={
          <NextCustomer></NextCustomer>
        }/>
      </Routes>
    </>
  );
}

export default App;

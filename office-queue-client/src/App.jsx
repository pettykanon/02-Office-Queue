import { useState } from "react";
import {ChooseService} from "./GetTicket"
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
      </Routes>
    </>
  );
}

export default App;

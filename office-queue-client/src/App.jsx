import {useState} from "react";
import {ChooseService, YourTicket} from "./GetTicket"
import {NextCustomer, ChooseCounter} from "./NextCustomer"
import {ConfigCounters} from "./ConfigCounters Components/ConfigCounters.jsx"
import {Routes, Route} from "react-router-dom";
import './App.css'
import {SettingCounters} from "./ConfigCounters Components/SettingCounters.jsx";
import {SetUpCounter} from "./ConfigCounters Components/SetUpCounter.jsx";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Routes>

                <Route path='/getticket' element={
                    <ChooseService></ChooseService>
                }/>

                <Route path='/getticket/:service/:id' element={
                    <YourTicket></YourTicket>
                }/>


                <Route path='/nextcustomer' element={
                    <ChooseCounter></ChooseCounter>
                }/>

                <Route path='/nextcustomer/:counter' element={
                    <NextCustomer></NextCustomer>
                }/>

                <Route path='/configcounters' element={
                    <ConfigCounters></ConfigCounters>
                }/>

                <Route path='/settingcounters' element={
                    <SettingCounters></SettingCounters>
                }/>

                <Route path='/settingcounters/:counterId' element={
                    <SetUpCounter></SetUpCounter>
                }/>

            </Routes>
        </>
    );
}

export default App;

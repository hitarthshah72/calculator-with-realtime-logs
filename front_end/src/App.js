import React, { useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import InputBar from './Components/InputBar/InputBar';
import CalculationLogs from './Components/CalculationLogs/CalculationLogs';
import socketIOClient from "socket.io-client";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const ENDPOINT = "https://calculator-sezzle-2020.herokuapp.com/";
const socket = socketIOClient(ENDPOINT);

function App() {
  const [logs, setLogs] = useState(["Can not connect to server. Try opening on google chrome"]);

  // listen to socket update
  useEffect(() => {
    socket.on("update", data =>{
      console.log("update")
      setLogs(data);
    })
  }, []);

  return (
    <div className="App container">
      <h1 className="mt-3">Sezzle Calculator</h1>
      <InputBar socket={socket}/>
      <h2 className="mt-3 text-left">History(Past 10 logs only)</h2>
      <CalculationLogs logs={logs}/>
    </div>
  );
}

export default App;

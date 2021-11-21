import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Test } from "./Test"
import { Subscribe } from '@react-rxjs/core';
import { useState } from 'react';
import { webSocket, WebSocketSubject} from "rxjs/webSocket" 

function App() {

  const [ws, setWS] = useState(webSocket<String>("ws://localhost:8080"))
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Subscribe>
      <Test ws={ws}/>

      </Subscribe>
    </div>
  );
}

export default App;

import logo from './logo.png';
import http from "./api";
import React, { useState } from 'react';
import CalculateModel from "./components/calculateModel"
import './App.css';

const App = () => {
  const [successResponse, setSuccessResponse] = useState("");
  const [errorResponse, setErrorResponse] = useState("");


  const submitDimensions = (length, width, height, weight) => {
    http.get(`/products`, { params: { length: length, width: width, height: height, weight: weight} })
    .then(response => {
      setErrorResponse("")
      setSuccessResponse(response.data)
    })
    .catch(e => {
      setSuccessResponse("")
      if (e.response.data == undefined) {
        setErrorResponse("Cant connect to server.")
      }
      if (e.response.data != undefined) {
        setErrorResponse(e.response.data)
      }
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div className="welcome-heading">Welcome!</div>
        <div className="welcome-text">Let's ship some stuff. Launch the calculator and input the dimensions of what you need to ship and we'll recommend what package you'd need.</div>
        { successResponse && <div>We recommend: <span className='success-message'>{successResponse}</span></div> }
        <div className='model-button'>
          <CalculateModel submitDimensions={submitDimensions} errorResponse={errorResponse} successResponse={successResponse} />
        </div>
      </header>
    </div>
  );
}

export default App;

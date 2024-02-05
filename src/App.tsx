import "./pages/Home/home.css";
import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Board from "./pages/Board/Board";
import Home from "./pages/Home/Home";
import instance from "./api/request";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  const [error, setError] = useState("");
  const [errorFlag, setErrorFlag] = useState(true);
  const [progress, setProgress] = useState(false);
  instance.interceptors.request.use(
    function (config) {
      setProgress(true);
      return config;
    },
    function (error) {
      setError(error.message);
      setProgress(false);
      setErrorFlag(false);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      setProgress(false);
      return response;
    },
    function (error) {
      setError(error.message);
      setErrorFlag(false);
      setProgress(false);
      return Promise.reject(error);
    }
  );
  return (
    <>
      {errorFlag ? (
        <BrowserRouter>
          <Routes>
            <Route path="/board/:board_id" element={<Board />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <p className="Error">{error}</p>
      )}
      {progress && (
        <div className="progress-container">
          <progress
            className="progress-bar"
            value={null as unknown as string}
          />
        </div>
      )}
    </>
  );
}

export default App;

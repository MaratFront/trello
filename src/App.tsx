import "./pages/Home/home.css";
import React, { useState } from "react";
import "./App.css";
import Board from "./pages/Board/Board";
import Home from "./pages/Home/Home";
import instance from "./api/request";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  function reloadWindow() {
    window.location.reload();
  }
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
        <div className="error">
          <div className="error__message">
            <p className="error__title">{error}</p>
            <button className="error__button" onClick={reloadWindow}>
              Reset
            </button>
          </div>
        </div>
      )}
      {progress && (
        <div className="progress--container">
          <progress
            className="progress--bar"
            value={null as unknown as string}
          />
        </div>
      )}
    </>
  );
}

export default App;

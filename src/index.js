import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      {/* <Route path="/game" element={<Main />} /> */}
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

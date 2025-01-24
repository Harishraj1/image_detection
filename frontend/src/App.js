import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Landing from "./Components/Landing";
import Upload_popup from "./Components/Upload_popup";
import Result from "./Components/Result";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/upload" element={<Upload_popup />} />
          <Route path="/result" element={<Result />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;



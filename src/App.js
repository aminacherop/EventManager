import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";
import ManageEvent from "./components/ManageEvent";
import ManageGuests from './components/ManageGuests';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddEvent />} />
          <Route path="/manage-event/:eventId" element={<ManageEvent />} />
          <Route path="/manage-guests/:eventId" element={<ManageGuests />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

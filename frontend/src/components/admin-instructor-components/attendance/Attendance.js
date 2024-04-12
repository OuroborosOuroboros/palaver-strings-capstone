// Attendance.js - A new component to serve as the parent for attendance-related pages
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';


function Attendance() {
    const location = useLocation();

  return (
    <div className="attendance-container">
      <nav className="attendance-nav">
        <Link to="take" className={location.pathname.includes("/take") ? "active" : ""}>take attendance</Link> |{" "}
        <Link to="view" className={location.pathname.includes("/view") ? "active" : ""}>view attendance records</Link> | {" "}
        <Link to="update" className={location.pathname.includes("/update") ? "active" : ""}>update attendance record</Link>
      </nav>
      <Outlet /> {/* This renders the matched child route */}
    </div>
  );
}

export default Attendance;
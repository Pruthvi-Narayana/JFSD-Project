import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/review-requests">Review Requests</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
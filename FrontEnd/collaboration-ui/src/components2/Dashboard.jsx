
import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';

const Dashboard = ({ children }) => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
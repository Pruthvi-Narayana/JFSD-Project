import React from 'react';
import { Link } from 'react-router-dom';
import './LaunchPage.css'; // Import the CSS file for custom styles

const LaunchPage = () => (
  <div className="container mt-5">
    <h1 className="text-center mb-4">Welcome to the Collaboration Platform</h1>
    <p className="text-center text-muted mb-5">
      A platform for students and mentors to collaborate on projects.
    </p>
    <div className="cards justify-content-center">
      <div className="card red">
        <Link to="/login" className="card-link">
          <p className="tip">Login</p>
          <p className="second-text">Access your account and manage projects.</p>
        </Link>
      </div>
      <div className="card green">
        <Link to="/signup" className="card-link">
          <p className="tip">Signup</p>
          <p className="second-text">Create a new account and get started.</p>
        </Link>
      </div>
    </div>
  </div>
);

export default LaunchPage;

import React from 'react';
import { Link } from 'react-router-dom';

const LaunchPage = () => (
  <div className="container mt-5">
    <h1 className="text-center">Welcome to the Collaboration Platform</h1>
    <p className="text-center text-muted">
      A platform for students and mentors to collaborate on projects.
    </p>
    <div className="d-flex justify-content-center mt-4">
      <div className="card m-3" style={{ width: '18rem' }}>
        <div className="card-body text-center">
          <h5 className="card-title">Login</h5>
          <p className="card-text">Access your account and manage projects.</p>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </div>
      <div className="card m-3" style={{ width: '18rem' }}>
        <div className="card-body text-center">
          <h5 className="card-title">Signup</h5>
          <p className="card-text">Create a new account and get started.</p>
          <Link to="/signup" className="btn btn-success">
            Signup
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default LaunchPage;

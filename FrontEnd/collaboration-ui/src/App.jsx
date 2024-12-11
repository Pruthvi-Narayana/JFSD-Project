import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LaunchPage from './components/LaunchPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ProjectList from './components/Projects/ProjectList';
import CreateProject from './components/Projects/CreateProject';
import Navbar from './components/Navbar';

const App = () => (
  <Router>
    <Navbar></Navbar> {/* Navbar will be visible on all pages */}
    <div className="container mt-5">
    <Routes>
      <Route path="/" element={<LaunchPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<ProjectList />} />
      <Route path="/projects/create" element={<CreateProject />} />
    </Routes>
    </div>
  </Router>
);

export default App;

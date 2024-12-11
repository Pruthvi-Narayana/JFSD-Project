import React, { useState } from 'react';
import { registerUser } from '../api/api';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: '',
    department: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('Signup Successful! Please login.');
      setFormData({
        email: '',
        password: '',
        fullName: '',
        role: '',
        department: '',
      });
    } catch (error) {
      console.error('Signup Failed:', error.response?.data || error.message);
      alert('Signup Failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Signup</h2>
      <form onSubmit={handleSignup} className="mt-4">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="form-select"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select a Role</option>
            <option value="Student">Student</option>
            <option value="Mentor">Mentor</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">
            Department
          </label>
          <input
            type="text"
            className="form-control"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;

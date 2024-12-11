import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      alert('Login Successful');
      navigate('/dashboard');
    } catch (error) {
      alert('Login Failed: ' + error.message);
    }
  };

  // Inline CSS for the Login Component
  const containerStyle = {
    maxWidth: '350px',
    background: '#F8F9FD',
    background: 'linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%)',
    borderRadius: '40px',
    padding: '25px 35px',
    border: '5px solid rgb(255, 255, 255)',
    boxShadow: 'rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px',
    margin: '20px',
  };

  const headingStyle = {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: '30px',
    color: 'rgb(16, 137, 211)',
  };

  const inputStyle = {
    width: '100%',
    background: 'white',
    border: 'none',
    padding: '15px 20px',
    borderRadius: '20px',
    marginTop: '15px',
    boxShadow: '#cff0ff 0px 10px 10px -5px',
    borderInline: '2px solid transparent',
  };

  const inputFocusStyle = {
    outline: 'none',
    borderInline: '2px solid #12B1D1',
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%)',
    color: 'white',
    paddingBlock: '15px',
    margin: '20px auto',
    borderRadius: '20px',
    boxShadow: 'rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px',
    border: 'none',
    transition: 'all 0.2s ease-in-out',
  };

  const buttonHoverStyle = {
    transform: 'scale(1.03)',
    boxShadow: 'rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px',
  };

  const buttonActiveStyle = {
    transform: 'scale(0.95)',
    boxShadow: 'rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Login</h2>
      <form onSubmit={handleLogin} className="mt-4">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => e.target.style = inputFocusStyle}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => e.target.style = inputFocusStyle}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style = buttonHoverStyle}
          onMouseLeave={(e) => e.target.style = buttonStyle}
          onMouseDown={(e) => e.target.style = buttonActiveStyle}
          onMouseUp={(e) => e.target.style = buttonHoverStyle}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

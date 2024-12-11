import React, { useState } from 'react';
import { registerUser, loginUser } from '../api/apiService';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
    fullName: '',
    role: '',
    department: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await loginUser(user);
        console.log('Login successful:', response.data);
      } else {
        const response = await registerUser(user);
        console.log('User registered:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="auth">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />
        {!isLogin && (
          <>
            <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" required />
            <input type="text" name="role" value={user.role} onChange={handleChange} placeholder="Role" required />
            <input type="text" name="department" value={user.department} onChange={handleChange} placeholder="Department" required />
          </>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default Auth;
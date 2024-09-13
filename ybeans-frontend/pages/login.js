import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { login } from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '', // 或者使用 phone
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(formData);
      setUser(userData);
      if (userData.isAdmin) {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    } catch (error) {
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold my-8">Login</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button type="submit" className="w-full bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition duration-300">
          Login
        </button>
      </form>
    </Layout>
  );
};

export default LoginPage;

import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold my-8">Your Profile</h1>
      <div className="max-w-md mx-auto">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </Layout>
  );
};

export default ProfilePage;

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { AuthContext } from '../../context/AuthContext';
import { getUsers, updateUserRole } from '../../utils/api';

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push('/login');
    } else {
      fetchUsers();
    }
  }, [user, router]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleRoleUpdate = async (id, isAdmin) => {
    try {
      await updateUserRole(id, isAdmin);
      fetchUsers();
    } catch (error) {
      console.error('Failed to update user role:', error);
    }
  };

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold my-8">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user._id}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.isAdmin ? 'Admin' : 'User'}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleRoleUpdate(user._id, !user.isAdmin)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ManageUsers;

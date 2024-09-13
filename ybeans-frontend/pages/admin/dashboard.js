import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { AuthContext } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold my-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/admin/add-product" className="block bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition duration-300 text-center">
          Add New Product
        </Link>
        <Link href="/admin/manage-products" className="block bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition duration-300 text-center">
          Manage Products
        </Link>
        <Link href="/admin/manage-orders" className="block bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition duration-300 text-center">
          Manage Orders
        </Link>
        <Link href="/admin/manage-users" className="block bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition duration-300 text-center">
          Manage Users
        </Link>
      </div>
    </Layout>
  );
};

export default AdminDashboard;

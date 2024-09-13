import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

const Home = () => {
  return (
    <Layout>
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to YBeans Coffee</h1>
        <p className="text-xl mb-8">Discover our premium coffee beans from around the world.</p>
        <Link href="/products" className="bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition duration-300">
          Shop Now
        </Link>
      </div>
    </Layout>
  );
};

export default Home;

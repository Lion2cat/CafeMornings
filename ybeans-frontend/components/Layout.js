import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        © 2023 YBeans Coffee
      </footer>
    </div>
  );
};

export default Layout;

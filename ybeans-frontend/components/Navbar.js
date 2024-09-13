import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-brown-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl">
            YBeans
          </Link>
          <div className="flex space-x-4">
            <Link href="/products" className="hover:text-gray-300">
              Products
            </Link>
            <Link href="/cart" className="hover:text-gray-300">
              Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

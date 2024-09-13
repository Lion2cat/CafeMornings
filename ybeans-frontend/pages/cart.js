import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { getCart } from '../utils/api';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCart()
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (loading) return <Layout><p>Loading...</p></Layout>;
  if (error) return <Layout><p>Error: {error}</p></Layout>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold my-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.product._id} className="py-4 flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{item.product.name}</h2>
                  <p className="text-gray-600">${item.product.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-between items-center">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <Link href="/checkout" className="bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition duration-300">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </Layout>
  );
};

export default CartPage;

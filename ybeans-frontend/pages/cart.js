import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { getCart } from '../utils/api';
import { getImageUrl } from '../utils/api';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCart()
      .then((data) => {
        setCartItems(data.items || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const total = Array.isArray(cartItems) 
    ? cartItems.reduce((sum, item) => {
        if (item.product && typeof item.product.price === 'number') {
          return sum + item.product.price * item.quantity;
        } else {
          console.error('Invalid product data:', item);
          return sum;
        }
      }, 0)
    : 0;

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
              item.product ? (
                <li key={item.product._id} className="py-4 flex justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{item.product.name}</h2>
                    <p className="text-gray-600">${item.product.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                </li>
              ) : (
                <li key={item._id} className="py-4 text-red-500">Invalid product data</li>
              )
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

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { AuthContext } from '../../context/AuthContext';
import { addProduct } from '../../utils/api';

const AddProductPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    origin: '',
    roastLevel: '',
    flavorNotes: '',
    imageUrl: '',
  });

  if (!user || !user.isAdmin) {
    router.push('/login');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(formData);
      alert('Product added successfully!');
      router.push('/products');
    } catch (error) {
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold my-8">Add New Product</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        {/* Add input fields for all product properties */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        {/* Add similar input fields for other properties */}
        <button type="submit" className="w-full bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition duration-300">
          Add Product
        </button>
      </form>
    </Layout>
  );
};

export default AddProductPage;

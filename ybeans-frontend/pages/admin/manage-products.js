import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { AuthContext } from '../../context/AuthContext';
import { getProducts, deleteProduct, updateProduct, getAuthHeader } from '../../utils/api';

const ManageProducts = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push('/login');
    } else {
      fetchProducts();
    }
  }, [user, router]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        console.log('Deleting product with id:', id);
        const result = await deleteProduct(id);
        console.log('Delete result:', result);
        fetchProducts();
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert('Failed to delete product: ' + error.message);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating product:', editingProduct);
      const updatedProduct = await updateProduct(editingProduct._id, editingProduct);
      console.log('Product updated successfully:', updatedProduct);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Failed to update product:', error);
      // 可以在这里添加一个用户友好的错误提示
      alert('Failed to update product: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold my-8">Manage Products</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">{product.stock}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingProduct && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={editingProduct.name}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Price:</label>
              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Stock:</label>
              <input
                type="number"
                name="stock"
                value={editingProduct.stock}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Update Product
            </button>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default ManageProducts;

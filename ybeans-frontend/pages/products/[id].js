import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Image from 'next/image';
import { fetchProductById, addToCart } from '../../utils/api';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProductById(id)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);
      alert('Product added to cart!');
    } catch (err) {
      alert('Failed to add product to cart');
    }
  };

  if (loading) return <Layout><p>Loading...</p></Layout>;
  if (error) return <Layout><p>Error: {error}</p></Layout>;
  if (!product) return <Layout><p>Product not found</p></Layout>;

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-8 my-8">
        <div className="md:w-1/2">
          <Image src={product.imageUrl} alt={product.name} width={500} height={500} className="rounded-lg" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>
          <button 
            onClick={handleAddToCart}
            className="bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;

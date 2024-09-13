import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ _id, name, price, imageUrl }) => {
  return (
    <Link href={`/products/${_id}`} className="border rounded-lg p-4 hover:shadow-lg transition duration-300">
      <div className="relative w-full h-48 mb-4">
        <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" className="rounded-lg" />
      </div>
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-600">${price.toFixed(2)}</p>
    </Link>
  );
};

export default ProductCard;

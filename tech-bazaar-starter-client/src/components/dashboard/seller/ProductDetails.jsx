import Image from 'next/image';
import React from 'react';

const ProductDetails = ({products}) => {
    return (
        <div>
            <table className="w-full border border-gray-300">
  <thead>
    <tr className="bg-gray-100">
      <th className="border p-2">Title</th>
      <th className="border p-2">Description</th>
      <th className="border p-2">Price</th>
      <th className="border p-2">Quantity</th>
      <th className="border p-2">Image</th>
    </tr>
  </thead>

  <tbody>
    {products.map((product, index) => (
      <tr key={index}>
        <td className="border p-2">{product.title}</td>
        <td className="border p-2">{product.description}</td>
        <td className="border p-2">${product.price}</td>
        <td className="border p-2">{product.quantity}</td>
        <td className="border p-2">
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={product.image}
            alt={product.title}
            width={64}
            height={64}
            className="rounded"
            />
        </td>
      </tr>
    ))}
  </tbody>
</table>
        </div>
    );
};

export default ProductDetails;
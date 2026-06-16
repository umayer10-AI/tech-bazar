import AddProductModal from '@/components/dashboard/seller/AddProductModal';
import ProductDetails from '@/components/dashboard/seller/ProductDetails';
import { sellerProductData } from '@/lib/api/data';
import React from 'react';

const page = async ({ searchParams }) => {
  const pageNumber = Number(searchParams?.page || 1);

  const data = await sellerProductData(pageNumber);

  return (
    <div key={pageNumber}>
      <h1 className="text-3xl font-bold my-5">products</h1>

      <AddProductModal />

      <ProductDetails
        products={data.data}
        totalPages={data.totalPages}
        currentPage={data.page}
      />
    </div>
  );
};

export default page;
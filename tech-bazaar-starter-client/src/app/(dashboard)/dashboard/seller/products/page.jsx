import AddProductModal from '@/components/dashboard/seller/AddProductModal';
import ProductDetails from '@/components/dashboard/seller/ProductDetails';
import { sellerProductData } from '@/lib/api/data';
import React from 'react';

const page = async () => {

    const data = await sellerProductData()
    console.log(data)

    return (
        <div>
            <h1 className='text-3xl font-bold my-5'>products</h1>
            <div className='mb-5'>
                <AddProductModal></AddProductModal>
            </div>
            <ProductDetails products={data}></ProductDetails>
        </div>
    );
};

export default page;
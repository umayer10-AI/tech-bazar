import AddProductModal from '@/components/dashboard/seller/AddProductModal';
import { sellerProductData } from '@/lib/api/data';
import React from 'react';

const page = async () => {

    const data = await sellerProductData()
    console.log(data)

    return (
        <div>
            <h1 className='text-3xl font-bold my-5'>products</h1>
            <AddProductModal></AddProductModal>
        </div>
    );
};

export default page;
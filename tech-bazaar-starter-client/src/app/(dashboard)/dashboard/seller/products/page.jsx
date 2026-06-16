import AddProductModal from '@/components/dashboard/seller/AddProductModal';
import React from 'react';

const page = () => {
    return (
        <div>
            <h1 className='text-3xl font-bold my-5'>products</h1>
            <AddProductModal></AddProductModal>
        </div>
    );
};

export default page;
import AllProducts from '@/components/AllProducts';
import React from 'react';

const page = async ({searchParams}) => {

    const {search} = await searchParams

    return (
        <div>
            <AllProducts search={search}></AllProducts>
        </div>
    );
};

export default page;
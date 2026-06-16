import { getAllProduct } from '@/lib/api/data';
import React from 'react';
import ProductCard from './ProductCard';
import SearchBar from './SerachBar';

const AllProducts = async ({search}) => {

    const data = await getAllProduct(search)
    console.log(search)

    return (
        <div>
            <h1>All Browse Products</h1>
            <div className='max-w-[90%] mx-auto'>
                <SearchBar></SearchBar>
                <ProductCard products={data}></ProductCard>
            </div>
        </div>
    );
};















export default AllProducts;
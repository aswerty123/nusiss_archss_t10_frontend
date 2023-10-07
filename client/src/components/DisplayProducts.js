import React from 'react';
import { useAllProductsQuery } from '../queries/product-queries'

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
import { ProductCard } from './ProductCard';

const DisplayContainer = tw.div`container mx-auto p-4`;
const ButtonGroup = tw.div`flex mb-4 space-x-4`;
const DisplayTitle = tw.h2`text-3xl font-semibold mb-4`;

export const DisplayProducts = () => {
  const allProductsQuery = useAllProductsQuery();

  const { products, categories } = allProductsQuery?.data || {};
  return (
    <>
    <DisplayContainer>
      <DisplayTitle>Product List</DisplayTitle>
      <ButtonGroup>
      <button className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700"
          >
            All
          </button>
        {/* Render filter options based on categories */}
        {categories?.map((category) => (
          <button
            key={category}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700"
          >
            {category}
          </button>
        ))}
      </ButtonGroup>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Map through products and render each product */}
        {products?.map((product) => (
          <ProductCard product={product}/>
        ))}
      </div></DisplayContainer>
    </>
  );
};

import React, { useState } from 'react';
import { useAllProductsQuery } from '../queries/product-queries';
import { ProductCardList } from './ProductCardList';
import { useAuth } from '../context/AuthContext';

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

const DisplayContainer = tw.div`container mx-auto p-4`;
const ButtonGroup = tw.div`flex mb-4 space-x-4`;
const DisplayTitle = tw.h2`text-3xl font-semibold mb-4`;
const TagButton = tw.button`px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700`;

export const DisplayProducts = () => {
  const [type, setType] = useState('All');
  const { authData } = useAuth();
  const allProductsQuery = useAllProductsQuery();

  const { categories } = allProductsQuery?.data || {};

  return (
    <>
      <DisplayContainer>
        <DisplayTitle>Product List</DisplayTitle>
        <ButtonGroup>
          <TagButton onClick={() => setType('All')}>All</TagButton>
          {authData?.role === 'buyer' ? (
            <TagButton onClick={() => setType('WishList')}>WishList</TagButton>
          ) : (
            ''
          )}
          {/* Render filter options based on categories */}
          {categories?.map((category) => (
            <TagButton
              key={category}
              onClick={() => {
                setType(category);
              }}
            >
              {category}
            </TagButton>
          ))}
        </ButtonGroup>
        <ProductCardList type={type} />
      </DisplayContainer>
    </>
  );
};

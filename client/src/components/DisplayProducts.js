import React, { useEffect, useState } from 'react';
import {
  useAllProductsQuery,
  useProductCategoryQuery,
} from '../queries/product-queries';

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
import { ProductCard } from './ProductCard';
import { ProductCardList } from './ProductCardList';
import { useWishlistQuery } from '../queries/shopping-queries';
import { useAuth } from '../context/AuthContext';

const DisplayContainer = tw.div`container mx-auto p-4`;
const ButtonGroup = tw.div`flex mb-4 space-x-4`;
const DisplayTitle = tw.h2`text-3xl font-semibold mb-4`;
const TagButton = tw.button`px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700`;

export const DisplayProducts = () => {
  const [type, setType] = useState('All');
  const { authData, logout, setAuthData } = useAuth();
  const allProductsQuery = useAllProductsQuery();

  const { categories } = allProductsQuery?.data || {};

  return (
    <>
      <DisplayContainer>
        <DisplayTitle>Product List</DisplayTitle>
        <ButtonGroup>
          <TagButton onClick={() => setType('All')}>All</TagButton>
          {authData?<TagButton onClick={() => setType('WishList')}>WishList</TagButton>:""}
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

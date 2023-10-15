import React from 'react';
import { ProductCard } from './ProductCard';
import {
  useAllProductsQuery,
  useProductCategoryQuery,
} from '../queries/product-queries';
import { useWishlistQuery } from '../queries/shopping-queries';

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

const CardListContainer = tw.div`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`

export const ProductCardList = ({ type }) => {
  const allProductsQuery = useAllProductsQuery();
  const productCategoryQuery = useProductCategoryQuery(type);

  const wishlistQuery = useWishlistQuery();

  const allProducts = allProductsQuery?.data?.products;
  const products = productCategoryQuery?.data;
  const wishlistProducts = wishlistQuery?.data;

  const wishlistIdArray = Array.isArray(wishlistQuery?.data)
    ? wishlistQuery.data.map((obj) => obj._id)
    : [];
  
  return (
    <>
      <CardListContainer>
        {/* Map through products and render each product */}
        {type === 'All'
          ? allProducts?.map((product) => (
              <ProductCard
                product={product}
                wishlistIdArray={wishlistIdArray}
              />
            ))
          : type === 'WishList'
          ? wishlistProducts?.map((product) => (
              <ProductCard
                product={product}
                wishlistIdArray={wishlistIdArray}
              />
            ))
          : products?.map((product) => (
              <ProductCard
                product={product}
                wishlistIdArray={wishlistIdArray}
              />
            ))}
      </CardListContainer>
    </>
  );
};

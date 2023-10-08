import React, { useEffect, useState } from 'react';
import { useDeleteProductMutation } from '../queries/product-queries';
import { CgArrowsExchange } from 'react-icons/cg';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { BsFillTrashFill} from 'react-icons/bs'

/** @jsxImportSource @emotion/react */
import tw, { styled } from 'twin.macro';
import { useAuth } from '../context/AuthContext';
import { useAddToWishlistMutation, useCartQuery, useDeleteFromWishlistMutation, useWishlistQuery } from '../queries/shopping-queries';

const CardContainer = tw.div`border border-gray-200 rounded-lg overflow-hidden relative`;
const CardImage = tw.div`w-full h-32 bg-center bg-no-repeat relative`
const CardButton = tw.button`text-white px-3 py-1.5 text-sm font-semibold rounded focus:outline-none`
const AvailabilityTag = tw.div`absolute top-2 left-2 bg-green-100 border-2 border-green-400 text-green-700 rounded p-1 text-xs`;
const OutOfStockTag = tw.div`absolute top-2 left-2 bg-red-100 border-2 border-red-400 text-red-700 rounded p-1 text-xs`;
const HeartIcon = tw.div`absolute top-2 right-2 p-2`; 
const ImageSwitchIconContainer = tw.div`absolute bottom-2 right-2 text-white bg-black bg-opacity-50`
const CardContentContainer = tw.div`p-4 relative`

export const ProductCard = ({ product, wishlistIdArray}) => {
    const { authData } = useAuth();
  const [imageFormat, setImageFormat] = useState(true);
  
  // const cartQuery = useCartQuery();
  // const wishlistQuery = useWishlistQuery();
  const deleteProductMutation = useDeleteProductMutation();
  const addToWishlistMutation = useAddToWishlistMutation();
  const deleteFromWishlistMutation = useDeleteFromWishlistMutation();
  const { _id, name, desc, price, banner, available, type } = product;


  const handleChangeImageFormat = (e) => {
    e.preventDefault();
    setImageFormat(!imageFormat);
    console.log(wishlistIdArray);
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlistMutation.mutate({product_id: product._id});
  }

  const handleRemoveFromWishlist = (e) => {
    e.preventDefault();
    deleteFromWishlistMutation.mutate({id: product._id});
  }

  const handleDelete = (e) => {
    e.preventDefault();
    deleteProductMutation.mutate(product._id);
    // if (type !== 'All' && Array.isArray(product) && product.length === 0)
    //   window.location.reload();
  };

  return (
    <>
      <CardContainer>
        <a href={`/product-details/${_id}`}>
          <CardImage
            style={{
              backgroundImage: `url('${banner}')`,
              backgroundColor: 'gray',
              backgroundSize: imageFormat ? 'contain' : 'cover',
            }}
          >
            <ImageSwitchIconContainer>
            <CgArrowsExchange
              size={20}
              onClick={handleChangeImageFormat}
            /></ImageSwitchIconContainer>
          </CardImage>
        </a>{available?<AvailabilityTag >
          <strong>Available</strong>
        </AvailabilityTag>:<OutOfStockTag >
          <strong>Out of Stock</strong>
        </OutOfStockTag>}
        
        <CardContentContainer>
        {authData? authData?.role === 'seller'? "" : wishlistIdArray?.includes(product._id)?<HeartIcon>
          <AiFillHeart size={30} tw="text-red-500 hover:text-red-600" onClick={handleRemoveFromWishlist} />
        </HeartIcon>:<HeartIcon>
          <AiOutlineHeart size={30} tw="hover:text-red-600" onClick={handleAddToWishlist} />
        </HeartIcon>: ""}
        
          <a
            href={`/product-details/${_id}`}
            tw="text-lg font-semibold mb-2 block hover:text-indigo-600"
          >
            {name}
          </a>
          <p tw="text-gray-600 text-sm mb-4">{desc}</p>
          <div tw="flex items-center justify-between">
            <span tw="text-gray-500 text-sm">(${price})</span>
          </div>
        </CardContentContainer>
        
        <div tw="flex items-center mt-2 space-x-2 justify-end p-2 relative">
          {authData? authData?.role === 'seller'?<CardButton
            tw="bg-red-500 hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </CardButton>:<CardButton
            tw="bg-blue-500 hover:bg-blue-600"
            
          >
            Add to Cart
          </CardButton>:""}
        </div>
      </CardContainer>
    </>
  );
};

import React, { useState } from 'react';
import { useDeleteProductMutation } from '../queries/product-queries';
import { CgArrowsExchange } from 'react-icons/cg';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';
import {
  useAddToWishlistMutation,
  useDeleteFromWishlistMutation,
} from '../queries/shopping-queries';

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

const CardContainer = tw.div`border border-gray-200 rounded-lg overflow-hidden relative`;
const CardImage = tw.div`w-full h-32 bg-center bg-no-repeat relative`;
const CardButton = tw.button`text-white px-3 py-1.5 text-sm font-semibold rounded focus:outline-none`;
const AvailabilityTag = tw.div`absolute top-2 left-2 bg-green-100 border-2 border-green-400 text-green-700 rounded p-1 text-xs`;
const OutOfStockTag = tw.div`absolute top-2 left-2 bg-red-100 border-2 border-red-400 text-red-700 rounded p-1 text-xs`;
const ActiveTag = tw.div`absolute top-10 left-2 bg-blue-100 border-2 border-blue-400 text-blue-700 rounded p-1 text-xs`;
const InActiveTag = tw.div`absolute top-10 left-2 bg-yellow-100 border-2 border-yellow-400 text-yellow-700 rounded p-1 text-xs`;
const HeartIcon = tw.div`absolute top-2 right-2 p-2`;
const ImageSwitchIconContainer = tw.div`absolute bottom-2 right-2 text-white bg-black bg-opacity-50`;
const CardContentContainer = tw.div`p-4 relative`;

export const ProductCard = ({ product, wishlistIdArray }) => {
  const { authData } = useAuth();
  const [imageFormat, setImageFormat] = useState(true);

  const deleteProductMutation = useDeleteProductMutation();
  const addToWishlistMutation = useAddToWishlistMutation();
  const deleteFromWishlistMutation = useDeleteFromWishlistMutation();
  const {
    _id,
    user_id,
    name,
    description,
    category_type,
    imageData,
    quantity,
    price,
    active,
  } = product;
  const available = quantity > 0 ? true : false;

  const handleChangeImageFormat = (e) => {
    e.preventDefault();
    setImageFormat(!imageFormat);
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlistMutation.mutate({ product_id: product._id });
  };

  const handleRemoveFromWishlist = (e) => {
    e.preventDefault();
    deleteFromWishlistMutation.mutate({ id: product._id });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteProductMutation.mutate(product._id);
  };

  return (
    <>
      {(authData?.role !== 'seller' || authData?.id !== user_id) && !active ? (
        ''
      ) : (
        <CardContainer>
          <a href={`/product-details/${_id}`}>
            <CardImage
              style={{
                backgroundImage: `url('${imageData}')`,
                backgroundColor: 'gray',
                backgroundSize: imageFormat ? 'contain' : 'cover',
              }}
            >
              <ImageSwitchIconContainer>
                <CgArrowsExchange size={20} onClick={handleChangeImageFormat} />
              </ImageSwitchIconContainer>
            </CardImage>
          </a>
          {available ? (
            <AvailabilityTag>
              <strong>Available</strong>
            </AvailabilityTag>
          ) : (
            <OutOfStockTag>
              <strong>Out of Stock</strong>
            </OutOfStockTag>
          )}

          {authData?.role !== 'seller' || authData?.id !== user_id ? (
            ''
          ) : active ? (
            <ActiveTag>
              <strong>Active</strong>
            </ActiveTag>
          ) : (
            <InActiveTag>
              <strong>InActive</strong>
            </InActiveTag>
          )}

          <CardContentContainer>
            {authData &&
              (authData?.role === 'seller' ? (
                ''
              ) : wishlistIdArray?.includes(product._id) ? (
                <HeartIcon>
                  <AiFillHeart
                    size={30}
                    tw="text-red-500 hover:text-red-600"
                    onClick={handleRemoveFromWishlist}
                  />
                </HeartIcon>
              ) : (
                <HeartIcon>
                  <AiOutlineHeart
                    size={30}
                    tw="hover:text-red-600"
                    onClick={handleAddToWishlist}
                  />
                </HeartIcon>
              ))}

            <a
              href={`/product-details/${_id}`}
              tw="text-lg font-semibold mb-2 block hover:text-indigo-600"
            >
              {name}
            </a>
            <p tw="text-gray-600 text-sm mb-4">{description}</p>
            <div tw="flex items-center justify-between">
              <span tw="text-gray-500 text-sm"><strong>Price: </strong>${price}</span>
            </div>
          </CardContentContainer>

          <div tw="flex items-center mt-2 space-x-2 justify-end p-2 relative">
            {authData ? (
              authData?.role === 'seller' ? (
                <CardButton
                  tw="bg-red-500 hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Delete
                </CardButton>
              ) : (
                ''
              )
            ) : (
              ''
            )}
          </div>
        </CardContainer>
      )}
    </>
  );
};

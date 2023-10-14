import React, { useState } from 'react';
import { FaHeart, FaShoppingCart, FaCheck } from 'react-icons/fa';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillEdit,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { BiArrowFromLeft, BiLogIn } from 'react-icons/bi';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useProductIdQuery } from '../queries/product-queries';

/** @jsxImportSource @emotion/react */
import tw, { styled } from 'twin.macro';
import { useAuth } from '../context/AuthContext';
import {
  useAddToCartMutation,
  useAddToWishlistMutation,
  useCartQuery,
  useDeleteFromWishlistMutation,
  useWishlistQuery,
} from '../queries/shopping-queries';

const GreenLongButton = tw.button`hover:bg-green-500 hover:text-white hover:border-green-500 w-full flex items-center justify-center border-2 bg-green-100 text-black border-black rounded-full py-2 px-4 hover:text-white transition duration-300 ease-in-out focus:outline-none `;
const BlueLongButton = tw.button`hover:bg-blue-500 hover:text-white hover:border-blue-500 w-full flex items-center justify-center border-2 bg-blue-100 text-black border-black rounded-full py-2 px-4 hover:text-white transition duration-300 ease-in-out focus:outline-none `;
const RedLongButton = tw.button`hover:bg-red-500 hover:text-white hover:border-red-500 w-full flex items-center justify-center border-2 bg-red-100 text-black border-black rounded-full py-2 px-4 hover:text-white transition duration-300 ease-in-out focus:outline-none `;

export const ProductDetails = () => {
  const { authData } = useAuth();
  const [qty, setQty] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();

  const productIdQuery = useProductIdQuery(id);

  const wishlistQuery = useWishlistQuery();
  const addToWishlistMutation = useAddToWishlistMutation();
  const deleteFromWishlistMutation = useDeleteFromWishlistMutation();
  const addToCartMutation = useAddToCartMutation();
  const cartQuery = useCartQuery();

  const wishlistIdArray = Array.isArray(wishlistQuery?.data)
    ? wishlistQuery.data.map((obj) => obj._id)
    : [];

  const { _id, name, desc, type, unit, price, available, suplier, banner } =
    productIdQuery?.data || {};

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlistMutation.mutate({ product_id: _id });
    console.log(cartQuery.data);
  };

  const handleRemoveFromWishlist = (e) => {
    e.preventDefault();
    deleteFromWishlistMutation.mutate({ id: _id });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCartMutation.mutate({ product_id: _id, qty: qty });
    navigate('/search');
    // setQty(1);
  };

  const handleQty = (sign) => {
    if (sign === '+' && qty < 100) {
      setQty(qty + 1);
    }
    if (sign === '-' && qty > 1) {
      setQty(qty - 1);
    }
  };

  return (
    <>
      <div className="flex p-4 border">
        <div className="w-1/2 pr-4">
          <img src={banner} alt={name} className="w-full h-auto" />
        </div>
        <div className="w-1/2 flex flex-col">
          {/* Title */}
          <div className="flex">
            <h2 className="text-xl mt-2 flex items-center">{name}</h2>
            {available ? (
              <div class="ml-10 bg-green-100 border-2 border-green-400 text-green-700 rounded p-1 my-auto text-sm">
                <strong class="font-bold">Available</strong>
              </div>
            ) : (
              <div class="ml-10 bg-red-100 border-2 border-red-400 text-red-700 rounded p-1 my-auto text-sm">
                <strong class="font-bold">Out of Stock</strong>
              </div>
            )}

            <div className="flex-grow" />
            <div className="space-y-2 mt-4">
              {authData?.role === 'buyer' ? (
                wishlistIdArray?.includes(_id) ? (
                  <>
                    <AiFillHeart
                      size={30}
                      tw="text-red-500 hover:text-red-600"
                      onClick={handleRemoveFromWishlist}
                    />
                  </>
                ) : (
                  <>
                    <AiOutlineHeart
                      size={30}
                      tw="hover:text-red-600"
                      onClick={handleAddToWishlist}
                    />
                  </>
                )
              ) : (
                ''
              )}
            </div>
          </div>
          {/* Description */}
          <p>{desc}</p>
          {/* Price */}
          <p>${price}</p>

          {/* Spacer */}
          <div className="flex-grow" />
          <div className="flex-grow" />
          <div className="flex-grow" />
          <div className="flex-grow" />
          <div className="flex-grow" />
          <div className="flex-grow" />
          <div className="flex-grow" />
          <div tw="flex items-center space-x-2 ">
            {authData ? (
              authData.role === 'buyer' ? (
                <>
                  <div>Quantity</div>
                  <div className="flex-grow" />
                  <button
                    tw="border rounded-l-lg p-1"
                    onClick={() => handleQty('-')}
                  >
                    <AiOutlineMinus />
                  </button>
                  <div className="text-lg px-4 font-semibold">{qty}</div>
                  <button
                    tw="border rounded-r-lg p-1"
                    onClick={() => handleQty('+')}
                  >
                    <AiOutlinePlus />
                  </button>
                  <div className="flex-grow" />
                  <div className="flex-grow" />
                  <div className="flex-grow" />
                </>
              ) : (
                ''
              )
            ) : (
              ''
            )}
          </div>
          <div className="flex-grow" />
          {/* Buttons */}
          <div className="space-y-2 mt-4">
            {authData ? (
              authData?.role === 'buyer' ? (
                <>
                  <BlueLongButton onClick={handleAddToCart}>
                    <FaShoppingCart size={20} tw="mr-2" /> Add to Cart
                  </BlueLongButton>

                  <GreenLongButton>
                    <BiArrowFromLeft size={20} tw="mr-2" />
                    Proceed to Checkout
                  </GreenLongButton>
                </>
              ) : (
                <>
                  <BlueLongButton>
                    <AiFillEdit size={20} tw="mr-2" /> Edit Product
                  </BlueLongButton>

                  <RedLongButton>
                    <BsFillTrashFill size={20} tw="mr-2" />
                    Remove Product
                  </RedLongButton>
                </>
              )
            ) : (
              <BlueLongButton onClick={() => navigate('/login')}>
                {/* <Navigate to="/login" replace={true} /> */}
                <BiLogIn size={20} tw="h-6 w-8 rotate-180 mr-2" /> Login to Buy
              </BlueLongButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

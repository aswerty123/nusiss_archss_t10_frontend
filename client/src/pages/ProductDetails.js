import React, { useEffect, useState } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillEdit,
} from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { BiArrowFromLeft, BiLogIn } from 'react-icons/bi';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useProductIdQuery,
  useToggleProductActiveStateMutation,
} from '../queries/product-queries';
import { useAuth } from '../context/AuthContext';
import {
  useAddToCartMutation,
  useAddToWishlistMutation,
  useCartQuery,
  useDeleteFromWishlistMutation,
  useWishlistQuery,
} from '../queries/shopping-queries';

import { useDeleteProductMutation } from '../queries/product-queries';

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

const GreenLongButton = tw.button`hover:bg-green-500 hover:text-white hover:border-green-500 w-full flex items-center justify-center border-2 bg-green-100 text-black border-black rounded-full py-2 px-4 hover:text-white transition duration-300 ease-in-out focus:outline-none `;
const BlueLongButton = tw.button`hover:bg-blue-500 hover:text-white hover:border-blue-500 w-full flex items-center justify-center border-2 bg-blue-100 text-black border-black rounded-full py-2 px-4 hover:text-white transition duration-300 ease-in-out focus:outline-none `;
const RedLongButton = tw.button`hover:bg-red-500 hover:text-white hover:border-red-500 w-full flex items-center justify-center border-2 bg-red-100 text-black border-black rounded-full py-2 px-4 hover:text-white transition duration-300 ease-in-out focus:outline-none `;

const HalfPage = tw.div`flex-grow items-center justify-center pr-4 w-1/2 h-auto`;

const AvailabilityTag = tw.div
  .strong`ml-10 bg-green-100 border-2 border-green-400 text-green-700 rounded p-1 my-auto text-sm`;
const OutOfStockTag = tw.div
  .strong`ml-10 bg-red-100 border-2 border-red-400 text-red-700 rounded p-1 my-auto text-sm`;
const ActiveTag = tw.div
  .strong`ml-10 bg-blue-100 border-2 border-blue-400 text-blue-700 rounded p-1 my-auto text-sm`;
const InActiveTag = tw.div
  .strong`ml-10 bg-yellow-100 border-2 border-yellow-400 text-yellow-700 rounded p-1 my-auto text-sm`;

export const ProductDetails = () => {
  
  const { authData } = useAuth();

  const { id } = useParams();
  const navigate = useNavigate();
  const [imageFormat, setImageFormat] = useState(true);
  const [qty, setQty] = useState(1);

  const productIdQuery = useProductIdQuery(id);
  const wishlistQuery = useWishlistQuery();
  const addToWishlistMutation = useAddToWishlistMutation();
  const deleteFromWishlistMutation = useDeleteFromWishlistMutation();
  const deleteProductMutation = useDeleteProductMutation();
  const addToCartMutation = useAddToCartMutation();
  const cartQuery = useCartQuery();
  const toggleProductActiveStateMutation =
    useToggleProductActiveStateMutation();

  const cartItemInfo = cartQuery?.data?.items.find(
    (item) => item.product._id === id
  );
  // console.log(cartItemInfo);ß
  // console.log(productIdQuery?.data)

  useEffect(() => {
    if (cartItemInfo) setQty(cartItemInfo.unit);
  }, [cartItemInfo]);

  const cartIdArray = Array.isArray(cartQuery?.data?.items)
    ? cartQuery.data.items.map((obj) => obj.product._id)
    : [];
  const wishlistIdArray = Array.isArray(wishlistQuery?.data)
    ? wishlistQuery.data.map((obj) => obj._id)
    : [];

  const productData = productIdQuery?.data || {};
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
  } = productData;

  const handleToggleProductActiveStateMutation = (e) => {
    e.preventDefault();
    if (authData?.id === user_id) toggleProductActiveStateMutation.mutate(_id);
  };

  const handleChangeImageFormat = () => {
    setImageFormat(!imageFormat);
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlistMutation.mutate({ product_id: _id });
  };

  const handleRemoveFromWishlist = (e) => {
    e.preventDefault();
    deleteFromWishlistMutation.mutate({ id: _id });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCartMutation.mutate({ product_id: _id, qty: qty });
    navigate('/search');
  };

  const handleProductDelete = (e) => {
    e.preventDefault();
    deleteProductMutation.mutate(productData._id);
    navigate('/search');
  }

  const handleQty = (sign) => {
    if (sign === '+' && qty < quantity) {
      setQty(qty + 1);
    }
    if (sign === '-' && qty > 1) {
      setQty(qty - 1);
    }
  };

  return (
    <>
      <div className="flex h-full p-4 border">
        <HalfPage
          tw="bg-no-repeat"
          style={{
            backgroundImage: `url(${imageData})`,
            backgroundColor: 'gray',
            backgroundSize: imageFormat ? 'contain' : 'cover',
            backgroundPosition: 'center',
          }}
          onClick={handleChangeImageFormat}
        ></HalfPage>
        <HalfPage
          style={{
            height: '85vh',
            padding: '0 20px', // Optional: Add padding to the content
            boxSizing: 'border-box', // Optional: Include padding and border in the element's total width and height
          }}
        >
          <div tw="flex items-center">
            <h1 tw="text-4xl font-bold mb-2">{name}</h1>
            {quantity > 0 ? (
              <div tw="flex flex-col gap-y-1">
                <AvailabilityTag>Available</AvailabilityTag>
              </div>
            ) : (
              <OutOfStockTag>Out of Stock</OutOfStockTag>
            )}
            {authData?.role !== 'seller' || authData?.id !== user_id ? (
              ''
            ) : active ? (
              <ActiveTag onClick={handleToggleProductActiveStateMutation}>
                Active
              </ActiveTag>
            ) : (
              <InActiveTag onClick={handleToggleProductActiveStateMutation}>
                InActive
              </InActiveTag>
            )}
            <div className="flex-grow" />
            <div className="space-y-2 mt-4 item-center">
              {authData?.role === 'buyer' ? (
                wishlistIdArray?.includes(_id) ? (
                  <AiFillHeart
                    size={30}
                    tw="text-red-500 hover:text-red-600"
                    onClick={handleRemoveFromWishlist}
                  />
                ) : (
                  <AiOutlineHeart
                    size={30}
                    tw="hover:text-red-600"
                    onClick={handleAddToWishlist}
                  />
                )
              ) : (
                ''
              )}
            </div>
          </div>
          <div tw="m-5">
            <p>{description}</p>
            <p>
              <strong>Category:</strong> {category_type}
            </p>
            <p>
              <strong>Quantity:</strong> {quantity}
            </p>
            <p>
              <strong>Price:</strong> ${price}
            </p>
            {authData ? (
              authData.role === 'buyer' ? (
                <>
                  <p>
                    <strong>Item In Cart:</strong>{' '}
                    {cartIdArray?.includes(_id) ? 'Yes' : 'No'}
                  </p>
                </>
              ) : (
                ''
              )
            ) : (
              ''
            )}

            <div className="flex items-center space-x-2 mt-40 ">
              {authData ? (
                authData.role === 'buyer' ? (
                  <>
                    {quantity > 0 ? (
                      <>
                        <div tw="mr-10">
                          <strong>Quantity:</strong>
                        </div>
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
                      </>
                    ) : (
                      ''
                    )}
                  </>
                ) : (
                  ''
                )
              ) : (
                ''
              )}
            </div>
          </div>
          {/* <div className="flex-grow" /> */}
          <div className="space-y-2 mt-10">
            {authData ? (
              authData?.role === 'buyer' ? (
                <>
                  {quantity > 0 ? (
                    <BlueLongButton onClick={handleAddToCart}>
                      <FaShoppingCart tw="mr-2" size={20} /> Add to Cart
                    </BlueLongButton>
                  ) : (
                    ''
                  )}

                  <GreenLongButton onClick={() => navigate('/cart')}>
                    <BiArrowFromLeft tw="mr-2" size={20} />
                    Proceed to Cart
                  </GreenLongButton>
                </>
              ) : (
                <>
                  <BlueLongButton>
                    <AiFillEdit tw="mr-2" size={20} /> Edit Product
                  </BlueLongButton>
                  <RedLongButton onClick={handleProductDelete}>
                    <BsFillTrashFill tw="mr-2" size={20}  />
                    Remove Product
                  </RedLongButton>
                </>
              )
            ) : (
              <BlueLongButton onClick={() => navigate('/login')}>
                <BiLogIn tw="h-6 w-8 rotate-180 mr-2" size={20} /> Login to Buy
              </BlueLongButton>
            )}
          </div>
        </HalfPage>
      </div>
    </>
  );
};

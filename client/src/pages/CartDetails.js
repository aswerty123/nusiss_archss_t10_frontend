import React from 'react';
import  CartCardList  from '../components/CartCardList';
import {
  useCartQuery,
  useCreateOrderMutation,
  useDeleteFromCartMutation,
} from '../queries/shopping-queries';
import { useNavigate } from 'react-router-dom';

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

const ApiTestButtonContainer = tw.div`flex flex-col`;
const BlueButton = tw.div`cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded`;
const RedButton = tw.div`cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded`;

//Rendering of each product in the cart
const DisplayContainer =  tw.div`container mx-auto p-4`;

export const CartDetails = () => {
  const navigate = useNavigate();

  const cartQuery = useCartQuery();
  const productDetails = cartQuery?.data;
  console.log(productDetails)
  const deleteFromCartMutation = useDeleteFromCartMutation();
  const createOrderMutation = useCreateOrderMutation();

  const handleCreateOrder = (e) => {
    e.preventDefault();
    createOrderMutation.mutate();
    navigate('/order-list');
  };

  const handleRemoveFromCart = (id) => {
    deleteFromCartMutation.mutate({ id });
  };

  return (
    <DisplayContainer>
      {productDetails && productDetails.items.map((item) => (
        <CartCardList
          item={item}
        />
      ))}
      <ApiTestButtonContainer>
          <BlueButton onClick={handleCreateOrder}>
            Checkout
          </BlueButton>
        </ApiTestButtonContainer>
    </DisplayContainer>
  );
};

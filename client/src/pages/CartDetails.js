import React from 'react';
import { useCartQuery,useCreateOrderMutation,useDeleteFromCartMutation } from '../queries/shopping-queries';

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
import { useAllProductsQuery } from '../queries/product-queries';
import { useNavigate } from 'react-router-dom';

const ApiTestContainer = tw.div`container mx-auto p-8`;
const ApiTestHeader = tw.div`text-3xl font-bold mb-6`;
const ApiTestContentContainer = tw.div`flex`;
const ApiTestButtonContainer = tw.div`flex flex-col`;
const BlueButton = tw.div`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded`;
const RedButton = tw.div`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded`;

export const CartDetails = () => {

    const navigate = useNavigate();

  const cartQuery = useCartQuery();
  const deleteFromCartMutation = useDeleteFromCartMutation();
  const createOrderMutation = useCreateOrderMutation();

  const handleCreateOrder = (e) => {
    e.preventDefault();
    createOrderMutation.mutate();
    navigate('/order-list');

  }


  const handleRemoveFromCart = (id) => {
    deleteFromCartMutation.mutate({ id });
  };

  return (
    <ApiTestContainer>
      <ApiTestHeader>Get Cart Details</ApiTestHeader>
      <ApiTestContentContainer>
        {cartQuery && (
          <div tw="max-w-md bg-white rounded-lg overflow-hidden shadow-lg p-6 mt-4">
            <h2 tw="text-xl font-semibold mb-4">Get Cart API Data:</h2>
            <pre tw="whitespace-pre-wrap">
              {JSON.stringify(cartQuery.data, null, 2)}
            </pre>
          </div>
        )}
        <ApiTestButtonContainer>
          <BlueButton onClick={handleCreateOrder}>Checkout (Post Order Api)</BlueButton>
          {cartQuery && cartQuery.data?.items?.map((item)=>(
            <RedButton key={item._id} onClick={() => handleRemoveFromCart(item.product._id)}>Delete {item.product.name}</RedButton>
          )) }
        </ApiTestButtonContainer>
      </ApiTestContentContainer>
    </ApiTestContainer>
  );
};

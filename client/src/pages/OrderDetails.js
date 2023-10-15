import React from 'react';
import { useParams } from 'react-router-dom';

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
import { useAllOrdersQuery } from '../queries/shopping-queries';

const ApiTestContainer = tw.div`container mx-auto p-8`;
const ApiTestHeader = tw.div`text-3xl font-bold mb-6`;
const ApiTestContentContainer = tw.div`flex`;
const ApiTestButtonContainer = tw.div`flex flex-col`;
export const OrderDetails = () => {
  const { id } = useParams();
  const allOrdersQuery = useAllOrdersQuery();

  const specificOrderData = allOrdersQuery.data.find(
    (order) => order._id === id
  );

  return (
    <ApiTestContainer>
      <ApiTestHeader>Get Order Details</ApiTestHeader>
      <ApiTestContentContainer>
        {specificOrderData && (
          <div tw="max-w-md bg-white rounded-lg overflow-hidden shadow-lg p-6 mt-4">
            <h2 tw="text-xl font-semibold mb-4">Get Cart API Data:</h2>
            <pre tw="whitespace-pre-wrap">
              {JSON.stringify(specificOrderData, null, 2)}
            </pre>
          </div>
        )}
        <ApiTestButtonContainer>
          {/* <BlueButton onClick={handleCreateOrder}>Checkout (Post Order Api)</BlueButton>
        {cartQuery && cartQuery.data?.items?.map((item)=>(
          <RedButton key={item._id} onClick={() => handleRemoveFromCart(item.product._id)}>Delete {item.product.name}</RedButton>
        )) } */}
        </ApiTestButtonContainer>
      </ApiTestContentContainer>
    </ApiTestContainer>
  );
};

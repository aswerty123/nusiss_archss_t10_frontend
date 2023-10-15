import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllOrdersQuery } from '../queries/shopping-queries';

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

const ApiTestContainer = tw.div`container mx-auto p-8`;
const ApiTestHeader = tw.div`text-3xl font-bold mb-6`;
const ApiTestContentContainer = tw.div`flex`;
const ApiTestButtonContainer = tw.div`flex flex-col`;
const BlueButton = tw.div`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded`;

export const OrderList = () => {
  const navigate = useNavigate();

  const allOrdersQuery = useAllOrdersQuery();
  return (
    <ApiTestContainer>
      <ApiTestHeader>Get Order List</ApiTestHeader>
      <ApiTestContentContainer>
        {allOrdersQuery && (
          <div tw="max-w-md bg-white rounded-lg overflow-hidden shadow-lg p-6 mt-4">
            <h2 tw="text-xl font-semibold mb-4">Get Order List API Data:</h2>
            <pre tw="whitespace-pre-wrap">
              {JSON.stringify(allOrdersQuery.data, null, 2)}
            </pre>
          </div>
        )}
        <ApiTestButtonContainer>
          {allOrdersQuery &&
            allOrdersQuery.data?.map((item) => (
              <BlueButton
                key={item._id}
                onClick={() => navigate(`/order/${item._id}`)}
              >
                Go to {item.orderId}
              </BlueButton>
            ))}
        </ApiTestButtonContainer>
      </ApiTestContentContainer>
    </ApiTestContainer>
  );
};

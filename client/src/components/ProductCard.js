import React from 'react';
import { useDeleteProductMutation } from '../queries/product-queries';

/** @jsxImportSource @emotion/react */
import tw, { styled } from 'twin.macro';

const CardContainer = tw.div`border border-gray-200 rounded-lg overflow-hidden`;

export const ProductCard = ({ product }) => {
  const deleteProductMutation = useDeleteProductMutation();

  const { name, desc, price, banner } = product;

  const handleDelete = (e) => {
    e.preventDefault();
    deleteProductMutation.mutate(product._id);
  };

  return (
    <>
      <CardContainer>
        <a href={`/product-details/${product._id}`}>
          <div
            className="w-full h-32 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${banner}')`,
              backgroundColor: 'gray',
            }}
          ></div>
        </a>
        <div className="p-4 relative">
          <a
            href={`/product-details/${product._id}`}
            className="text-lg font-semibold mb-2 block hover:text-indigo-600"
          >
            {name}
          </a>
          <p className="text-gray-600 text-sm mb-4">{desc}</p>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">(14.59+)</span>
          </div>
        </div>
        <div className="flex items-center mt-2 space-x-2 justify-end p-2 realtive">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm font-semibold rounded focus:outline-none focus:shadow-outline"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 text-sm font-semibold rounded focus:outline-none focus:shadow-outline">
            Details
          </button>
        </div>
      </CardContainer>
    </>
  );
};

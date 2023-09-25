import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sampledatas } from '../utils/sampledatas';
import { onGetProducts, onCreateProduct } from '../store/actions/shopping-actions';
/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
const AddButton = tw.button`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow`;
const Tag = tw.span`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`

export const SearchAllProduct = () => {
    const { products, categories } = useSelector((state) => state.shoppingReducer);

    const dispatch = useDispatch();

    function viewAllProducts() {
        dispatch(onGetProducts());
    }

    function addAllSampleProducts() {
        sampledatas.map((sampledata) => (
            dispatch(onCreateProduct(sampledata))
        ))
    }


  return (<><div>AllProducts</div>
    <div tw="flex flex-wrap">
      
      {/* <div>{JSON.stringify(products)}</div> */}
      {products.map((product) => (
        <>  <div tw="w-48 rounded shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{product.name}</div>
          <p class="text-gray-700 text-base">
            {product.desc}
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <Tag>type: #{product.type}</Tag>
          <Tag>unit: #{product.unit}</Tag>
          <Tag>price: #{product.price}</Tag>
          <Tag>suplier: #{product.suplier}</Tag>
        </div>
      </div></>
      ))}
      <div>AllCategories</div>
      <div>{JSON.stringify(categories)}</div>
      
      <AddButton onClick={() => viewAllProducts()}>View All Products</AddButton>
      <AddButton onClick={() => addAllSampleProducts()}>Add In Product Sample Data</AddButton>
    </div></>
  );
};

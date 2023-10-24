import React, { useState } from 'react';
import {
    useDeleteFromCartMutation,
} from '../queries/shopping-queries';
import {
  useProductIdQuery
} from '../queries/product-queries';
/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

//Styling for containers
const ProductCartListContainer = tw.div`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`;
const ProductContainer = tw.div`border border-gray-200 rounded-lg overflow-hidden relative`;
const ProductImage = tw.div`w-full h-32 bg-center bg-no-repeat relative`;
const ProductContentContainer = tw.div`p-4 relative`;
const ProductCardButton = tw.button`text-white px-3 py-1.5 text-sm font-semibold rounded focus:outline-none`;

const CartCardList = ({item}) => {
  //Data manipulation
  const singleProductQuery = useProductIdQuery(item.product._id)?.data
  const productImageData = singleProductQuery?.imageData
  const productDescription = singleProductQuery?.description
  const [imageFormat, setImageFormat] = useState(true);
  const deleteFromCartMutation = useDeleteFromCartMutation();
  const handleRemoveFromCart = (id) => {
    deleteFromCartMutation.mutate({id});
  };

  return (
    <ProductCartListContainer>
      <ProductContainer>
        {/* Item (1) Displaying Product Image */}
        <a href={`/product-details/${item.product._id}`}>
          <ProductImage
            style={{
              backgroundImage: `url('${productImageData}')`,
              backgroundColor: 'gray',
              backgroundSize: imageFormat ? 'contain' : 'cover',
            }}
          >
          </ProductImage>     
        </a>
        {/* End of Item (1) Displaying Product Image */}
        
        <ProductContentContainer>
          {/* Item (2) Product Name */}
          <a
            href={`/product-details/${item.product._id}`}
            tw="text-lg font-semibold mb-2 block hover:text-indigo-600"
          >
            {item.product.name}
          </a>
          {/* End of Item (2) */}
          
          {/* Item (3) Product's Description */}
          <p tw="text-gray-600 text-sm mb-4">{productDescription}</p>

          
          <div tw="flex items-center justify-between">
              {/* Item (4) Price */}  
              <span tw="text-gray-500 text-sm"><strong>Price: </strong>${item.product.price}</span>
               {/* Item (5) Quantity */}  
               <span tw="text-gray-500 text-sm"><strong>Quantity: </strong>{item.unit}</span>
          </div>

          <div tw="flex items-center mt-2 space-x-2 justify-end p-2 relative">
            <ProductCardButton
              tw="bg-red-500 hover:bg-red-600 cursor-pointer"
              key={item._id}
              onClick= {() => handleRemoveFromCart(item.product._id)}
            >
              Delete From Cart
            </ProductCardButton>
          </div>

        </ProductContentContainer>
      </ProductContainer>
    </ProductCartListContainer>
  )
}

export default CartCardList
  


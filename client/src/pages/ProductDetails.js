import React, { useState } from 'react';
import { FaHeart, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { useProductIdQuery } from '../queries/product-queries';

export const ProductDetails = () => {
  const [isFavourite, setIsFavourite] = useState(false);

  const { id } = useParams();

  const productIdQuery = useProductIdQuery(id);

  const { name, desc, type, unit, price, available, suplier, banner } =
    productIdQuery?.data || {};

  //   const title = 'Hamster';
  //   const description = 'Cute Hamster Meme';
  //   const price = '12';
  //   const imageUrl =
  //     'https://images2.fanpop.com/image/photos/8600000/random-animals-animals-8675984-377-442.jpg';

  const handleFavourite = (e) => {
    e.preventDefault();
    setIsFavourite(!isFavourite);
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
            <div className="flex-grow" />
            <div className="space-y-2 mt-4">
              {isFavourite ? (
                <AiFillHeart
                  className="text-pink-400"
                  size={30}
                  onClick={handleFavourite}
                />
              ) : (
                <AiOutlineHeart size={30} onClick={handleFavourite} />
              )}
            </div>
          </div>
          {/* Description */}
          <p>{desc}</p>
          {/* Price */}
          <p>${price}</p>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Buttons */}
          <div className="space-y-2 mt-4">
            {/* Add to Cart Button */}
            <button className="w-full flex items-center justify-center border-2 text-black border-black rounded-full py-2 px-4 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline">
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>

            {/* Proceed to Checkout Button */}
            <button className="w-full flex items-center justify-center border-2 text-black border-black rounded-full py-2 px-4 hover:bg-green-500 hover:text-white hover:border-green-500 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline">
              Proceed to Checkout
            </button>
          </div>
        </div>
        {/* <div className="w-1/2 flex flex-col">
          <h2 className="text-xl mt-2 flex items-center">
            <AiOutlineHeart className="mr-2" />
            {title}
          </h2>
          <p>{description}</p>
          <p>${price}</p>
          <div className=" space-y-2 mt-4">
            <button className="w-full flex items-center justify-center border-2 textbBlack border-black rounded-full py-2 px-4 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline">
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
            <button className="w-full flex items-center justify-center border-2 textbBlack border-black rounded-full py-2 px-4 hover:bg-green-500 hover:text-white hover:border-green-500 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline">
              Proceed to Checkout
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
};

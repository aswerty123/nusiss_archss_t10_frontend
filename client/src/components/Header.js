import React, { useState } from 'react';
import { BsFillBoxSeamFill, BsPersonCircle } from 'react-icons/bs';
import { BiSearchAlt2, BiLogIn, BiLogOut } from 'react-icons/bi';
import { IoReceiptOutline } from 'react-icons/io5';
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillShop,
  AiOutlineUserSwitch,
} from 'react-icons/ai';
import { ImBoxAdd } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

const HeaderComponent = tw.nav`mx-auto relative flex h-16 items-center justify-between px-10 drop-shadow-sm border-b-2 border-gray-100`;
const RightSideContainer = tw.div`absolute inset-y-0 right-5 flex items-center pr-2 space-x-4`;
const LeftSideContainer = tw.div`absolute inset-y-0 left-5 flex items-center pl-2`;
const Item = tw.div`relative ml-3 flex cursor-pointer items-center py-2 px-2 hover:bg-gray-100`;
const IconText = tw.span`font-medium hidden xl:inline-block`

export const Header = () => {
  const navigate = useNavigate();
  const { authData, logout, setAuthData } = useAuth();
  const [isBuyer, setIsBuyer] = useState(authData?.role === 'buyer');

  const handleSwitchUserRole = (e) => {
    e.preventDefault();
    setAuthData((prevAuthData) => {
      return {
        ...prevAuthData,
        role: isBuyer ? 'seller' : 'buyer',
      };
    });
    setIsBuyer(!isBuyer);
  };

  return (
    <HeaderComponent>
      <LeftSideContainer>
        <Link to="/">
          <div tw="flex items-center">
            <AiFillShop tw="h-10 w-10" />
            <span tw="font-medium text-3xl ml-2">The MarketPlace</span>
          </div>
        </Link>
      </LeftSideContainer>
      <RightSideContainer>
        {' '}
        <Item onClick={() => navigate('/search')}>
          <BiSearchAlt2 tw="h-8 w-8" />
          <IconText>Search</IconText>
        </Item>
        {authData ? (
          isBuyer ? (
            <>
              <Item>
                <IoReceiptOutline tw="h-6 w-8" />
                <IconText>Order</IconText>
              </Item>
              <Item>
                <AiOutlineHeart tw="h-6 w-8" />
                <IconText>WishList</IconText>
              </Item>
              <Item onClick={() => navigate('/test')}>
                <AiOutlineShoppingCart tw="h-6 w-8" />
                <IconText>Cart</IconText>
              </Item>{' '}
              <Item onClick={handleSwitchUserRole}>
                <AiOutlineUserSwitch tw="h-8 w-8 text-blue-500" />
                <IconText tw="text-blue-500 ">
                  Buyer
                </IconText>
              </Item>
            </>
          ) : (
            <>
              <Item onClick={() => navigate('/create-product')}>
                <ImBoxAdd tw="h-6 w-8" />
                <span tw="font-medium hidden xl:inline-block">Product</span>
              </Item>
              <Item onClick={handleSwitchUserRole}>
                <AiOutlineUserSwitch tw="h-8 w-8 text-red-500" />
                <IconText tw="text-red-500">
                  Seller
                </IconText>
              </Item>
            </>
          )
        ) : (
          ''
        )}
        {/* <Item onClick={() => navigate('/search')}>
          <BiSearchAlt2 tw="h-8 w-8" />
          <span tw="font-medium hidden xl:inline-block">Search</span>
        </Item>
        <Item onClick={() => navigate('/create-product')}>
          <ImBoxAdd tw="h-6 w-8" />
          <span tw="font-medium hidden xl:inline-block">Product</span>
        </Item>
        <Item>
          <IoReceiptOutline tw="h-6 w-8" />
          <span tw="font-medium hidden xl:inline-block">Order</span>
        </Item>
        <Item>
          <AiOutlineHeart tw="h-6 w-8" />
          <span tw="font-medium hidden xl:inline-block">WishList</span>
        </Item>
        <Item onClick={() => navigate('/test')}>
          <AiOutlineShoppingCart tw="h-6 w-8" />
          <span tw="font-medium hidden xl:inline-block">Cart</span>
        </Item> */}
        {authData ? (
          <>
            <Item onClick={() => navigate('/profile')}>
              <BsPersonCircle tw="h-6 w-8" />
              <IconText>Profile</IconText>
            </Item>
            <Item
              tw="rounded-md border-2 border-gray-200 "
              onClick={() => {
                logout();
              }}
            >
              <BiLogOut tw="h-6 w-8 rotate-180" />
              <span tw="font-medium">Logout</span>
            </Item>
          </>
        ) : (
          <Item
            tw="rounded-md border-2 border-gray-200 "
            onClick={() => navigate('/login')}
          >
            <BiLogIn tw="h-6 w-8 rotate-180" />
            <span tw="font-medium">Login</span>
          </Item>
        )}
      </RightSideContainer>
    </HeaderComponent>
  );
};

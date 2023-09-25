import React, {useEffect} from 'react';
import { BsFillBoxSeamFill } from 'react-icons/bs';
import { BiSearchAlt2, BiLogIn, BiLogOut } from 'react-icons/bi';
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillShop,
} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onLogout } from '../store/actions';

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
const HeaderComponent = tw.nav`mx-auto relative flex h-16 items-center justify-between px-10 drop-shadow-sm border-b-2 border-gray-100`;
const RightSideContainer = tw.div`absolute inset-y-0 right-5 flex items-center pr-2`;
const LeftSideContainer = tw.div`absolute inset-y-0 left-5 flex items-center pl-2`;
const Item = tw.div`relative ml-3 flex cursor-pointer items-center py-2 px-4 hover:bg-gray-100`;

export const Header = () => {
  const { user, profile } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = user;

  return (
    <HeaderComponent>
      <LeftSideContainer>
        <Item tw="mr-20" onClick={() => navigate('/')}>
          <AiFillShop tw=" h-10 w-10" />
          <span class="font-medium text-3xl mr-4">The MarketPlace</span>
        </Item>
        <Item onClick={() => navigate('/search')}>
          <BiSearchAlt2 tw=" h-8 w-8" />
          <span class="font-medium">Search</span>
        </Item>
      </LeftSideContainer>
      <RightSideContainer>
        <Item>
          <BsFillBoxSeamFill tw=" h-6 w-8" />
          <span class="font-medium">Order</span>
        </Item>
        <Item>
          <AiOutlineHeart tw=" h-6 w-8" />
          <span class="font-medium">WishList</span>
        </Item>
        <Item>
          <AiOutlineShoppingCart tw="h-6 w-8" />
          <span class="font-medium">Cart</span>
        </Item>
          {token ? (
            <Item tw="rounded-md border-2 border-gray-200" onClick={() => dispatch(onLogout())}>
              <BiLogOut tw="h-6 w-8 rotate-180" />
              <span class="font-medium">Logout</span>{' '}
            </Item>
          ) : (
            <Item tw="rounded-md border-2 border-gray-200" onClick={() => navigate('/login')}>
              {' '}
              <BiLogIn tw="h-6 w-8 rotate-180" />
              <span class="font-medium">Login</span>
            </Item>
          )}
      </RightSideContainer>
    </HeaderComponent>
  );
};

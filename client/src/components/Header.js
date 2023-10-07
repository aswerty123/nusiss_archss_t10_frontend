import React, { useEffect, useState } from 'react';
import { BsFillBoxSeamFill, BsPersonCircle } from 'react-icons/bs';
import { BiSearchAlt2, BiLogIn, BiLogOut } from 'react-icons/bi';
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillShop,
} from 'react-icons/ai';

import { ImBoxAdd } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import {
  useMutation,
  useQueryClient,
  QueryObserver,
  useQuery,
} from '@tanstack/react-query';
import { useLoginQuery, useLogoutMutation } from '../queries/user-queries';
import { useAuth } from '../context/AuthContext';

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
const HeaderComponent = tw.nav`mx-auto relative flex h-16 items-center justify-between px-10 drop-shadow-sm border-b-2 border-gray-100`;
const RightSideContainer = tw.div`absolute inset-y-0 right-5 flex items-center pr-2`;
const LeftSideContainer = tw.div`absolute inset-y-0 left-5 flex items-center pl-2`;
const Item = tw.div`relative ml-3 flex cursor-pointer items-center py-2 px-2 hover:bg-gray-100`;

export const Header = () => {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  // // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const loginQuery = useLoginQuery();
  // const logoutMutation = useLogoutMutation();
  const { authData, logout } = useAuth();

  return (
    <HeaderComponent>
      <LeftSideContainer>
        <Link to="/">
          <Item tw="mr-20">
            <AiFillShop tw=" h-10 w-10" />
            <span class="font-medium text-3xl mr-4">The MarketPlace</span>
          </Item>
        </Link>
      </LeftSideContainer>
      <RightSideContainer>
        <Item onClick={() => navigate('/search')}>
          <BiSearchAlt2 tw=" h-8 w-8" />
          <span class="font-medium">Search</span>
        </Item>
        <Item onClick={() => navigate('/create-product')}>
          <ImBoxAdd tw=" h-6 w-8" />
          <span class="font-medium">Product</span>
        </Item>
        <Item>
          <BsFillBoxSeamFill tw=" h-6 w-8" />
          <span class="font-medium">Order</span>
        </Item>
        <Item>
          <AiOutlineHeart tw=" h-6 w-8" />
          <span class="font-medium">WishList</span>
        </Item>
        <Item onClick={() => navigate('/test')}>
          <AiOutlineShoppingCart tw="h-6 w-8" />
          <span class="font-medium">Cart</span>
        </Item>
        {authData ? (
          <>
            <Item onClick={() => navigate('/profile')}>
              <BsPersonCircle tw=" h-6 w-8" />
              <span class="font-medium">Profile</span>
            </Item>
            <Item
              tw="rounded-md border-2 border-gray-200"
              onClick={() => {
                logout();
              }}
            >
              <BiLogOut tw="h-6 w-8 rotate-180" />
              <span class="font-medium">Logout</span>{' '}
            </Item>
          </>
        ) : (
          <Item
            tw="rounded-md border-2 border-gray-200"
            onClick={() => navigate('/login')}
          >
            {' '}
            <BiLogIn tw="h-6 w-8 rotate-180" />
            <span class="font-medium">Login</span>
          </Item>
        )}
      </RightSideContainer>
    </HeaderComponent>
  );
};

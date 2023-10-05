import React from 'react';
import { ProfileDetails } from '../components/ProfileDetails';
import { AddAddressForm } from '../components/AddAddressForm';

/** @jsxImportSource @emotion/react */
import tw, { styled } from 'twin.macro';
const LoginFormContainer = tw.div`flex justify-between`;


const profileData = {
    address: [
      {
        _id: '6511f3369fbbe60019202fdb',
        street: 'Mumbai',
        postalCode: '400066',
        city: 'Mumbai',
        country: 'India',
        __v: 0,
      },
      {
        _id: '6511f3369fbbe60019202fdb',
        street: 'Mumbai',
        postalCode: '400066',
        city: 'Mumbai',
        country: 'India',
        __v: 0,
      },
    ],
    _id: '6511f2ba9fbbe60019202fd7',
    email: 'test5@test.com',
    phone: '12345',
    createdAt: '2023-09-25T20:51:06.778Z',
    updatedAt: '2023-09-25T20:53:10.037Z',
  };


export const Profile = () => {
  return (
    <><LoginFormContainer>
    <ProfileDetails profileData={profileData} />
      {/* <ProfileDetails /> */}
      <AddAddressForm/>
    </LoginFormContainer></>
  );
};

import React from 'react';
import { ProfileDetails } from '../components/ProfileDetails';
import { AddAddressForm } from '../components/AddAddressForm';

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
const LoginFormContainer = tw.div`flex justify-between`;

export const Profile = () => {
  return (
    <>
      <LoginFormContainer>
        <ProfileDetails />
        <AddAddressForm />
      </LoginFormContainer>
    </>
  );
};

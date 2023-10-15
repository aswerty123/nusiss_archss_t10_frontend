import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import {
  useProfileQuery,
  useDeleteProfileMutation,
} from '../queries/user-queries';
import { useAuth } from '../context/AuthContext';

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

const ProfileContainer = tw.div`container mx-auto bg-white shadow-md rounded-md p-6`;
const DeleteProfileButton = tw.button`flex items-center bg-red-600 hover:bg-red-700 py-1 px-2 text-white font-bold rounded focus:outline-none`;
const MainTitle = tw.h2`text-2xl font-semibold mb-4 flex items-center`;
const SecondaryTitle = tw.h3`text-lg font-semibold mb-2`;

export const ProfileDetails = () => {
  const profileQuery = useProfileQuery();
  const deleteProfileMutation = useDeleteProfileMutation();
  const { address, email, phone, role, createdAt, updatedAt } =
    profileQuery?.data || {};

  const { logout } = useAuth();

  const handleDelete = (e) => {
    e.preventDefault();
    deleteProfileMutation.mutate();
    logout();
  };

  return (
    <>
      <ProfileContainer>
        <div tw="flex items-center justify-between mb-4">
          <MainTitle>User Details</MainTitle>
          <DeleteProfileButton type="button" onClick={handleDelete}>
            <AiFillDelete tw="mr-2" />
            Profile
          </DeleteProfileButton>
        </div>
        <div tw="mb-4">
          <SecondaryTitle>User Information:</SecondaryTitle>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Role:</strong> {role}
          </p>
        </div>
        <div tw="mb-4">
          <SecondaryTitle>Address:</SecondaryTitle>
          {address?.map((addr) => (
            <div tw="mx-auto bg-white p-4 rounded-lg shadow-lg">
              <div key={addr._id}>
                <p>
                  <strong>Street:</strong> {addr.street}
                </p>
                <p>
                  <strong>Postal Code:</strong> {addr.postalCode}
                </p>
                <p>
                  <strong>City:</strong> {addr.city}
                </p>
                <p>
                  <strong>Country:</strong> {addr.country}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div tw="mb-4">
          <SecondaryTitle>Timestamps:</SecondaryTitle>
          <p>
            <strong>Created At:</strong> {createdAt}
          </p>
          <p>
            <strong>Updated At:</strong> {updatedAt}
          </p>
        </div>
      </ProfileContainer>
    </>
  );
};

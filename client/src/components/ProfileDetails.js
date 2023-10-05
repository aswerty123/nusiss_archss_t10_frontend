import React from 'react';
import 'tailwindcss/tailwind.css';
/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
import { AiFillDelete } from 'react-icons/ai';
import { useProfileQuery, useDeleteProfileMutation } from '../queries/user-queries';
import { useAuth } from '../context/AuthContext';

const ProfileContainer = tw.div`container mx-auto bg-white shadow-md rounded-md p-6`;
// const ProfileContainer = tw.div`container mx-auto lg:w-2/3 py-8 px-4`;
const DeleteProfileButton = tw.button`flex items-center bg-red-600 hover:bg-red-700 py-1 px-2 text-white font-bold rounded focus:outline-none`;
// const MainTitle = tw.div.h2`flex items-center justify-between mb-4 text-xl font-semibold text-gray-800`;
const MainTitle = tw.h2`text-2xl font-semibold mb-4 flex items-center`;
const SecondaryTitle = tw.h3`text-lg font-semibold mb-2`;
// const ProfileContainer = tw.div`flex items-center justify-center bg-gray-100 py-12`;
const ProfileCard = tw.div`bg-white rounded-lg shadow-lg p-8 max-w-screen-sm w-full`;
const DetailItem = tw.div`mb-6`;
const DetailLabel = tw.p`text-gray-600 text-sm mb-1`;
const DetailValue = tw.p`text-gray-800 font-semibold`;
const AddressItem = tw.div`mb-8`;
const Timestamps = tw.div`flex justify-between text-sm text-gray-600`;

export const ProfileDetails = () => {
  const profileQuery = useProfileQuery();
  const deleteProfileMutation = useDeleteProfileMutation();
  const { address, email, phone, createdAt, updatedAt } =
    profileQuery?.data || {};

    const { authData, logout } = useAuth();

    const handleDelete = (e) => {
        e.preventDefault();
        deleteProfileMutation.mutate();
        logout();
    }

  return (
    <>
      <ProfileContainer>
        <div className="flex items-center justify-between mb-4">
          <MainTitle>User Details</MainTitle>
          <DeleteProfileButton type="button" onClick={handleDelete}>
            <AiFillDelete className="mr-2" />
            Profile
          </DeleteProfileButton>
        </div>
        <div className="mb-4">
          <SecondaryTitle>User Information:</SecondaryTitle>
          {/* <p><strong>User ID:</strong> {_id}</p> */}
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
        </div>
        <div className="mb-4">
          <SecondaryTitle>Address:</SecondaryTitle>
          {address?.map((addr) => (
            <div className="mx-auto bg-white p-4 rounded-lg shadow-lg">
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

        <div className="mb-4">
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

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PostData } from '../utils';
import { useAddAddressMutation } from '../queries/user-queries';
import { AiOutlinePlus } from 'react-icons/ai';

/** @jsxImportSource @emotion/react */
import tw, { styled } from 'twin.macro';

const FormContainer = tw.div`container mx-auto lg:w-1/3 py-8 px-4`; // Set width to one-third of the page on large screens
const FormGroup = tw.div`mb-4`;
const LabelStyle = tw.label`block text-sm font-medium text-gray-600 mb-1`;
const AddAddressButton = tw.button`flex items-center bg-indigo-600 hover:bg-indigo-700 py-1 px-2 text-white font-bold rounded focus:outline-none `;
const MainTitle = tw.h2`text-2xl font-semibold mb-4`
export const AddAddressForm = () => {
  const [formData, setFormData] = useState({
    street: '',
    postalCode: '',
    city: '',
    country: '',
  });

  const addAddressMutation = useAddAddressMutation();

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAddressMutation.mutate({
      street: formData.street,
      postalCode: formData.postalCode,
      city: formData.city,
      country: formData.country,
    });
    setFormData({
      street: '',
      postalCode: '',
      city: '',
      country: '',
    });
  };

  return (
    <FormContainer>
      <MainTitle>Add Address</MainTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <LabelStyle>Street</LabelStyle>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyle>Postal Code</LabelStyle>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyle>City</LabelStyle>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyle>Country</LabelStyle>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <AddAddressButton type="button" onClick={handleSubmit}>
          <AiOutlinePlus className="mr-2" />
          Address
        </AddAddressButton>
      </form>
    </FormContainer>
  );
};

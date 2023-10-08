import React, { useState } from 'react';
import { useAddAddressMutation } from '../queries/user-queries';
import { AiOutlinePlus } from 'react-icons/ai';

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

const FormContainer = tw.div`mx-auto w-1/3 max-w-md mx-auto bg-white p-6 rounded-md shadow-md`; // Set width to one-third of the page on large screens
// const FormContainer = tw.div`container mx-auto lg:w-1/3 py-8 px-4`; // Set width to one-third of the page on large screens
const FormGroup = tw.div`grid grid-cols-1 gap-3 mt-4`;
// const FormGroup = tw.div`mb-4`;
const LabelStyle = tw.label`block text-sm font-medium text-gray-600`;
// const LabelStyle = tw.label`block text-sm font-medium text-gray-600 mb-1`;
const AddAddressButton = tw.button`flex items-center bg-indigo-600 hover:bg-indigo-700 py-1 px-2 text-white font-bold rounded focus:outline-none `;
const MainTitle = tw.h2`text-2xl font-semibold mb-4`;
// const MainTitle = tw.div.h2` mb-4 flex items-center justify-between text-lg font-semibold text-gray-800`
const InputStyle = tw.input`mt-1 p-2 w-full border rounded-md`;
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
          <InputStyle
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required="true"
          />
        </FormGroup>
        <FormGroup>
          <LabelStyle>Postal Code</LabelStyle>
          <InputStyle
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyle>City</LabelStyle>
          <InputStyle
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyle>Country</LabelStyle>
          <InputStyle
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <div tw="my-8">
          <AddAddressButton type="submit">
            <AiOutlinePlus tw="mr-2" />
            Address
          </AddAddressButton>
        </div>
      </form>
    </FormContainer>
  );
};

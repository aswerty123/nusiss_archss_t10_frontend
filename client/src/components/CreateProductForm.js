import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PostData } from '../utils';
import { useCreateProductMutation } from '../queries/product-queries';
import { AiOutlinePlus } from 'react-icons/ai';

/** @jsxImportSource @emotion/react */
import tw, { styled } from 'twin.macro';

const FormContainer = tw.div`mx-auto w-1/3 max-w-md mx-auto bg-white p-6 rounded-md shadow-md`;
const FormGroup = tw.div`grid grid-cols-1 gap-3 mt-4`;
const LabelStyle = tw.label`block text-sm font-medium text-gray-600`;
const AddAddressButton = tw.button`flex items-center bg-indigo-600 hover:bg-indigo-700 py-1 px-2 text-white font-bold rounded focus:outline-none `;
const MainTitle = tw.h2`text-2xl font-semibold mb-4`;
const InputStyle = tw.input`mt-1 p-2 w-full border rounded-md`;

/* New Product Create Request Body
{
        name: '',
        description: '',
        category_type: '',
        imageData: [{
            data: '',
            contentType:""
        }],
        quantity: '',
        price: '',
        active: ''
      }
*/
export const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    type: '',
    banner: '',
    unit: '',
    price: '',
    available: false,
    suplier: '',
  });

  const createProductMutation = useCreateProductMutation();

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProductMutation.mutate({
      name: formData.name,
      desc: formData.desc,
      type: formData.type,
      banner: formData.banner,
      unit: formData.unit,
      price: formData.price,
      available: formData.available,
      suplier: formData.suplier,
    });
    setFormData({
      name: '',
      desc: '',
      type: '',
      banner: '',
      unit: '',
      price: '',
      available: false,
      suplier: '',
    });
  };

  return (
    <FormContainer>
      <MainTitle>Create Product</MainTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <LabelStyle>Product Name</LabelStyle>
          <InputStyle
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyle>Product Description</LabelStyle>
          <InputStyle
            type="text"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyle>Product Type</LabelStyle>
          <InputStyle
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyle>Product Image Url</LabelStyle>
          <InputStyle
            type="text"
            name="banner"
            value={formData.banner}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyle>Quantity</LabelStyle>
          <InputStyle
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyle>Product Price</LabelStyle>
          <InputStyle
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyle>Availability</LabelStyle>
          <InputStyle
            type="checkbox"
            name="available"
            value={formData.available}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyle>Suplier</LabelStyle>
          <InputStyle
            type="text"
            name="suplier"
            value={formData.suplier}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <div tw="my-8">
          <AddAddressButton type="button" onClick={handleSubmit}>
            <AiOutlinePlus className="mr-2" />
            Address
          </AddAddressButton>
        </div>
      </form>
    </FormContainer>
  );
};

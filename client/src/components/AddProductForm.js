import React, { useState } from 'react';
import { useCreateProductMutation } from '../queries/product-queries';
import { AiOutlinePlus } from 'react-icons/ai';
import Compressor from 'compressorjs';

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

const FormContainer = tw.div`mx-auto w-1/3 max-w-md mx-auto bg-white p-6 rounded-md shadow-md`;
const FormGroup = tw.div`grid grid-cols-1 gap-0.5 mt-2`;
const LabelStyle = tw.label`block text-sm font-medium text-gray-600`;
const AddAddressButton = tw.button`flex items-center bg-indigo-600 hover:bg-indigo-700 py-1 px-2 text-white font-bold rounded focus:outline-none `;
const MainTitle = tw.h2`text-2xl font-semibold mb-4`;
const InputStyle = tw.input`mt-1 p-2 w-full border rounded-md`;
const InputStyleSelect = tw.select`mt-1 p-2 w-full border rounded-md`;
const ImageUploadContainer = tw.div`mt-2 flex items-center`;
const ImageUploadInput = tw.input`mt-1 p-2 w-full border rounded-md`;

export const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_type: '',
    imageData: '',
    quantity: '',
    price: '',
    active: true,
  });

  const createProductMutation = useCreateProductMutation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    var quality = 1.0;
    const finalImageSize = 50000;
    const fileSizeInBytes = file.size;

    if (fileSizeInBytes > finalImageSize) {
      quality = finalImageSize / fileSizeInBytes;
    }

    new Compressor(file, {
      quality: quality,
      success: (result) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            imageData: reader.result,
          }));
        };

        reader.readAsDataURL(result);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createProductMutation.mutate({
      name: formData.name,
      description: formData.description,
      category_type: formData.category_type,
      imageData: formData.imageData,
      quantity: formData.quantity,
      price: formData.price,
      active: formData.active,
    });

    // Reset the form and clear the input value
    setFormData({
      name: '',
      description: '',
      category_type: '',
      imageData: '',
      quantity: '',
      price: '',
      active: true,
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
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyle>Product Type</LabelStyle>
          <InputStyle
            type="text"
            name="category_type"
            value={formData.category_type}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyle>Product Images</LabelStyle>
          <ImageUploadContainer>
            <ImageUploadInput
              type="file"
              accept="image/*"
              name="imageData"
              onChange={handleImageChange}
              required
            />
          </ImageUploadContainer>
        </FormGroup>
        <div className="image-container">
          {formData.imageData && (
            <img
              src={formData.imageData}
              alt={`Selected Img ${formData.name}`}
              style={{ maxWidth: '100px' }}
            />
          )}
        </div>
        <FormGroup>
          <LabelStyle>Quantity</LabelStyle>
          <InputStyle
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyle>Product Price</LabelStyle>
          <InputStyle
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyle>
            Active (customer only can search when the product is active)
          </LabelStyle>
          <InputStyleSelect
            name="active"
            value={formData.active}
            onChange={handleChange}
            required
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </InputStyleSelect>
        </FormGroup>
        <div tw="my-8">
          <AddAddressButton type="submit">
            <AiOutlinePlus tw="mr-2" />
            Product
          </AddAddressButton>
        </div>
      </form>
    </FormContainer>
  );
};

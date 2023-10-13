import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PostData } from '../utils';
import { useCreateProductMutation } from '../queries/product-queries';
import { AiOutlinePlus } from 'react-icons/ai';
import Compressor from 'compressorjs';

/** @jsxImportSource @emotion/react */
import tw, { styled } from 'twin.macro';

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
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    type: '',
    imageData: '',
    unit: '',
    price: '',
    available: false,
    active: true,
  });

  const [imageDataShow, setImageData] = useState(''); // State to store the Base64-encoded image
  const imageInputRef = React.useRef(); //user to reset image after submit
  const createProductMutation = useCreateProductMutation();

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       banner: reader.result,
  //     }));
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageChange = (e) => {
    const files = e.target.files; // Get an array of selected files
    console.log(files);
    if (files.length > 0) {
      const base64Images = [];

      // Loop through each selected file and convert it to Base64
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();

        reader.onload = (event) => {
          // When the file is loaded, convert it to Base64
          const base64Image = event.target.result;
          base64Images.push(base64Image);

          // If we have processed all files, update the state
          if (base64Images.length === files.length) {
            setImageData(base64Images);
          }
        };

        reader.readAsDataURL(files[i]); // Read the file as a data URL (Base64)
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageData: files,
    }));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     const binaryString = atob(reader.result.split(',')[1]); // Extract base64 data
  //     const binaryData = new Uint8Array(binaryString.length);
  //     for (let i = 0; i < binaryString.length; i++) {
  //       binaryData[i] = binaryString.charCodeAt(i);
  //     }

  //     // Compress the binary data using pako
  //     const compressedData = pako.deflate(binaryData, { to: 'string' });

  //     // Set the compressed base64 data directly
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       banner: btoa(compressedData),
  //     }));
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleImageChange = (e) => {
  //   const files = e.target.files;
  //   const imageFiles = Array.from(files).map((file) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     return new Promise((resolve) => {
  //       reader.onloadend = () => {
  //         resolve({
  //           data: reader.result,
  //           contentType: file.type,
  //         });
  //       };
  //     });
  //   });

  //   Promise.all(imageFiles).then((images) => {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       images,
  //     }));
  //   });
  // };

  const handleChange = (e) => {
    // const { name, value, type, checked } = e.target;

    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   [name]: type === 'checkbox' ? checked : value,
    // }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleChange = (e) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = {
      name: formData.name,
      desc: formData.desc,
      type: formData.type,
      imageData: formData.imageData,
      unit: formData.unit,
      price: formData.price,
      available: formData.available,
      active: formData.active,
    };

    try {
      await createProductMutation.mutateAsync(formDataToSubmit); // Use mutateAsync to await the mutation
      // Reset the form and clear the input value
      setFormData({
        name: '',
        desc: '',
        type: '',
        imageData: '',
        unit: '',
        price: '',
        available: false,
        active: true,
      });
      imageInputRef.current.value = ''; // Reset the input field
      setImageData(''); // Clear the displayed images
    } catch (error) {
      // Handle any errors here
      console.error('Error:', error);
    }
  };

  return (
    <FormContainer>
      <MainTitle>Create Product</MainTitle>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
        {/* <FormGroup>
          <LabelStyle>Product Images</LabelStyle>
          <ImageUploadContainer>
            <ImageUploadInput type="file" onChange={handleImageChange} multiple required />
          </ImageUploadContainer>
        </FormGroup> */}
        <FormGroup>
          <LabelStyle>Product Images</LabelStyle>
          <ImageUploadContainer>
            <ImageUploadInput
              type="file"
              accept="image/*"
              multiple
              name="imageData"
              onChange={handleImageChange}
              required
              ref={imageInputRef}
            />
          </ImageUploadContainer>
        </FormGroup>
        <div className="image-container">
          {imageDataShow &&
            imageDataShow.map((imageData, index) => (
              <img
                key={index}
                src={imageData}
                alt={`Selected Image ${index + 1}`}
                style={{ maxWidth: '100px' }}
              />
            ))}
        </div>
        {/* <FormGroup>
          <LabelStyle>Product Image Url</LabelStyle>
          <InputStyle
            type="text"
            name="imageData"
            value={formData.imageData}
            onChange={handleChange}
            required
          />
        </FormGroup> */}
        <FormGroup>
          <LabelStyle>Quantity</LabelStyle>
          <InputStyle
            type="number"
            name="unit"
            value={formData.unit}
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
          <LabelStyle>Availability</LabelStyle>
          <InputStyle
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
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

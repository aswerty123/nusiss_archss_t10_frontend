import React from 'react';
import { AddProductForm } from '../components/AddProductForm';
import { DisplayProducts } from '../components/DisplayProducts';

export const CreateProduct = () => {
  return (
    <>
      <div className="flex">
        <DisplayProducts />
        <AddProductForm />
      </div>
    </>
  );
};

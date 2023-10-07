import React from 'react';
import { AddProductForm } from '../components/AddProductForm';
import { TestComponent } from '../components/TestComponent';
import { DisplayProducts } from '../components/DisplayProducts';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';

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

import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AddEditCategoryForm from './AddEditCategoryForm';
import AddEditProductForm from './AddEditProductForm';


export default function SideNav() {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const toggleShowAddCategory = () => {
    setShowAddCategory(!showAddCategory);
  }

  const toggleShowAddProduct = () => {
    setShowAddProduct(!showAddProduct);
  }

  return (
    <aside id="SideNav" className='border-r-4 border-r-emerald-500 pt-4 min-w-36 flex flex-col justify-between'>
      <ul className='list-none flex flex-col items-center gap-3'>
        <li><Link to="/" className='text-blue-500 hover:text-blue-700 hover:font-bold transition-all duration-300'>Home</Link></li>
        <li><Link to="/categories" className='text-blue-500 hover:text-blue-700 hover:font-bold transition-all duration-300'>Categories</Link></li>
        <li><Link to="/products" className='text-blue-500 hover:text-blue-700 hover:font-bold transition-all duration-300'>Products</Link></li>
        <li><button onClick={toggleShowAddCategory} className='text-cyan-600 hover:font-bold transition-all duration-300'>Add Category</button></li>
        <li><button onClick={toggleShowAddProduct} className='text-cyan-600 hover:font-bold transition-all duration-300'>Add Product</button></li>
      </ul>
      {showAddCategory ? (<AddEditCategoryForm setShowAddCategory={toggleShowAddCategory}/>) : (<div></div>)}
      {showAddProduct ? (<AddEditProductForm setShowAddProduct={toggleShowAddProduct}/>) : (<div></div>)}
      <footer className='mb-1 ml-1 text-xs'>By<a href="https://github.com/bnoora"> Bnoora</a></footer>
    </aside>
  );
}
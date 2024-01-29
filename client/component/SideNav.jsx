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
    <aside id="SideNav">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><button onClick={toggleShowAddCategory}>Add Category</button></li>
        <li><button onClick={toggleShowAddProduct}>Add Product</button></li>
      </ul>
      {showAddCategory ? (<AddEditCategoryForm setShowAddCategory={toggleShowAddCategory}/>) : (<div></div>)}
      {showAddProduct ? (<AddEditProductForm setShowAddProduct={toggleShowAddProduct}/>) : (<div></div>)}
    </aside>
  );
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';

export default function AddEditProductForm(props) {
    const { product, setShowAddProduct, setShowEdit } = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/categories')
        .then((response) => {
            setCategories(response.data.categories);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setCategories([]);
            setIsLoading(false);
        })
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setSelectedCategoryId(product.category._id);
            setPrice(product.price);
            setStock(product.stock);
        }
    }, []);

    const handleChange = (event) => {
        if (event.target.name === 'name') {
            setName(event.target.value);
        } else if (event.target.name === 'description') {
            setDescription(event.target.value);
        } else if (event.target.name === 'category') {
            setSelectedCategoryId(event.target.value);
        } else if (event.target.name === 'price') {
            setPrice(event.target.value);
        } else if (event.target.name === 'stock') {
            setStock(event.target.value);
        }
    }

    const handleOutsideClick = (event) => {
        if (!event.target.closest('#AddEditProductForm')) {
            if (product) {
                setShowEdit(false);
            } else {
                setShowAddProduct(false);
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (product) {
            axios.put(`/api/item/${product._id}`, {
                name: name,
                description: description,
                category: selectedCategoryId,
                price: price,
                stock: stock
            })
            .then((response) => {
                console.log(response);
                setShowEdit(false);
            })
            .catch((error) => {
                console.log(error);
            })
        } else {
            axios.post('/api/item/create', {
                name: name,
                description: description,
                category: selectedCategoryId,
                price: price,
                stock: stock
            })
            .then((response) => {
                setShowAddProduct(false);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }


    return (
        
        <div onClick={handleOutsideClick} className='bg-gray-800 min-h-screen min-w-full fixed bg-opacity-30 top-0'>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                <form onSubmit={handleSubmit} id='AddEditProductForm' className='flex-col gap-2 fixed top-1/2 left-1/2
                                                                                bg-slate-100 p-8 shadow-lg rounded transform 
                                                                                -translate-x-1/2 -translate-y-1/2 flex 
                                                                                justify-center items-center'>
                    <label htmlFor="name" className='select-none' >Name</label>
                    <input type="text" name="name" value={name} onChange={handleChange}
                            className='rounded-lg border-green-600 
                            border-2 bg-slate-300 outline-none p-1 text-center'/>
                    <label htmlFor="description" className='select-none'>Description</label>
                    <input type="text" name="description" value={description} onChange={handleChange}
                            className='rounded-lg border-green-600 
                            border-2 bg-slate-300 outline-none p-1 text-center'/>
                    <label htmlFor="category" className='select-none'>Category</label>
                    <select name="category" value={selectedCategoryId} onChange={handleChange}>
                        {categories?.map((category) => {
                            return (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            );
                        })}
                    </select>
                    <label htmlFor="price" className='select-none'>Price</label>
                    <input type="text" name="price" value={price} onChange={handleChange}
                    className='rounded-lg border-green-600 
                    border-2 bg-slate-300 outline-none p-1 text-center'/>
                    <label htmlFor="stock" className='select-none'>Stock</label>
                    <input type="text" name="stock" value={stock} onChange={handleChange}
                    className='rounded-lg border-green-600 
                    border-2 bg-slate-300 outline-none p-1 text-center'/>
                    <input type="submit" value="Submit" className='border-3 border-black 
                                                        bg-slate-400 p-2 pr-4 pl-4 rounded-xl 
                                                        hover:bg-slate-300 mt-1 transition-colors 
                                                        duration-200 hover:cursor-pointer'/>
                </form>
                </>
            )}

        </div>
    )

}

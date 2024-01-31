import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddEditCategoryForm(props) {
    const { category, setShowAddCategory, setShowEdit } = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (category) {
            setName(category.name);
            setDescription(category.description);
        }
    }, []);

    const handleChange = (event) => {
        if (event.target.name === 'name') {
            setName(event.target.value);
        } else if (event.target.name === 'description') {
            setDescription(event.target.value);
        }
    };

    const handleOutsideClick = (event) => {
        if (!event.target.closest('#AddEditCategoryForm')) {
            if (category) {
                setShowEdit(false);
            } else {
                setShowAddCategory(false);
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (category) {
            axios.put(`/api/category/${category._id}`, {
                name: name,
                description: description
            })
            .then((response) => {
                setShowEdit(false);
            })
            .catch((error) => {
                console.log(error);
            })
        } else {
            axios.post('/api/category/create', {
                name: name,
                description: description
            })
            .then((response) => {
                setShowAddCategory(false);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    return (
        <div onClick={handleOutsideClick} className='bg-gray-800 min-h-screen min-w-full fixed 
                                                    bg-opacity-30 top-0 left-0 right-0'>
                <form  id='AddEditCategoryForm' onSubmit={handleSubmit} 
                        className='flex-col gap-2 fixed  top-1/2 left-1/2 bg-slate-100 p-8 
                        shadow-lg rounded transform -translate-x-1/2 
                        -translate-y-1/2 flex justify-center items-center'>
                    <label htmlFor="name" className='select-none'>Name</label>
                    <input type="text" name="name" value={name} 
                            onChange={handleChange} className='rounded-lg border-green-600 
                            border-2 bg-slate-300 outline-none p-1 text-center'/>
                    <label htmlFor="description" className='select-none'>Description</label>
                    <input type="text" name="description" value={description} 
                    onChange={handleChange}  className='rounded-lg border-green-600 
                    border-2 bg-slate-300 outline-none p-1 text-center' />
                    <input type="submit" value="Submit" className='border-3 border-black 
                                                                bg-slate-400 p-2 pr-4 pl-4 rounded-xl 
                                                                hover:bg-slate-300 mt-1 transition-colors 
                                                                duration-200 hover:cursor-pointer'/>
                </form>
        </div>
    )
}
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
    }

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
        <div id="AddEditCategoryForm">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={name} onChange={handleChange}/>
                <label htmlFor="description">Description</label>
                <input type="text" name="description" value={description} onChange={handleChange}/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}
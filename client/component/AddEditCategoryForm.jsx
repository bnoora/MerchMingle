import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddEditCategoryForm(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
 
    useEffect(() => {
        if (props.category) {
            setName(props.category.name);
            setDescription(props.category.description);
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
        if (props.category) {
            axios.put(`/api/category/${props.category.id}`, {
                name: name,
                description: description
            })
            .then((response) => {
                props.setShowEdit(false);
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
                props.setShowAddCategory(false);
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddEditProductForm(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    useEffect(() => {
        axios.get('/api/category')
        .then((response) => {
            setCategories(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
        if (props.product) {
            setName(props.product.name);
            setDescription(props.product.description);
            setSelectedCategoryId(props.product.category_id);
            setPrice(props.product.price);
            setStock(props.product.stock);
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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.product) {
            axios.put(`/api/item/${props.product.id}`, {
                name: name,
                description: description,
                category_id: selectedCategoryId,
                price: price,
                stock: stock
            })
            .then((response) => {
                props.setShowEdit(false);
            })
            .catch((error) => {
                console.log(error);
            })
        } else {
            axios.post('/api/item', {
                name: name,
                description: description,
                category_id: selectedCategoryId,
                price: price,
                stock: stock
            })
            .then((response) => {
                props.setShowAddProduct(false);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    return (
        <div id="AddEditProductForm">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={name} onChange={handleChange}/>
                <label htmlFor="description">Description</label>
                <input type="text" name="description" value={description} onChange={handleChange}/>
                <label htmlFor="category">Category</label>
                <select name="category" value={selectedCategoryId} onChange={handleChange}>
                    {categories.map((category) => {
                        return (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        );
                    })}
                </select>
                <label htmlFor="price">Price</label>
                <input type="text" name="price" value={price} onChange={handleChange}/>
                <label htmlFor="stock">Stock</label>
                <input type="text" name="stock" value={stock} onChange={handleChange}/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}  
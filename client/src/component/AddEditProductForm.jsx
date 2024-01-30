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
        
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={handleChange}/>
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" value={description} onChange={handleChange}/>
                    <label htmlFor="category">Category</label>
                    <select name="category" value={selectedCategoryId} onChange={handleChange}>
                        {categories?.map((category) => {
                            return (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            );
                        })}
                    </select>
                    <label htmlFor="price">Price</label>
                    <input type="text" name="price" value={price} onChange={handleChange}/>
                    <label htmlFor="stock">Stock</label>
                    <input type="text" name="stock" value={stock} onChange={handleChange}/>
                    <input type="submit" value="Submit"/>
                </form>
                </>
            )}

        </div>
    )

}

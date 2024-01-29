import axios from 'axios';
import { useState, useEffect } from 'react';
import ItemDiv from '../components/ItemDiv';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        axios.get('/api/items')
        .then((response) => {
            setProducts(response.data.products);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        axios.get('/api/categories')
        .then((response) => {
            setCategories(response.data.categories);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    return (
        <div>
            <h1>Products</h1>
            <select onChange={handleCategoryChange}>
                <option value="All">All</option>
                {categories.map((category) => {
                return (
                    <option key={category.id} value={category.id}>{category.name}</option>
                );
            })}
            </select>
            <div>
            {products.map((product) => {
                if (selectedCategory === 'All' || product.category === selectedCategory) {
                    return (
                        <ItemDiv key={product.id} item={product} category={false} />
                    );
                }
                return null;
            })}
            </div>
        </div>
    )
}
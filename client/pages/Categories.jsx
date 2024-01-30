import axios from 'axios';
import { useState, useEffect } from 'react';
import ItemDiv from '../component/ItemDiv';


export default function Categories () {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/api/categories')
        .then((response) => {
            setCategories(response.data.categories);
        })
        .catch((error) => {
            console.log(error);
            setCategories([]);
        })
    }, []);

    useEffect(() => {
    } , [categories]);

    return (
        <div>
            <h1>Categories</h1>
            {categories.length === 0 ? (
                <p>No categories</p>
            ) : (
                categories.map((category) => (
                    <ItemDiv key={category._id} item={category} category={true} />
                ))
            )}
        </div>
    );    
}
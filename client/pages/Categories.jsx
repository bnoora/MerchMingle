import axios from 'axios';
import { useState, useEffect } from 'react';
import ItemDiv from '../components/ItemDiv';

export default function Categories () {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/api/categories')
        .then((response) => {
            setCategories(response.data.categories);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <div>
            <h1>Categories</h1>
            {categories.map((category) => {
                return (
                    <ItemDiv key={category.id} item={category} category={true}/>
                );
            })}
        </div>
    )
}
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
        <div className='ml-10 mr-10'>
            <h1 className='text-4xl font-Kalam font-bold mt-3 mb-4 select-none'>Categories</h1>
            <div className='mt-4 grid gap-4 place-items-center grid-cols-myGrid 
                            sm:grid-cols-myGrid2 md:grid-cols-myGrid3 lg:grid-cols-myGrid4'>
            {categories.length === 0 ? (
                <p>No categories</p>
            ) : (
                categories.map((category) => (
                    <ItemDiv key={category._id} item={category} category={true} />
                ))
            )}
            </div>
        </div>
    );    
}
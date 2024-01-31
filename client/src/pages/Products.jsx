import axios from 'axios';
import { useState, useEffect } from 'react';
import ItemDiv from '../component/ItemDiv';
import Loading from '../component/Loading';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/bothitemcategories')
        .then((response) => {
            setProducts(response.data.items);
            setCategories(response.data.categories);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setProducts([]);
            setCategories([]);
            setIsLoading(false);
        })
    } , []);

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    return (
        <div flex flex-col gap-3 justify-center items-center>
            {isLoading ? (
                <Loading />
            ) : (
                <>
{                    console.log(products)}
                    <h1 className='text-4xl font-Kalam font-bold mt-3 mb-4 select-none'>Products</h1>
                    <select onChange={handleCategoryChange}
                    className='border-black rounded-xl border-2 p-3'>
                        <option value="All">All</option>
                        {categories.map((category) => {
                        return (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        );
                    })}
                    </select>
                    <div className=' mt-4 grid gap-4 place-items-center grid-cols-myGrid 
                            sm:grid-cols-myGrid2 md:grid-cols-myGrid3 lg:grid-cols-myGrid4'>
                    {products.map((product) => {
                        if (selectedCategory === 'All' || product.category._id === selectedCategory) {
                            return (
                                <ItemDiv key={product._id} item={product} category={false} />
                            );
                        }
                        return null;
                    })}
                    </div>
                </>
            )}
        </div>
    )
}
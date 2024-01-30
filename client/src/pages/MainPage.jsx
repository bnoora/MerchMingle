import axios from 'axios';
import { useState, useEffect } from 'react';

export default function MainPage() {
    const [numCategories, setNumCategories] = useState(0);
    const [numItems, setNumItems] = useState(0);
    
    useEffect(() => {
        axios.get('/api/get-index')
        .then((response) => {
            setNumCategories(response.data.numCategories);
            setNumItems(response.data.numItems);
        })
        .catch((error) => {
            console.log(error);
        })
    });

    useEffect(() => {
    }, [numCategories, numItems]);
    
    return (
        <div id='mainPage' className='flex-grow text-center flex flex-col justify-center'>
            <h1 className='font-extrabold text-9xl mb-52 font-GloriaHallelujah cursor-default select-none'>Merch Mingle!</h1>
            <p className='text-lg'>Our Gloriuos Bussiness has {numCategories} categories</p>
            <p className='text-lg'>Our Gloriuos Bussiness has {numItems} products</p>
        </div>
    )
}
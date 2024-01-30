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
        <div id="MainPage">
            <h1>Merch Mingle!</h1>
            <p>Our Gloriuos Bussiness has {numCategories} categories</p>
            <p>Our Gloriuos Bussiness has {numItems} products</p>
        </div>
    )
}
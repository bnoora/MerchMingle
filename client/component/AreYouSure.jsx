import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AreYouSure(props) {
    const { item, category, setShowSure } = props;
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    

    const deleteItem = () => {
        if (category === true) {
            axios.delete(`/api/category/delete/${item}`)
            .then((response) => {
                setShowSure(false);
                navigate('/categories');
            })
            .catch((error) => {
                setShowError(true);
                setErrorMessage(error.response?.data?.error || "An error occurred.");
            });
        }
        else {
            axios.delete(`/api/item/delete/${item}`)
            .then((response) => {
                setShowSure(false);
                navigate('/products');
            })
            .catch((error) => {
                setShowError(true);
                setErrorMessage(error.response?.data?.error || "An error occurred.");
            })
        }
    }

    useEffect(() => {
    }, [showError, errorMessage]);

    return (
        <div>
            <h1>Are you sure you want to delete {item.name}?</h1>
            <button onClick={deleteItem}>Yes</button>
            <Link to={category ? '/categories' : '/products'}>
                <button>No</button>
            </Link>
            {showError ? (<p>{errorMessage}</p>) : (<div></div>)}
        </div>
    )
}
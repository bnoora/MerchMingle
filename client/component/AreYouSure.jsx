import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

export default function AreYouSure(props) {
    const { item, category } = props;
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    

    const deleteItem = () => {
        setShowError(false);
        axios.delete(`/api/${category ? 'category' : 'product'}/${item.id}`)
        .then((response) => {
            if (response.status === 200) {
                props.setShowSure(false);
                return <Navigate to={category ? '/categories' : '/products'}/>

            }
            else {
                setShowError(true);
                setErrorMessage(response.data.error);
            }
        }
        )
    }

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
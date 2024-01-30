import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AreYouSure(props) {
    const { item, category, setShowSure } = props;
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    
    const handleOutsideClick = (event) => {
        if (!event.target.closest('#AreYouSure')) {
            setShowSure(false);
        }
    };

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
        <div onClick={handleOutsideClick} className='bg-gray-800 min-h-screen min-w-full fixed 
                                                        bg-opacity-30 top-0 left-0'>
            <div id='AreYouSure' className='flex-col gap-2 fixed top-1/2 left-1/2
                                            bg-slate-100 p-8 shadow-lg rounded-3xl transform 
                                            -translate-x-1/2 -translate-y-1/2 flex 
                                            justify-center items-center'>
                <h1>Are you sure you want to delete {item.name}?</h1>
                <section className='flex flex-row gap-4 justify-center mt-4 mb-3'>
                <button onClick={deleteItem} className='bg-red-500 pr-4 pl-4 
                                                        hover:bg-red-600 rounded-2xl flex flex-row 
                                                        items-center text-center'>Yes</button>
                    <Link to={category ? '/categories' : '/products'}>
                        <button className='bg-blue-500 pr-4 pl-4 hover:bg-blue-600 
                                            rounded-2xl flex flex-row items-center 
                                            text-center'>No</button>
                    </Link>
                </section>
                {showError ? (<p>{errorMessage}</p>) : (<div></div>)}
            </div>
        </div>
    )
}
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DeleteButton from '../component/DeleteButton.jsx';
import EditButton from '../component/EditButton.jsx';
import AddEditProductForm from '../component/AddEditProductForm.jsx';
import AreYouSure from '../component/AreYouSure';
import Loading from '../component/Loading';

export default function ProductPage() {
    const ItemId = useParams().id;
    const [product, setProduct] = useState({});
    const [showSure, setShowSure] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/item/${ItemId}`)
        .then((response) => {
            setProduct(response.data.item);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(ItemId + " " + 1);
            setIsLoading(false);
        })
    }, [showEdit]);

    const toggleShowSure = () => {
        setShowSure(!showSure);
    }

    const toggleShowEdit = () => {
        setShowEdit(!showEdit);
    }

    return (
        <div className='mt-24'>
            {isLoading ? (
                <Loading />
            ) : (
                <div className='flex flex-col gap-3 justify-center items-center'>
                    <h1 className='font-bold text-3xl'>{product?.name}</h1>
                    <p className='text-s'>{product?.description}</p>
                    <p className='flex flex-row gap-10 justify-center'>{product?.category.name}</p>
                    <div className='flex flex-row gap-3'>
                        <p className='font-bold'>Price:</p>
                        <p>{product?.price}</p>
                    </div>
                    <div className='flex flex-row gap-3'>
                        <p className='font-bold'>Stock:</p>
                        <p>{product?.stock}</p>
                    </div>
                    <div className='flex flex-row gap-10 justify-center'>
                        <DeleteButton setShowSure={toggleShowSure}/>
                        <EditButton setShowEdit={toggleShowEdit}/>
                    </div>
                    {showSure ? (<AreYouSure item={product?._id} category={false} 
                                setShowSure={toggleShowSure}/>) : (<div></div>)}
                    {showEdit ? (<AddEditProductForm product={product} 
                                setShowEdit={toggleShowEdit}/>) : (<div></div>)}
                </div>
            )}

        </div>
    )

}
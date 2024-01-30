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
        
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                <h1>{product?.name}</h1>
                <p>{product?.description}</p>
                <p>{product?.category.name}</p>
                <div>
                    <p>{product?.price}</p>
                    <p>{product?.stock}</p>
                </div>
                <DeleteButton setShowSure={toggleShowSure}/>
                <EditButton setShowEdit={toggleShowEdit}/>
                {showSure ? (<AreYouSure item={product?._id} category={false} 
                            setShowSure={toggleShowSure}/>) : (<div></div>)}
                {showEdit ? (<AddEditProductForm product={product} 
                            setShowEdit={toggleShowEdit}/>) : (<div></div>)}
                </>
            )}

        </div>
    )

}
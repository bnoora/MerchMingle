import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DeleteButton from '../components/DeleteButton.jsx';
import EditButton from '../components/EditButton.jsx';
import AddEditProductForm from '../components/AddEditProductForm.jsx';
import AreYouSure from '../component/AreYouSure';

export default function ProductPage() {
    const {ItemId} = useParams().id;
    const [product, setProduct] = useState();
    const [showSure, setShowSure] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        axios.get(`/api/item/${ItemId}`)
        .then((response) => {
            setProduct(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const toggleShowSure = () => {
        setShowSure(!showSure);
    }

    const toggleShowEdit = () => {
        setShowEdit(!showEdit);
    }

    return (
        <div id="ProductPage">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.category}</p>
            <div>
                <p>{product.price}</p>
                <p>{product.stock}</p>
            </div>
            <DeleteButton setShowSure={toggleShowSure}/>
            <EditButton setShowEdit={toggleShowEdit}/>
            {showSure ? (<AreYouSure item={product.id} category={false} 
                        setShowSure={toggleShowSure}/>) : (<div></div>)}
            {showEdit ? (<AddEditProductForm product={product} 
                        setShowEdit={toggleShowEdit}/>) : (<div></div>)}
        </div>
    )

}
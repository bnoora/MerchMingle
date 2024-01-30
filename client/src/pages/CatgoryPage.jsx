import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AreYouSure from '../component/AreYouSure';
import DeleteButton from '../component/DeleteButton';
import EditButton from '../component/EditButton';
import AddEditCategoryForm from '../component/AddEditCategoryForm';
import ItemDiv from '../component/ItemDiv';
import Loading from '../component/Loading';

export default function CatgoryPage() {
    const [category, setCategory] = useState();
    const [items, setItems] = useState([]);
    const categoryId = useParams().id;
    const [showSure, setShowSure] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios.get(`/api/category/${categoryId}`)
        .then((response) => {
            setCategory(response.data.category);
            setItems(response.data.items);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
            console.log(response.data.error);
            setErrorMessage(response.data.error);
            setShowError(true);
        });
    }, [showEdit]);


    const toggleShowSure = () => {
        setShowSure(!showSure);
    }

    const toggleShowEdit = () => {
        setShowEdit(!showEdit);
    }

    useEffect(() => {
    }, [category, items]);

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <h1>{category?.name}</h1>
                    <p>{category?.description}</p>
                    <DeleteButton setShowSure={toggleShowSure}/>
                    <EditButton setShowEdit={toggleShowEdit}/>
                    {items.map((item) => (
                        <ItemDiv key={item._id} item={item} category={false}/>
                    ))}
                    {showSure && (
                        <AreYouSure item={category?._id} category={true} 
                        setShowSure={toggleShowSure}/>
                    )}
                    {showEdit && (
                        <AddEditCategoryForm category={category} 
                        setShowEdit={toggleShowEdit}/>
                    )}
                </>
            )}
        </div>
    );
    
}
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AreYouSure from '../component/AreYouSure';
import DeleteButton from '../component/DeleteButton';
import EditButton from '../component/EditButton';
import AddEditCategoryForm from '../component/AddEditCategoryForm';
import ItemDiv from '../component/ItemDiv';

export default function CatgoryPage() {
    const [category, setCategory] = useState();
    const [items, setItems] = useState([]);
    const categoryId = useParams().id;
    const [showSure, setShowSure] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        axios.get(`/api/category/${categoryId}`)
        .then((response) => {
            setCategory(response.data.category);
            setItems(response.data.items);
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
        <div>
            <h1>{category.name}</h1>
            <p>{category.description}</p>
            <DeleteButton setShowSure={toggleShowSure}/>
            <EditButton setShowEdit={toggleShowEdit}/>
            {items.map((item) => {
                return (
                    <ItemDiv key={item.id} item={item} category={false}/>
                );
            })}
            {showSure ? (<AreYouSure item={category.id} category={true} 
                        setShowSure={toggleShowSure}/>) : (<div></div>)}
            {showEdit ? (<AddEditCategoryForm category={category} 
                        setShowEdit={toggleShowEdit}/>) : (<div></div>)}
            
        </div>
    )
}
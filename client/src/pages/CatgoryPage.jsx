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
        axios.get(`http://localhost:3000/api/category/${categoryId}`)
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
        <div className='mt-24'>
            {isLoading ? (
                <Loading />
            ) : (
                <div className='flex flex-col gap-3 justify-center items-center'>
                    <h1 className='font-bold text-3xl'>{category?.name}</h1>
                    <p className='text-s'>{category?.description}</p>
                    <section className='flex flex-row gap-10 justify-center'>
                        <DeleteButton setShowSure={toggleShowSure}/>
                        <EditButton setShowEdit={toggleShowEdit}/>
                    </section>
                    <section className=' mt-4 grid gap-4 place-items-center grid-cols-myGrid sm:grid-cols-myGrid2 md:grid-cols-myGrid3'>
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
                    </section>
                </div>
            )}
        </div>
    );
    
}
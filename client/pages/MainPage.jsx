import axios from 'axios';

export default function MainPage() {
    [numCategories, setNumCategories] = useState(0);
    [numItems, setNumItems] = useState(0);
    
    useEffect(() => {
        axios.get('/api/get-index')
        .then((response) => {
            setNumCategories(response.data.numCategories);
            setNumProducts(response.data.numItems);
        })
        .catch((error) => {
            console.log(error);
        })
    });
    
    return (
        <div id="MainPage">
            <h1>Merch Mingle!</h1>
            <p>Our Gloriuos Bussiness has {categories} categories</p>
            <p>Our Gloriuos Bussiness has {products} products</p>
        </div>
    )
}
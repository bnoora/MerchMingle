import { useNavigate } from 'react-router-dom';

export default function ItemDiv(props) {
    const { item, category } = props;
    const navigate = useNavigate();

    const handleClick = () => {
        if (category) {
            navigate(`/categories/${item._id}`);
        } else {
            navigate(`/products/${item._id}`);
        }
    }

    return (
        <div className='bg-slate-200 min-h-20 shadow-itemshadow max-w-60 min-w-52
                        rounded-lg hover:scale-105 hover:shadow-itemshadowhover
                        transition-all duration-500 hover:cursor-pointer
                        border-t-2 border-l-2 border-black
                        flex items-center justify-center'
                onClick={handleClick}>
            {category ? (
                <h2>{item.name}</h2>
            ) : (
                <h2>{item.name}</h2>
            )}
        </div>
    )   
}
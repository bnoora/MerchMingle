import { Link } from 'react-router-dom';

export default function SearchResultDiv(props) {
    const { item, category } = props;

    return (
        <div className="SearchResultDiv">
            {category ? (
                <Link to={`/categories/${item.id}`}>
                    <h2>{item.name}</h2>
                </Link>
            ) : (
                <Link to={`/products/${item.id}`}>
                    <h2>{item.name}</h2>
                </Link>
            )}
        </div>
    )   
}
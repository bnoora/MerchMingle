import SearchResultDiv from './SearchResultDiv.jsx';

export default function SearchResults(props) {
    const {searchArray, category} = props;

    return (
        <div>
            {searchArray.map((item) => {
                return (
                    <SearchResultDiv item={item} category={category}/>
                )
            })}
        </div>
    )
}
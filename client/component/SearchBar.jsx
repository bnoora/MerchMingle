import SearchResults from "./SearchResults.jsx";

export default function SearchBar(props) {
    const {list, category} = props;
    const [searchArray, setSearchArray] = useState(list);
    const [search, setSearch] = useState('');

    return (
        <div>
            <input type="text" onChange={(e) => {
                setSearch(e.target.value);
                setSearchArray(list.filter((item) => {
                    return item.name.toLowerCase().includes(e.target.value.toLowerCase());
                }))
            }}/>
            <SearchResults searchArray={searchArray} category={category}/>
        </div>
    )
}
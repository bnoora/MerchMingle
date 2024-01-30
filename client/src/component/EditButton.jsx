export default function EditButton(props) {
    const {setShowEdit} = props;
    return (
        <div>
            <button onClick={() => setShowEdit(true)}
            className="bg-blue-500 hover:bg-blue-600 rounded-2xl 
                        flex flex-row justify-center w-16 h-8 items-center
                        transition-colors duration-200 hover:cursor-pointer"
            >Edit</button>
        </div>
    )
}
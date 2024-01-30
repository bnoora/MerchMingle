export default function DeleteButton(props) {
    const {setShowSure} = props;
    return (
        <div>
            <button onClick={() => setShowSure(true)}
            className='bg-red-500 hover:bg-red-600 rounded-2xl w-16 h-8 
            flex flex-row items-center justify-center
            transition-colors duration-200 hover:cursor-pointer
            '>Delete</button>
        </div>
    )
}

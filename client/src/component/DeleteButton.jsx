export default function DeleteButton(props) {
    const {setShowSure} = props;
    return (
        <div>
            <button onClick={() => setShowSure(true)}>Delete</button>
        </div>
    )
}

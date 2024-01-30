export default function EditButton(props) {
    const {setShowEdit} = props;
    return (
        <div>
            <button onClick={() => setShowEdit(true)}>Edit</button>
        </div>
    )
}
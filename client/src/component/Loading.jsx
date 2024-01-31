export default function Loading() {
    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='w-11 h-11 rounded-myRadius bg-gradient-to-r from-green-500 to-blue-500 animate-spin'>
                <div className='w-full h-full flex items-center justify-center'>
                    <div className='w-10 h-10 rounded-myRadius'></div>
                </div>
            </div>
        </div>
    )
}
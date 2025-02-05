function Pantry({id, name, lastUpdated, type, numberOfItems, onClick, className}) {

    const typeStyles = {
        fridge: 'bg-storage-fridge',
        shelf: 'bg-storage-shelf',
        frozen: 'bg-storage-frozen',
    };


    const backgroundStyle = typeStyles[type] || 'bg-gray-200';

    return (
        <button className={`w-full h-fit flex flex-col items-center p-3 rounded-2xl shadow-2xl ${backgroundStyle} ${className}`}
        onClick={onClick}>
            <div className="flex flex-row justify-between gap-10 w-full items-center">
                <h1 className="text-3xl font-bold">{name}</h1>
            </div>
            <p className=" flex h-full justify-center mt-5 text-center text-xl">
                Items: {numberOfItems} | Last Updated: {lastUpdated} | Type: {type}
            </p>

        </button>
    );
}

export default Pantry;
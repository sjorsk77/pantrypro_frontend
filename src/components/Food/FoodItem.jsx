import {deleteFood} from "../../api/ApiWrapper";

function FoodItem({id, name, expiryDate, weight, onClick}) {

    const expirationStyles = {
        long: 'bg-expiry-long',
        soon: 'bg-expiry-soon',
        short: 'bg-expiry-short',
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Pad single digit days
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }


    const getBackgroundStyle = (expiryDate) => {
        if (!expiryDate) return 'bg-gray-200'; // Handle null expiry date

        const currentDate = new Date();
        const expiry = new Date(expiryDate);
        const timeDifference = expiry - currentDate; // Time difference in milliseconds
        const daysUntilExpiry = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

        if (daysUntilExpiry < 0) return 'bg-gray-200'; // Expired
        if (daysUntilExpiry === 1) return expirationStyles.short; // 1 day away
        if (daysUntilExpiry <= 3) return expirationStyles.soon; // 2 to 3 days away
        return expirationStyles.long; // More than 3 days away
    };

    const handleDelete = async () => {
        try {
            const response = await deleteFood(id);
            onClick();
        } catch (error) {

        }
    }


    const backgroundStyle = getBackgroundStyle(expiryDate);

    return (
        <div className={`w-full h-fit flex flex-row items-center p-3 rounded-2xl gap-10`}
             onClick={onClick}>
            <button
                className={`flex flex-row justify-between gap-10 w-full items-center ${backgroundStyle} rounded-md p-3`}>
                <h1 className="text-3xl font-bold">{name}</h1>
                <h1 className="text-3xl font-bold">{weight}kg</h1>
                <h1>{formatDate(expiryDate)}</h1>
            </button>
            <button className="bg-amber-200 p-2 rounded-md flex justify-center items-center">
                <box-icon type='solid' name='pencil'></box-icon>
            </button>
            <button onClick={handleDelete} className="bg-red-600 p-2 rounded-md flex justify-center items-center">
            <box-icon name='minus'></box-icon>
            </button>

        </div>
    );
}

export default FoodItem;
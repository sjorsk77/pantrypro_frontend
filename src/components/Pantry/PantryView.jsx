import React, {useEffect, useState} from 'react';
import useApiWrapper from "../../api/ApiWrapper";
import FoodItem from "../Food/FoodItem";
import AddFood from "../Food/AddFood";
import {toast} from "react-toastify";
import {Dropdown} from "../Inputs/Dropdown";



function PantryView({pantryId, onPantryDelete}) {

    const {getFood, getPantry, deletePantry} = useApiWrapper();

    const [foods, setFoods] = useState([]);
    const [pantry, setPantry] = useState({});
    const [popupVisible, setPopupVisible] = useState(false);

    const getFoods = async () => {
        if (!pantryId) return; // Early exit if no pantryId is selected

        try {
            const response = await getFood(pantryId);
            setFoods(response);
        } catch (error) {
        }
    };

    const getPantryData = async () => {
        if (!pantryId) return; // Early exit if no pantryId is selected

        try {
            const response = await getPantry(pantryId);
            console.log(response);
            setPantry(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getFoods().then(r => console.log(r));
        getPantryData().then(r => console.log(r));
    }, [pantryId]);

    const handleAddFoodClick = () => {
        setPopupVisible(true);
    };

    const handleSort = (type) => {
        if (type === 'Expiry date') {
            setFoods([...foods].sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)));
        } else if (type === 'Name') {
            setFoods([...foods].sort((a, b) => a.name.localeCompare(b.name)));
        }

    }

    const handleDeletePantry = async () => {
        try {
            await deletePantry(pantryId);
            onPantryDelete();
            toast.success('Pantry deleted');
        } catch (error) {
            toast.error(error.message);
        }
    };


    return (
        <div className="flex flex-col items-center w-full h-fit">
            <div className=" flex flex-row justify-between w-full">
                <h1 className="text-3xl font-bold py-5">{pantry.name}</h1>
                <button className="bg-green-300 text-gray-700 px-4 py-2 rounded-md mr-2 my-5"
                        onClick={handleAddFoodClick}>add food
                </button>
                <button className="bg-red-400 text-gray-700 px-4 py-2 rounded-md mr-2 my-5"
                        onClick={handleDeletePantry}>Delete pantry
                </button>

            </div>
            <div className="flex flex-col  bg-white w-full h-full rounded-2xl">
                <div className="flex flex-row w-full items-center justify-evenly px-10 mt-4">
                    <h1 className="text-3xl font-bold py-10 w-full">{foods.length === 0 ? (<h1>Add food to your pantry!</h1>) : (<h1>Food items: {foods.length}</h1>)}</h1>
                    <div className='flex flex-row w-full justify-center items-center'>
                        <box-icon name='filter-alt'></box-icon>
                        <Dropdown options={['Expiry date', 'Name']}
                                  onSelect={(value) => handleSort(value)}/>
                    </div>
                </div>
                <div>
                    <ul>
                        {foods
                            .map((food) => {
                                return (
                                    <FoodItem
                                        key={food.id}
                                        id={food.id}
                                        name={food.name}
                                        expiryDate={food.expiryDate}
                                        weight={food.quantity}
                                        unit={food.unit}
                                        onClick={getFoods}
                                    />
                                );
                            })}
                    </ul>
                </div>
            </div>

            {popupVisible && <AddFood onAdd={getFoods} onClose={() => setPopupVisible(false) } pantryId={pantryId} />}

        </div>
    );
}

export default PantryView;
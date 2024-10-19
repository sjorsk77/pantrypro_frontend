import React, {useEffect, useState} from 'react';
import useApiWrapper from "../../api/ApiWrapper";
import FoodItem from "../Food/FoodItem";
import AddFood from "../Food/AddFood";
import {toast} from "react-toastify";



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
        getFoods();
        getPantryData()
    }, [pantryId]);

    const handleAddFoodClick = () => {
        setPopupVisible(true);
    };

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
                <div className="flex flex-row w-full items-cetner justify-between px-10 mt-4">
                    <h1 className="text-3xl font-bold py-10">{foods.length === 0 ? (<h1>Add food to your pantry!</h1>) : (<h1>Food items: {foods.length}</h1>)}</h1>
                    <button>
                        <box-icon name='filter-alt'></box-icon>
                    </button>
                </div>
                <div>
                    <ul>
                        {foods
                            .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)) // Sort by expiryDate
                            .map((food) => {
                                return (
                                    <FoodItem
                                        key={food.id}
                                        id={food.id}
                                        name={food.name}
                                        expiryDate={food.expiryDate}
                                        weight={food.quantity}
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
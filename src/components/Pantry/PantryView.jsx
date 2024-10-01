import React, {useEffect, useState} from 'react';
import {getFood, getPantry} from "../../api/ApiWrapper";
import FoodItem from "../Food/FoodItem";



function PantryView({pantryId, pantryName}) {

    const [foods, setFoods] = useState([]);
    const [pantry, setPantry] = useState({});

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


    return (
        <div className="flex flex-col items-center w-full h-fit">
            <div className=" flex flex-row justify-between w-full px-20">
                <h1 className="text-3xl font-bold py-5">{pantry.name}</h1>
                <button className="bg-accent-teal rounded-t-2xl w-2/12 text-4xl font-semibold">add food</button>

            </div>
            <div className="flex flex-col  bg-white w-full h-full rounded-2xl">
                <div className="flex flex-row w-full justify-between px-10 mt-4">
                    <h1 className="text-3xl font-bold">{foods.length === 0 ? (<h1>No foods in pantry</h1>) : (<h1>Food items: {foods.length}</h1>)}</h1>
                    <h1>Search bar</h1>
                    <button>
                        <box-icon name='filter-alt'></box-icon>
                    </button>
                </div>
                <div>
                    <ul>
                        {foods.map((food) => {
                            return (
                                <FoodItem key={food.id} id={food.id} name={food.name} expiryDate={food.expiryDate} weight={food.weight} onClick={getFoods}/>
                            );
                        })}
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default PantryView;
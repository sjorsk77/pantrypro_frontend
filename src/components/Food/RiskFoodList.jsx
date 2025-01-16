import {useEffect, useState} from "react";
import useApiWrapper from "../../api/ApiWrapper";
import {NumericInput} from "../Inputs/InputBox";

export default function RiskFoodList({onIngredientsChange}) {

    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const [riskFoodList, setRiskFoodList] = useState([]);
    const [daysToExpiration, setDaysToExpiration] = useState(5);



    const {getRiskFood} = useApiWrapper();

    const fetchRiskFood = async () => {
        try{
            const response = await getRiskFood(daysToExpiration);
            setRiskFoodList(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchRiskFood();
    }, [daysToExpiration]);

    const updateIngredients = (updatedIngredients) => {
        setSelectedIngredients(updatedIngredients);
        if (onIngredientsChange) {
            onIngredientsChange(updatedIngredients); // Update parent with the new ingredient list
        }
    };

    const AddIngredient = (food) => {
        if (!selectedIngredients.some(item => item.id === food.id)) {
            const updatedIngredients = [...selectedIngredients, food];
            updateIngredients(updatedIngredients); // Update the ingredients in both state and parent
        }
    };

    const RemoveIngredient = (food) => {
        const updatedIngredients = selectedIngredients.filter(item => item.id !== food.id);
        updateIngredients(updatedIngredients); // Update the ingredients in both state and parent
    };


    return (
        <div>
            <NumericInput
                value={daysToExpiration}
                onChange={e => setDaysToExpiration(e.target.value)}
                label="Days to expiration"
                placeholder="0"
            />
            <ul>
                {riskFoodList.map((food) => {
                    const isSelected = selectedIngredients.some(item => item.id === food.id);

                    return (
                        <li key={food.id} className='flex flex-row justify-between items-center'>
                            <span>{food.name}</span>
                            <button
                                onClick={() => {
                                    isSelected ? RemoveIngredient(food) : AddIngredient(food);
                                }}
                                className={`px-3 py-1 rounded-full text-white transition duration-200 ${
                                    isSelected ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                                }`}
                            >
                                {isSelected ? '-' : '+'}
                            </button>
                        </li>
                    );
                })}
            </ul>

        </div>
    )
}
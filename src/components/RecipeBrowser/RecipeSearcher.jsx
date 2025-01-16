import {useState} from "react";

import DietSelector from "./DietSelector";
import IngredientSelector from "./IngredientSelector";
import useApiWrapper from "../../api/ApiWrapper";

export default function RecipeSearcher({onRecipeFetch}) {

    const {searchForRecipes} = useApiWrapper();

    const[ingredients, setIngredients] = useState([]);
    const[diet, setDiet] = useState([]);
    const[isIngredientPopupVisible, setIsIngredientPopupVisible] = useState(false);
    const[recipes, setRecipes] = useState([]);

    const handleIngredientChange = (ingredient) => {
        setIngredients(ingredient);
    }

    const handleDietChange = (newDiet) => {
        setDiet(newDiet);
    }

    const fetchRecipes = async () => {
        try {
            const requestBody = {
                minCalories: diet.minCalories,
                maxCalories: diet.maxCalories,
                ingredients: ingredients.map(ingredient => ingredient.name),
                dietTypes: diet.dietTypes,
            }

            const response = await searchForRecipes(requestBody);
            console.log(response);
            setRecipes(response);
            onRecipeFetch(response);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="flex flex-col bg-background-gray rounded-2xl p-3 shadow-2xl">
            <DietSelector onDietChange={handleDietChange}/>
            <button onClick={() => setIsIngredientPopupVisible(true)}>Select ingredients</button>
            {isIngredientPopupVisible && (<IngredientSelector onClose={() => setIsIngredientPopupVisible(false)} onIngredientChange={handleIngredientChange} />)}
            <ul>
                {ingredients.map((ingredient) => (<li key={ingredient.id}>{ingredient.name}</li>))}
            </ul>
            <button onClick={fetchRecipes}>Search recipes</button>
        </div>
    )
}
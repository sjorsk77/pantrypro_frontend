import Navbar from "../components/Navbar";
import {useState} from "react";
import DietSelector from "../components/RecipeBrowser/DietSelector";
import IngredientSelector from "../components/RecipeBrowser/IngredientSelector";
import RecipeSearcher from "../components/RecipeBrowser/RecipeSearcher";

export default function RecipeBrowser() {

    const [recipes, setRecipes] = useState([]);

    const handleRecipeFetch = (recipe) => {
        setRecipes(recipe);
    }

    return (
        <div className="px-20">
            <Navbar/>
            <div className='flex flex-row justify-between'>
                <RecipeSearcher onRecipeFetch={handleRecipeFetch}/>

                <div>
                    <h2>Recipes</h2>
                    <ul>
                        {recipes.map((recipe) => (
                            <li key={recipe.id}>
                                <a href={recipe.url} target="_blank" rel="noopener noreferrer">{recipe.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>


            </div>
        </div>
    )
}
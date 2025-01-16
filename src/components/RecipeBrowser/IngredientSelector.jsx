import {useEffect, useRef, useState} from "react";
import RiskFoodList from "../Food/RiskFoodList";

export default function IngredientSelectionPopUp({onClose, onIngredientChange}) {

    const [ingredients, setIngredients] = useState([])

    const popupRef = useRef(null);

    const handleIngredientsChange = (updatedIngredients) => {
        setIngredients(updatedIngredients);
        onIngredientChange(updatedIngredients);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
                ref={popupRef}
                className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            >
                <h2 className="text-xl font-semibold mb-4">Select Ingredients</h2>
                <RiskFoodList onIngredientsChange={handleIngredientsChange}/>
            </div>
        </div>
    )
}
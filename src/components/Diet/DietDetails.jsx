import { useContext, useState, useEffect } from "react";
import { DietContext } from "../../pages/Diets";
import DietTypeSelection from "./DietTypeSelection";
import useApiWrapper from "../../api/ApiWrapper";
import { EditableText } from "../Inputs/InputBox";

export const DietDetails = ({ className, setRefresh }) => {
    const { updateDiet } = useApiWrapper();
    const { selectedDiet, setSelectedDiet } = useContext(DietContext);

    const [isChanged, setIsChanged] = useState(false);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        setIsChanged(false);
        setIsValid(true);
    }, [selectedDiet]);

    const handleDietTypeChange = (updatedDietTypes) => {
        setSelectedDiet({ ...selectedDiet, dietTypes: updatedDietTypes });
        setIsChanged(true);  // Mark as changed
        validateCalories(selectedDiet.minCalories, selectedDiet.maxCalories);  // Validate calories on diet type change
    };

    const handleCaloriesChange = (key, value) => {
        const newDiet = { ...selectedDiet, [key]: value };
        setSelectedDiet(newDiet);
        setIsChanged(true);  // Mark as changed
        validateCalories(newDiet.minCalories, newDiet.maxCalories);  // Validate calories on change
    };

    const validateCalories = (minCalories, maxCalories) => {
        const isValid = minCalories !== '' && maxCalories !== '' && Number(maxCalories) >= Number(minCalories);
        setIsValid(isValid);
    };

    const handleSave = async () => {
        if (!isValid || !isChanged) return;  // Prevent save if not valid or not changed
        try {
            await updateDiet(selectedDiet);
            alert("Diet updated successfully!");
            setRefresh((prev) => !prev);  // Trigger refresh after save
            setIsChanged(false);  // Reset the change flag after saving
        } catch (error) {
            console.error("Failed to update diet:", error);
            alert("Failed to update diet. Please try again.");
        }
    };

    return (
        <div className={`flex flex-col justify-center items-center ${className}`}>
            {!selectedDiet ? (
                <div>
                    <h1>Select a diet to show its details!</h1>
                </div>
            ) : (
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="bg-blue-500 text-white p-4">
                        <h2 className="text-2xl font-bold text-center">{selectedDiet.name}</h2>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        {/* Calorie Info */}
                        <div className="flex justify-between items-center text-gray-700 mb-4">
                            <div>
                                <p className="text-sm font-semibold">Min Calories:</p>
                                <EditableText
                                    value={selectedDiet.minCalories}
                                    onChange={(newValue) => handleCaloriesChange('minCalories', newValue)}
                                />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Max Calories:</p>
                                <EditableText
                                    value={selectedDiet.maxCalories}
                                    onChange={(newValue) => handleCaloriesChange('maxCalories', newValue)}
                                />
                            </div>
                        </div>
                        {/* Diet Type Selection */}
                        <DietTypeSelection
                            currentDiet={selectedDiet}
                            onDietTypeChange={handleDietTypeChange}
                        />
                    </div>

                    {/* Save Button */}
                    <div className="p-5 flex justify-center">
                        <button
                            onClick={handleSave}
                            className={`px-6 py-2 font-semibold rounded-lg shadow-md transition duration-300 ${
                                isChanged && isValid ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={!isChanged || !isValid}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

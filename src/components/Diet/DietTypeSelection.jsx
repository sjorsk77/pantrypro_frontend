import React, {useContext, useEffect, useState} from "react";
import useApiWrapper from "../../api/ApiWrapper";
import {DietContext} from "../../pages/Diets";
export default function DietTypeSelection({onDietTypeChange}) {
    const {getDietTypes} = useApiWrapper();
    const [dietTypes, setDietTypes] = useState([]);
    const { selectedDiet, setSelectedDiet } = useContext(DietContext);

    const fetchDietTypes = async () => {
        try {
            const response = await getDietTypes();
            setDietTypes(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDietTypes();
    }, []);


    const handleDietTypeChange = (event) => {
        const selectedTypeId = parseInt(event.target.value);
        const selectedType = dietTypes.find((type) => type.id === selectedTypeId);

        if (selectedType) {
            const alreadySelected = selectedDiet.dietTypes.some((type) => type.id === selectedType.id);
            if (!alreadySelected) {
                const updatedDietTypes = [...selectedDiet.dietTypes, selectedType];
                setSelectedDiet({ ...selectedDiet, dietTypes: updatedDietTypes });
                onDietTypeChange(updatedDietTypes);
            }
        }

        event.target.value = "";
    };

    const removeDietType = (typeId) => {
        const updatedDietTypes = selectedDiet.dietTypes.filter((type) => type.id !== typeId);
        setSelectedDiet({ ...selectedDiet, dietTypes: updatedDietTypes });
        onDietTypeChange(updatedDietTypes);
    };

    return (
        <div className="w-full p-4 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-xl font-semibold mb-4">Select diets:</h1>
            <ul className="flex flex-wrap gap-4">
                {selectedDiet.dietTypes.map((type) => (
                    <li
                        key={type.id}
                        className="relative flex items-center bg-blue-500 text-white rounded-lg overflow-hidden group transition-all duration-300"
                    >
                <span className="flex-1 px-4 py-2">
                    {type.name.charAt(0).toUpperCase() + type.name.slice(1).toLowerCase()}
                </span>
                        <button
                            onClick={() => removeDietType(type.id)}
                            className="w-full absolute right-0 top-0 bottom-0 bg-red-500 text-white px-4 flex items-center justify-center translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                        >
                            Delete
                        </button>
                    </li>
                ))}
                <li className="relative bg-gray-300 rounded-lg p-2">
                    <select
                        className="w-full bg-transparent outline-none text-gray-700 px-2 py-1 rounded-lg cursor-pointer hover:bg-gray-200"
                        defaultValue=""
                        onChange={handleDietTypeChange}
                    >
                        <option value="">
                            <span className="text-xl text-gray-700">Add diet types</span>
                        </option>
                        {dietTypes
                            .filter((type) => !selectedDiet.dietTypes.some((selectedType) => selectedType.id === type.id))
                            .map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                    </select>
                </li>
            </ul>
        </div>
    )
}
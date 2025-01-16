import {useState, useEffect} from "react";
import ToggleButton from "../Inputs/ToggleButton";
import {NumericInput} from "../Inputs/InputBox";
import DietTypeSelection from "../Diet/DietTypeSelection";
import useApiWrapper from "../../api/ApiWrapper";
import Cookies from "js-cookie";
export default function DietSelector({onDietChange}) {

    const [isCustomSelection, setIsCustomSelection] = useState(false)
    const [diets, setDiets] = useState([])

    const handleDietChange = (updatedDiet) => {
        setDiets(updatedDiet);
        onDietChange(updatedDiet);
    }

    return (
        <div>
            <ToggleButton label="Use custom diet" onToggle={() => setIsCustomSelection(!isCustomSelection)}/>
            {isCustomSelection ? <CustomDietSelector/> : <SavedDietSelector onDietChange={handleDietChange}/>}
        </div>
    )
}

function CustomDietSelector() {

    const [minCalories, setMinCalories] = useState(0)
    const [maxCalories, setMaxCalories] = useState(0)
    const [dietTypes, setDietTypes] = useState([])

    return (
        <div className='w-96'>
            <NumericInput
                value={minCalories}
                onChange={e => setMinCalories(e.target.value)}
                label="Minimum calories"
                placeholder="0"
            />
            <NumericInput
                value={maxCalories}
                onChange={e => setMaxCalories(e.target.value)}
                label="Maximum calories"
                placeholder="0"
            />
            Select diet types:
            <DietTypeSelection onChange={setDietTypes}/>
        </div>
    )
}

function SavedDietSelector({onDietChange}) {

    const {getDiets} = useApiWrapper()

    const [diets, setDiets] = useState([])
    const [selectedDiet, setSelectedDiet] = useState({});

    const fetchDiets = async () => {
        try {
            const response = await getDiets();
            setDiets(response);
            console.log(response);
            if (response.length > 0) {
                setSelectedDiet(response[0]); // Set default selected diet to the first one
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDiets();
    }, [])

    const handleDietChange = (event) => {
        const selectedDietId = parseInt(event.target.value);
        const diet = diets.find(d => d.id === selectedDietId);
        if (diet) {
            setSelectedDiet(diet); // Update the selected diet state
            onDietChange(diet);
        }
    };


    return (
        <div className='w-96 my-5'>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-5">Select Your Diet</h2>
            <div className="mb-4">
                <select
                    onChange={handleDietChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-400 transition duration-200"
                >
                    {diets.map(diet => (
                        <option key={diet.id} value={diet.id}>
                            {diet.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="">
                <h3 className="text-lg font-semibold text-gray-700">Diet Details</h3>
                <p className="mt-2 text-gray-600"><strong>Min Calories:</strong> {selectedDiet.minCalories}</p>
                <p className="mt-1 text-gray-600"><strong>Max Calories:</strong> {selectedDiet.maxCalories}</p>
                <h4 className="mt-3 font-semibold text-gray-700">Diet Types:</h4>
                <ul className="list-disc list-inside">
                    {selectedDiet.dietTypes && selectedDiet.dietTypes.map(type => (
                        <li key={type.id} className="mt-1 text-gray-600">{type.name}</li>
                    ))}
                </ul>
            </div>
        </div>

    )
}
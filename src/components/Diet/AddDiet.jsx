import {useEffect, useRef, useState} from "react";
import {InputBox, NumericInput} from "../Inputs/InputBox";
import DietTypeSelection from "./DietTypeSelection";
import useApiWrapper from "../../api/ApiWrapper";

function AddDiet ({onClose, onAdd}) {

    const {createDiet} = useApiWrapper();

    const popupRef = useRef(null);

    const [dietTypes, setDietTypes] = useState([])
    const [dietName, setDietName] = useState('')
    const [minCalories, setMinCalories] = useState(0)
    const [maxCalories, setMaxCalories] = useState(0)

    const handleAddDiet = async () => {
        try {
            const response = await createDiet({
                name: dietName,
                minCalories: minCalories,
                maxCalories: maxCalories,
                dietTypes: dietTypes
            });
            onAdd(response);
        } catch (error) {
            console.log(error);
        }
    }

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
            <div ref={popupRef} className="bg-white w-1/3 h-1/2 rounded-2xl flex flex-col items-center justify-center p-5 gap-y-3">
                <h1>Add Diet</h1>
                <InputBox label="Name" type="text" placeholder="Enter diet name" value={dietName} onChange={(e) => setDietName(e.target.value)}/>
                <div className='flex flex-row gap-3'>
                    <NumericInput label="Min calories" placeholder="Enter calories" value={minCalories} onChange={(e) => setMinCalories(e.target.value)}/>
                    <NumericInput label="Max calories" placeholder="Enter calories" value={maxCalories} onChange={(e) => setMaxCalories(e.target.value)} />
                </div>
                <DietTypeSelection onDietTypeChange={setDietTypes} />
                <button onClick={handleAddDiet}
                        className="bg-green-500 text-white px-3
                        py-2 rounded-lg hover:bg-green-600
                        disabled:bg-gray-300"
                        disabled={dietName === '' || minCalories < 0 || maxCalories === 0 || minCalories > maxCalories}
                >
                    Add Diet
                </button>
            </div>
        </div>
    );
}
export default AddDiet;
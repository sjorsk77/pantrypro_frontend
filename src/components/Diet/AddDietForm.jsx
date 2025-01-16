import {useEffect, useRef, useState} from "react";
import {InputBox, InputBoxWithUnit} from "../Inputs/InputBox";
import useApiWrapper from "../../api/ApiWrapper";
import selectDietTypes, {SelectDietTypes} from "./SelectDietTypes";



export function AddDietForm({onClose, onDietAdd}) {
    const popupRef = useRef(null);

    const [dietTypes, setDietTypes] = useState([]);
    const [dietName, setDietName] = useState('');
    const [minCalories, setMinCalories] = useState('');
    const [maxCalories, setMaxCalories] = useState('');


    const {getDietTypes, addDiet} = useApiWrapper();

    const handleSubmit = async () => {
        try {
            await addDiet({
                name: dietName,
                minCalories: minCalories,
                maxCalories: maxCalories,
                dietTypes: dietTypes
            });
            onClose();
        } catch (error) {
            console.error(error);
        }
    }

    const fetchDietTypes = async () => {
        try {
            const response = await getDietTypes();
            setDietTypes(response);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchDietTypes().then(r => console.log(r));
    }, []);

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

    const handleDietTypesChange = (updatedDietTypes) => {
        setDietTypes(updatedDietTypes);
    };




    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Add diet</h2>
                <InputBox
                    label="Diet name"
                    value={dietName}
                    onChange={(e) => setDietName(e.target.value)}
                />
                <div className='w-full flex flex-row gap-3'>
                    <InputBox
                        label="Min calories"
                        value={minCalories}
                        onChange={(e) => setMinCalories(e.target.value)}
                    />
                    <InputBox
                        label="Max calories"
                        value={maxCalories}
                        onChange={(e) => setMaxCalories(e.target.value)}
                    />
                </div>
                <SelectDietTypes onDietTypesChange={handleDietTypesChange}/>
                <button onClick={handleSubmit} className='bg-accent-teal rounded-lg p-2 mt-4'>Add diet</button>
            </div>
        </div>
    );
}

export default AddDietForm;
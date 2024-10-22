import { useState, useEffect } from "react";
import useApiWrapper from "../../api/ApiWrapper";
import useFormatServices from "../../Services/FormatServices";

export function SelectDietTypes({initialDietTypes = [], onDietTypesChange}) {
    const { getDietTypes } = useApiWrapper();
    const { formatEnums } = useFormatServices();


    const [dietTypes, setDietTypes] = useState([]);
    const [selectedDietTypes, setSelectedDietTypes] = useState(initialDietTypes);

    const handleRemove = (id) => {
        const updatedSelectedDietTypes = selectedDietTypes.filter(type => type.id !== id);
        setSelectedDietTypes(updatedSelectedDietTypes);
        onDietTypesChange(updatedSelectedDietTypes);
    };

    const fetchDietTypes = async () => {
        try {
            const response = await getDietTypes();
            setDietTypes(response);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelect = (event) => {
        const selectedDietTypeId = parseInt(event.target.value);
        const selectedDietType = dietTypes.find(type => type.id === selectedDietTypeId);

        if (selectedDietType && !selectedDietTypes.some(type => type.id === selectedDietTypeId)) {
            const updatedSelectedDietTypes = [...selectedDietTypes, selectedDietType];
            setSelectedDietTypes(updatedSelectedDietTypes);
            onDietTypesChange(updatedSelectedDietTypes); // Notify parent of the change
        }
        event.target.value = '';
    };

    useEffect(() => {
        fetchDietTypes().then(r => console.log(r));
    }, []);

    useEffect(() => {
        console.log(selectedDietTypes);
    }, [selectedDietTypes]);

    const filterDietTypes = dietTypes.filter(type => !selectedDietTypes.some(selected => selected.id === type.id));

    return (
        <div>
            <h2 className='text-lg font-bold mb-4'>Select diet types</h2>
            <ul className='flex flex-wrap flex-row w-full gap-3'>
                {selectedDietTypes.map((type) => (
                    <li key={type.id} className='bg-background-gray rounded-lg p-1'>
                        {formatEnums(type.name)}
                        <button onClick={() => handleRemove(type.id)} className='ml-2 text-red-500 hover:text-red-700'>
                            &times;
                        </button>
                    </li>
                ))}
                <select onChange={handleSelect} className='bg-background-gray rounded-lg w-[40px] px-1 appearance-none text-center'>
                    <option value="" className='bg-white disabled hidden'>+</option>
                    {filterDietTypes.map((type) => (
                        <option key={type.id} value={type.id}>{formatEnums(type.name)}</option>
                    ))}
                </select>
            </ul>
        </div>
    );
}

export default SelectDietTypes;
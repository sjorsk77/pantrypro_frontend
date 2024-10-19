import React, {useState, useRef, useEffect} from "react";
import {EditableText} from "../Inputs/InputBox";
import useApiWrapper from "../../api/ApiWrapper";
import useFormatServices from "../../Services/FormatServices";

export function Diet ({diet, className}) {

    const {updateDiet, getDietTypes} = useApiWrapper();
    const {formatEnums} = useFormatServices();

    const [expanded, setExpanded] = useState(false);
    const [height, setHeight] = useState(0);
    const [dietTypes, setDietTypes] = useState([]);
    const [currentDiet, setCurrentDiet] = useState(diet);
    const [isChanged, setIsChanged] = useState(false);
    const contentRef = useRef(null);
    const [selectedDietType, setSelectedDietType] = useState("");

    const fetchDietTypes = async () => {
        try {
            const response = await getDietTypes();
            setDietTypes(response);
        } catch (error) {
            console.log(error);
        }
    }

    const getFilteredDietTypes = () => {
        return dietTypes.filter(
            (type) => !currentDiet.dietTypes.some((currentType) => currentType.id === type.id)
        );
    };

    useEffect(() => {
        fetchDietTypes();
    }, []);

    useEffect(() => {
        setCurrentDiet(diet);
        setIsChanged(false)// Set initial state from diet prop
    }, [diet]);

    useEffect(() => {
        if (expanded && contentRef.current) {
            setHeight(contentRef.current.scrollHeight); // Set height when expanded
        } else {
            setHeight(0); // Collapse
        }
    }, [expanded, currentDiet]);



    const toggleExpand = () => setExpanded(!expanded);

    const handleSave = async () => {
        try {
            await updateDiet(currentDiet);
            setIsChanged(false); // Reset changed state after saving
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (field) => (newValue) => {
        setCurrentDiet((prev) => {
            const updatedDiet = { ...prev, [field]: newValue };
            const hasChanged = JSON.stringify(updatedDiet) !== JSON.stringify(diet);
            setIsChanged(hasChanged);
            return updatedDiet;
        });
    };

    const handleDietTypeChange = (event) => {
        const selectedTypeId = parseInt(event.target.value);
        const selectedType = getFilteredDietTypes().find(type => type.id === selectedTypeId);

        if (selectedType) {
            setCurrentDiet(prev => {
                const updatedDietTypes = [...prev.dietTypes, selectedType]; // Append selected type

                // Return updated diet object
                return {
                    ...prev,
                    dietTypes: updatedDietTypes,
                };
            });

            setIsChanged(true);
            setSelectedDietType("");// Mark as changed
        }

        // Log the updated dietTypes from currentDiet
        console.log(currentDiet.dietTypes); // This will still show the previous state due to closure
    };

    const isButtonDisabled = !isChanged;

    return (
        <div className='bg-background-gray rounded-lg px-5 overflow-auto w-96 h-fit'>
            <div className="flex flex-row justify-between gap-10 w-full items-center">
                <h1 className="text-3xl font-bold">{diet?.name ?? 'Unnamed Diet'}</h1>

                <button className="p-8" onClick={toggleExpand}>
                    <box-icon type="solid" name={expanded ? 'up-arrow' : 'down-arrow'}></box-icon>
                </button>
                <button className="p-8 disabled:opacity-50" onClick={handleSave} disabled={isButtonDisabled}>
                    <box-icon name='save' type='solid'></box-icon>
                </button>
            </div>

            <div
                ref={contentRef}
                style={{maxHeight: `${height}px`}}
                className="overflow-hidden transition-all duration-500 ease-in-out"
            >
                <div className="flex flex-col w-full items-start pb-3">
                    <div className='flex flex-row w-full items-center'>
                        <p className='pr-1'>Min calories: </p>
                        <EditableText value={diet?.minCalories ?? 0} onChange={handleChange('minCalories')}/>
                    </div>
                    <div className='flex flex-row w-full items-center'>
                        <p className='pr-1'>Max calories: </p>
                        <EditableText value={diet?.maxCalories ?? 0} onChange={handleChange('maxCalories')}/>
                    </div>
                    <div className="flex flex-wrap items-center space-x-2 overflow-auto">
                        <ul className='flex flex-wrap gap-x-5 w-full'>
                            {currentDiet.dietTypes.map((type) => (
                                <li key={type.id} className='flex-shrink-0'>{type.name}</li>
                            ))
                            }
                            <li>
                                <select className="w-[40px] px-1 appearance-none bg-transparent" defaultValue='' onChange={handleDietTypeChange} value={selectedDietType}>
                                    <option value="" disabled hidden>+</option>
                                    {getFilteredDietTypes().map((type) => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

}
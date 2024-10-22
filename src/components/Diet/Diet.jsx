import React, {useState, useRef, useEffect} from "react";
import {EditableText} from "../Inputs/InputBox";
import useApiWrapper from "../../api/ApiWrapper";
import useFormatServices from "../../Services/FormatServices";
import SelectDietTypes from "./SelectDietTypes";

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


    useEffect(() => {
        fetchDietTypes().then(r => console.log(r));
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
            await updateDiet({
                id: currentDiet.id,
                name: currentDiet.name,
                minCalories: currentDiet.minCalories,
                maxCalories: currentDiet.maxCalories,
                dietTypes: currentDiet.dietTypes
            });
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

    const handleDietTypesChange = (updatedDietTypes) => {
        setCurrentDiet((prev) => ({
            ...prev,
            dietTypes: updatedDietTypes,
        }));
        setIsChanged(true);
    };

    const isButtonDisabled = !isChanged;

    return (
        <div className='bg-white rounded-lg px-5 overflow-auto w-96 h-fit'>
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
                    <SelectDietTypes initialDietTypes={currentDiet.dietTypes} onDietTypesChange={handleDietTypesChange} />
                </div>
            </div>
        </div>
    );

}
import {useState, useEffect, useContext} from "react";
import useApiWrapper from "../../api/ApiWrapper";
import {Diet} from "./Diet";
import {DietContext} from "../../pages/Diets";

export function DietList({refreshList, onShowAddDiet, className}) {

    const {getDiets} = useApiWrapper();

    const [diets, setDiets] = useState([]);
    const {setSelectedDiet} = useContext(DietContext);
    const fetchDiets = async () => {
        try {
            const response = await getDiets();
            setDiets(Array.isArray(response) ? response : []);
        } catch (error) {
            // Handle the error, e.g., log it or show a message
        }
    }

    useEffect(() => {
        fetchDiets();
    }, [refreshList]);


    return (
        <div className={`${className} max-h-[50rem]`}>
                <button
                    onClick={onShowAddDiet}
                    className="bg-blue-500 text-white p-3 rounded-full shadow-lg sticky top-7 w-full"
                >
                    Add a diet
                </button>
            <div className='max-h-[44rem] overflow-auto'>
                <ul className="w-full flex flex-col items-center gap-5 mt-5 overflow-auto">
                    {Array.isArray(diets) && diets.map(diet => (
                        <Diet
                            key={diet.id}
                            diet={diet}
                            onClick={() => setSelectedDiet(diet)}
                        />
                    ))}
                </ul>
            </div>

        </div>
    )
}
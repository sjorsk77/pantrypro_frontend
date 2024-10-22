import {useState, useEffect} from "react";
import useApiWrapper from "../../api/ApiWrapper";
import Cookies from "js-cookie";
import {Diet} from "./Diet";

export function DietList({refreshList}) {

    const {getDiets} = useApiWrapper();

    const [diets, setDiets] = useState([]);
    const [selectedDietId] = useState(null);

    const fetchDiets = async () => {
        try {
            const response = await getDiets(Cookies.get('token'));
            console.log(response);
            setDiets(Array.isArray(response) ? response : []);
        } catch (error) {
            // Handle the error, e.g., log it or show a message
        }
    }

    useEffect(() => {
        fetchDiets().then(r => console.log(r));
    }, [refreshList]);


    return (
        <div>
            <ul className="w-full flex flex-col items-center gap-5 mt-5 overflow-auto">
                {Array.isArray(diets) && diets.map(diet => (
                    <Diet
                        key={diet.id}
                        diet={diet}
                        className={selectedDietId === diet.id ? "border-2 border-black " : ""}
                    />
                ))}
            </ul>

        </div>
    )
}
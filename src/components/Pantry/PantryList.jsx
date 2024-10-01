import Pantry from "./Pantry";
import InputBox from "../Inputs/InputBox";
import {useState} from "react";
import {useEffect} from "react";
import {getPantries} from "../../api/ApiWrapper";
import {createPantry} from "../../api/ApiWrapper";
import Cookies from "js-cookie";
import Dropdown from "../Inputs/Dropdown";
import CreatePantry from "./CreatePantry";

export function PantryList({ onPantrySelect} ) {

    const [pantries, setPantries] = useState([]);
    const [selectedPantryId, setSelectedPantryId] = useState(null);

    const fetchPantries = async () => {
        try {
            const response = await getPantries(Cookies.get('token'));
            setPantries(response);
        } catch (error) {
            Cookies.set('token', '');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Pad single digit days
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        fetchPantries();
    }, []);


    return (
        <div className="w-fit bg-white max-h-[50rem] h-fit flex flex-col items-center p-3 rounded-2xl shadow-2xl">
            <h1 className="text-xl font-bold">Pantries</h1>
            <CreatePantry onPantryCreated={fetchPantries} />
            <ul className="w-full flex flex-col items-center gap-5 mt-5 overflow-auto">
            {pantries?.map(pantry => <Pantry
                    id={pantry.id}
                    key={pantry.id}
                    name={pantry.name}
                    lastUpdated={formatDate(pantry.updatedAt)}
                    type={pantry.storageType.toLowerCase()}
                    numberOfItems={pantry.numberOfItems ?? 0}
                    onClick={() => { onPantrySelect(pantry.id);  setSelectedPantryId(pantry.id); console.log(selectedPantryId); fetchPantries(); }}
                    className={selectedPantryId === pantry.id ? "border-2 border-black " : ""}
                />)}
            </ul>
        </div>
    )
}
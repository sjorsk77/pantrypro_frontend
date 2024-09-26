import Pantry from "./Pantry";
import InputBox from "./InputBox";
import {useState} from "react";
import {useEffect} from "react";
import {getPantries} from "../api/ApiWrapper";
import {createPantry} from "../api/ApiWrapper";
import Cookies from "js-cookie";
import Dropdown from "./Dropdown";

export function PantryList({ onPantrySelect} ) {

    const [pantries, setPantries] = useState([]);
    const [pantryType, setPantryType] = useState('');
    const [pantryName, setPantryName] = useState();

    const data = {
        'token' : Cookies.get('token'),
        'name': pantryName,
        'storageType': pantryType.toUpperCase()
    };



    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Pad single digit days
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const handleSelect = (selectedOption) => {
        setPantryType(selectedOption);
    }

    const handleCreatePantry = async () => {
        try {
            const response = await createPantry(data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPantries(Cookies.get('token'));
                setPantries(response);
            } catch (error) {
                Cookies.set('token', '');
                console.error(error);
            } finally {
                console.log(pantries);
            }
        };
        fetchData();
    }, [])

    return (
        <div className="w-fit bg-white max-h-[50rem] flex flex-col items-center p-3 rounded-2xl shadow-2xl">
            <h1 className="text-xl font-bold">Pantries</h1>
            <div className="flex flex-row justify-center gap-5 w-full items-center">
                <InputBox label={'Name'} onChange={(e) => setPantryName(e.target.value)} value={pantryName}></InputBox>
                <Dropdown options={['Fridge', 'Shelf', 'Freezer']} onSelect={handleSelect}></Dropdown>
                <button className="bg-green-500 text-white rounded-xl p-2 mt-5" onClick={handleCreatePantry}>Add Pantry</button>
            </div>


            <ul className="w-full flex flex-col items-center gap-5 mt-5 overflow-auto">
            {pantries?.map(pantry => <Pantry
                    id={pantry.id}
                    key={pantry.id}
                    name={pantry.name}
                    lastUpdated={formatDate(pantry.updatedAt)}
                    type={pantry.storageType.toLowerCase()}
                    numberOfItems={pantry.numberOfItems ?? 0}
                    onClick={() => onPantrySelect(pantry.id)}
                />)}
            </ul>
        </div>
    )
}
import Pantry from "./Pantry";
import {useState} from "react";
import {useEffect} from "react";
import Cookies from "js-cookie";
import CreatePantry from "./CreatePantry";
import useApiWrapper from "../../api/ApiWrapper";
import useFormatServices from "../../Services/FormatServices";

export function PantryList({ onPantrySelect, refreshList} ) {

    const {getPantries} = useApiWrapper();
    const {formatDate} = useFormatServices();

    const [pantries, setPantries] = useState([]);
    const [selectedPantryId, setSelectedPantryId] = useState(null);

    const fetchPantries = async () => {
        try {
            const response = await getPantries(Cookies.get('token'));
            setPantries(response);
        } catch (error) {
        }
    };

    useEffect(() => {
        fetchPantries();
    }, [refreshList]);

    const handlePantryClick = (pantryId) => {
        if (pantryId === selectedPantryId) {
            setSelectedPantryId(null); // Deselect if the pantry is already selected
            onPantrySelect(null); // Notify the parent that no pantry is selected
        } else {
            setSelectedPantryId(pantryId); // Select the clicked pantry
            onPantrySelect(pantryId); // Notify the parent of the selected pantry
        }
    };


    return (
        <div className="min-w-fit bg-white max-h-[50rem] h-fit flex flex-col items-center p-3 rounded-2xl shadow-2xl">
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
                    onClick={() => handlePantryClick(pantry.id)}
                    className={selectedPantryId === pantry.id ? "border-2 border-black " : ""}
                />)}
            </ul>
        </div>
    )
}
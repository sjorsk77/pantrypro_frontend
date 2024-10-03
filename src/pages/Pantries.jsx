import Navbar from "../components/Navbar";
import {PantryList} from "../components/Pantry/PantryList";
import PantryView from "../components/Pantry/PantryView";
import {useState} from "react";

export function Pantries() {

    const [selectedPantry, setSelectedPantry] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handlePantrySelect = (pantryId) => {
        setSelectedPantry(pantryId);
    }

    const handlePantryDelete = () => {
        setSelectedPantry(null);
        setRefresh(!refresh);
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-row px-20 gap-10">
                <PantryList onPantrySelect={handlePantrySelect} refreshList={refresh} />
                {selectedPantry && <PantryView pantryId={selectedPantry} onPantryDelete={handlePantryDelete} />}
            </div>
        </div>
    )
}
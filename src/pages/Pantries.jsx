import Navbar from "../components/Navbar";
import {PantryList} from "../components/PantryList";
import PantryView from "../components/PantryView";
import {useState} from "react";

export function Pantries() {

    const [selectedPantry, setSelectedPantry] = useState(null);

    const handlePantrySelect = (pantryId) => {
        setSelectedPantry(pantryId);
    }

    return (
        <div>
            <Navbar />
            <div className="flex flex-row px-20">
                <PantryList onPantrySelect={handlePantrySelect} />
                <PantryView pantryId={selectedPantry} />
            </div>
        </div>
    )
}
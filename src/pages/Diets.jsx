import Navbar from "../components/Navbar";
import {DietList} from "../components/Diet/DietList";
import {useState} from "react";
import AddDietForm from "../components/Diet/AddDietForm";


export function Diets () {

    const [refresh, setRefresh] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);

    const handleClose = () => {
        setRefresh(prev => !prev); // Toggle refresh state
        setPopupVisible(false); // Close the popup
    };

    return (
        <div>
            <Navbar />
            <DietList refreshList={refresh} />
            <button onClick={() => setPopupVisible(!popupVisible)}>Add diet</button>
            {popupVisible && <AddDietForm onClose={handleClose} />}
        </div>
    )
}
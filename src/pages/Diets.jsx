import Navbar from "../components/Navbar";
import {DietList} from "../components/Diet/DietList";
import {useState, createContext} from "react";
import AddDiet from "../components/Diet/AddDiet";
import {DietDetails} from "../components/Diet/DietDetails";

export const DietContext = createContext();

export function Diets () {
    const [refresh, setRefresh] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedDiet, setSelectedDiet] = useState(null);

    return (
        <DietContext.Provider value={{selectedDiet, setSelectedDiet}}>
            <div className='w-full px-10'>
                <Navbar />
                <div className='flex flex-row justify-center items-center w-full'>
                    <DietList className='flex-[1_1_33%]' refreshList={refresh} onShowAddDiet={() => setPopupVisible(true)}/>
                    <DietDetails className='flex-[2_1_67%]' setRefresh={setRefresh}/>
                </div>
                {popupVisible && <AddDiet onClose={() => setPopupVisible(false)} onAdd={() => setRefresh(!refresh)} />}
            </div>
        </DietContext.Provider>
    )
}
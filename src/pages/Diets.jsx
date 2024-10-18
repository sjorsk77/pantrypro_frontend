import Navbar from "../components/Navbar";
import {DietList} from "../components/Diet/DietList";
import {useState} from "react";


export function Diets () {

    const [refresh, setRefresh] = useState(false);

    return (
        <div>
            <Navbar />
            <DietList refreshList={refresh} />
        </div>
    )
}
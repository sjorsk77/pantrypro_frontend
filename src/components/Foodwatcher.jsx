import {useEffect, useState} from "react";
import useApiWrapper from "../api/ApiWrapper";
import useFormatServices from "../Services/FormatServices";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {InputBox} from "./Inputs/InputBox";

function Foodwatcher ({ riskDays })  {

    const navigate = useNavigate();

    const { getRiskFood } = useApiWrapper();
    const { formatDate } = useFormatServices();

    const [foods, setFoods] = useState([]);

    const getRiskFoods = async () => {
        const body = {
            'token' : Cookies.get('token'),
            'daysTo': riskDays
        }

        try {
            const response = await getRiskFood(body);
            setFoods(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRiskFoods();
    }, []);

    return (
        <div className="min-w-80 bg-white flex flex-col items-center py-5 px-16 rounded-2xl shadow-2xl">
            <div className="flex flex-row justify-between w-full">
                <h1 className="text-xl font-bold mb-3">Foodwatcher</h1>
                <p>days: {riskDays}</p>
            </div>


            <div className="flex flex-col gap-y-3">
                {foods.map((food) => (
                    <div className="flex flex-col gap-y-2.5 p-2.5 bg-background-gray rounded-xl w-80">
                        <h1 className="text-lg font-bold">{food.name}</h1>
                        <div className="flex flex-row justify-between">
                            <p className="text-sm">Expires: {formatDate(food.expiryDate)}</p>
                            <p className="test-sm">Pantry: {food.pantry.name}</p>
                        </div>

                    </div>))}
            </div>
        </div>
    );
};

export default Foodwatcher;
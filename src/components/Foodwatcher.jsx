import {useEffect, useState} from "react";
import {getRiskFood} from "../api/ApiWrapper";
import Cookies from "js-cookie";

function Foodwatcher ({ riskDays })  {
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
        <div className="min-w-80 bg-white flex flex-col items-center p-3 rounded-2xl shadow-2xl">
            <h1 className="text-xl font-bold">Foodwatcher</h1>
            <div>
                {foods.map((food) => (
                    <div className="flex flex-col gap-y-2.5 p-2.5 bg-background-gray rounded-xl w-80">
                        <h1 className="text-lg font-bold">{food.name}</h1>
                        <p className="text-sm">{food.expiryDate}</p>
                    </div>))}
            </div>
        </div>
    );
};

export default Foodwatcher;
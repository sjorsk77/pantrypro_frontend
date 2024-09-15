import { useEffect, useState } from "react";
import { ApiGetUser } from "../api/FridgeMateFunctions"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


export function Home() {

    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const token = Cookies.get('token');

    useEffect(() => {
        if (!token) {
            navigate('/');
        }

        const getUser = async () => {
            setUser(await ApiGetUser(Cookies.get('token')))
        };

        getUser();

    })





    return (
        <div className="flex flex-col items-center">
            <div>
                Welcome back {user.userName} !
            </div>
        </div>

    )
}


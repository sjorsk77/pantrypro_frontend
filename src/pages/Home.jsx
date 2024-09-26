import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


export function Home() {

    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const token = Cookies.get('token');







    return (
        <div className="flex flex-col items-center">
            <div>
                Welcome back {user.userName} !
            </div>
        </div>

    )
}


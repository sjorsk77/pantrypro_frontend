import { Login } from "../components/Login"
import { Register } from "../components/Register"
import { useState, useEffect } from "react"
import img from '../assets/Logo.png'
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

export function Account() {
    const [isLogin, setIsLogin] = useState(true)
    const token = Cookies.get('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    })

    return (
        <div className="flex flex-col pt-20 items-center bg-white h-full">
            <img alt="img" className="rounded-xl mb-10"></img>
            {isLogin ? <Login setIsLogin={setIsLogin}/> : <Register setIsLogin={setIsLogin}/>}
            <button className="text-blue-500 mt-5" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Don't have an account?" : "Already have an account?"}</button>
        </div>
    )
}
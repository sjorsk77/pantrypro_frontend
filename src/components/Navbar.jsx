import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/Logo.png';
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="flex flex-row items-center w-full h-20 justify-around">
            <Link to="/"> <img src={img} alt="img" className="rounded-xl h-full w-20"></img></Link>
            <div className="flex items-center gap-10 font-semibold text-lg">
                <Link to="/">Home</Link>
                <Link to="/">Pantries</Link>
                <Link to="/">Cookbook</Link>
                <Link to="/">Meals</Link>
                <Link to="/">Diets</Link>
                <Link to="/">Messages</Link>
                <Link to="/">Cookbook</Link>
                <Link to="/">Contact us</Link>
            </div>
            <button className="flex items-center gap-1 text-lg font-semibold bg-background-gray rounded-xl px-5 py-5 h-1/3 shadow-md"
                onClick={() => {Cookies.set('token', '');navigate('/login'); toast.success('Logged out')}}
                >
                Logout
                <box-icon name='log-out' size="sm"></box-icon>
            </button>
        </nav>
    )
}

export default Navbar;
import { useState, useEffect } from "react";
import {InputBox} from "../Inputs/InputBox";
import Cookies from "js-cookie";
import useApiWrapper from "../../api/ApiWrapper";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export function Login({setIsLogin}) {

    const navigate = useNavigate();

    const {login} = useApiWrapper();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    const handleLogin = async () => {
        setIsLoading(true);

        const data = {
            'email': email,
            'password': password
        };

        try {
            const response = await login(data);
            Cookies.set('token', response.token);
            if(response.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/home');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
            <div className='flex flex-col justify-center items-center p-5 gap-x-2.5 w-80 h-fit bg-background-gray drop-shadow-md rounded-xl'>
                <h1 className='text-2xl font-bold'>Login</h1>
                <InputBox label={'Email'}
                          type={'email'}
                          placeholder={'Enter your email'}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                />
                <InputBox label={'Password'}
                          type={'password'}
                          placeholder={'Enter your password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                />

                <button className='bg-accent-blue px-5 py-3 rounded-xl w-2/3 text-lg font-semibold'
                        onClick={handleLogin}
                        disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>

            </div>
    );
}


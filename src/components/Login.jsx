import { useState, useEffect } from "react";
import { ApiLogin } from "../api/FridgeMateFunctions";
import { useNavigate } from "react-router-dom";

export function Login({setIsLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [disableButton, setDisableButton] = useState(true);




    


    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await ApiLogin(email, password);
            setError('');
            navigate('/home');

        } catch(e) {
            setError('Invalid credentials');
        }
        setIsLoading(false);
    };

    
    const validateAllInputs = (v1, v2) => {
        if (v1 !== '' && v2 !== '') {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    }



    return (
            <div className="flex flex-col items-center bg-grey p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                <div className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => {setEmail(e.target.value); validateAllInputs(e.target.value, password)}}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value); validateAllInputs(e.target.value, email)}}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        className='w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 disabled:bg-slate-500'
                        disabled={isLoading || disableButton}
                        onClick={handleSubmit}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
                <p className="mt-5 text-red-600 font-semibold">{error}</p>
            </div>
    );
}


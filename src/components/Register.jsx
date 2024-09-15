import { useState, useEffect } from "react";
import { ApiRegister } from "../api/FridgeMateFunctions";

export function Register({setIsLogin}) {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(true);

    const regexPatterns = {
        username: /^.{5,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    }

    const handleUsernameChange = (e) => {
        const newValue = e.target.value;
        setUserName(newValue);

        validateAllInputs();

        if(!regexPatterns.username.test(newValue) && newValue !== ''){
            setUserNameError('Username must be atleast 5 characters')
            setDisableButton(true);
        } else {
            setUserNameError('')
        }
    }

    const handleEmailChange = (e) => {
        const newValue = e.target.value;
        setEmail(newValue);

        validateAllInputs();

        if(!regexPatterns.email.test(newValue) && newValue !== ''){
            setEmailError('Please enter a valid email')
            setDisableButton(true);
        } else {
            setEmailError('')
        }
    }

    const handlePasswordChange = (e) => {
        const newValue = e.target.value;

        setPassword(newValue);

        validateAllInputs();

        checkIfPasswordsMatch(newValue, confirmPassword);

        if(!regexPatterns.password.test(newValue) && newValue !== ''){
            setPasswordError('Password must be atleast 8 characters and contain one letter and one number')
            setDisableButton(true);
        } else {
            setPasswordError('')
        }
    }

    const handleConfirmPasswordChange = (e) => {
        const newValue = e.target.value;

        setConfirmPassword(newValue);

        validateAllInputs();

        checkIfPasswordsMatch(newValue, password);
    }

    const checkIfPasswordsMatch = (pw1, pw2) => {

        console.log((pw1 !== '' || pw2 !== ''));
        if(pw1 !== pw2 && (pw1 !== '' && pw2 !== '')){
            setConfirmPasswordError('Passwords do not match')
            setDisableButton(true);
        } else {
            setConfirmPasswordError('')
        }
    }

    const validateAllInputs = () => {
        if (email !== '' && password !== '' && confirmPassword !== '' && userName !== '') {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        
        try {
            await ApiRegister(userName, email, password, confirmPassword);
            setIsLogin(true);
        } catch(e) {
            console.error('something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
                <div className="space-y-4">
                    <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={handleUsernameChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />{userNameError && <p className="text-red-600 text-xs">{userNameError}</p>}</div>
                    <div>                    
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {emailError && <p className="text-red-600 text-xs">{emailError}</p>}</div>
                    <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {passwordError && <p className="text-red-600 text-xs">{passwordError}</p>}
                    </div>
                    <div>
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {confirmPasswordError && <p className="text-red-600 text-xs">{confirmPasswordError}</p>}
                    </div>

                    <button
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 disabled:bg-slate-500"
                        onClick={handleSubmit}
                        disabled={isLoading || disableButton}
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </div>
            </div>
    );
}

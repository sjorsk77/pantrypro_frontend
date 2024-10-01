import { useState, useEffect } from "react";
import InputBox from "../Inputs/InputBox";
import {register} from "../../api/ApiWrapper";

export function Register({setIsLogin}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isFirstNameValid = firstName !== '' && firstName.match(/^[a-zA-Z]+$/);
    const isLastNameValid= lastName !== '' && lastName.match(/^[a-zA-Z]+$/);
    const isEmailValid = email !== '' && email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
    const isPasswordValid = password !== '' && password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
    const isConfirmPasswordValid = confirmPassword !== '' && confirmPassword === password;

    const handleRegister = async () => {
        setIsLoading(true);

        const data = {
            'userName': firstName + ' ' + lastName,
            'email': email,
            'password': password,
            'confirmPassword': confirmPassword,
        };

        try {
            const response = await register(data);
            console.log(response);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const isFormValid =
        isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    return (
        <div
            className='flex flex-col justify-center items-center p-5 gap-x-2.5 w-96 h-fit bg-background-gray drop-shadow-md rounded-xl'>
            <h1 className='text-2xl font-bold mb-4'>Register</h1>

            <div className='flex flex-row gap-x-2.5 w-full'>
                <InputBox label={'First Name'}
                          regex={/^[a-zA-Z]+$/}
                          errorMessage={'First name can only contain letters'}
                          type={'text'}
                          placeholder={'Enter your first name'}
                          value={firstName}
                          onChange={(e) => {setFirstName(e.target.value);
                              console.log(isFirstNameValid);}}
                />
                <InputBox label={'Last Name'}
                          regex={/^[a-zA-Z]+$/}
                          errorMessage={'Last name can only contain letters'}
                          type={'text'}
                          placeholder={'Enter your last name'}
                          value={lastName}
                          onChange={(e) => {setLastName(e.target.value);
                              console.log(isLastNameValid);}}
                />
            </div>

            <InputBox label={'Email'}
                      regex={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/}
                      errorMessage={'Invalid email'}
                      type={'email'}
                      placeholder={'Enter your email'}
                      value={email}
                      onChange={(e) => {setEmail(e.target.value);
                          console.log(isEmailValid);}}
            />
            <InputBox label={'Password'}
                      regex={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/}
                      errorMessage={'Password must contain at least 8 characters, one uppercase, one lowercase, one number'}
                      type={'password'}
                      placeholder={'Enter your password'}
                      value={password}
                      onChange={(e) => {setPassword(e.target.value);
                          console.log(isPasswordValid);}}
            />

            <InputBox label={'Confirm password'}
                      type={'password'}
                      placeholder={'Confirm your password'}
                      value={password}
                      onChange={(e) => {setConfirmPassword(e.target.value);
                          console.log(isConfirmPasswordValid);}}
            />

            <p className={`text-red-700 pb-3 ${isConfirmPasswordValid ? 'opacity-0' : ''}`}>Passwords do not match</p>

            <button className='bg-accent-blue px-5 py-3 rounded-xl w-2/3 text-lg font-semibold disabled:opacity-50'
                    onClick={handleRegister}
                    disabled={isLoading || !isFormValid}>
                {isLoading ? 'Registering...' : 'Register'}
            </button>

        </div>
    );
}

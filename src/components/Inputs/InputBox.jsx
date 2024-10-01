import React, { useState } from 'react';

const InputBoxWithValidation = ({ label, placeholder, type = 'text', regex, errorMessage, onChange }) => {
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);

        if (regex) {
            setIsValid(regex.test(newValue));
        }

        if (onChange) {
            onChange(event);
        }
    };

    return (
        <div className="mb-1 w-full">
            {label && <label className="block text-gray-700 font-bold">{label}</label>}
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md 
                            ${value !== '' && !isValid ? 'border-red-500' : 'border-gray-300'} 
                            focus:outline-none`}
            />
            {value !== '' && !isValid && <div className="text-red-500 mt-1">{errorMessage}</div>}
        </div>
    );
};

export default InputBoxWithValidation;

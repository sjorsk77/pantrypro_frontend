import React, { useState, useEffect } from 'react';

// Basic InputBox component
const InputBox = ({ label, placeholder, type = 'text', regex, errorMessage, value, onChange, disabled }) => {
    const [internalValue, setInternalValue] = useState(value || '');
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInternalValue(newValue);

        // Validate if a regex is provided
        if (regex) {
            setIsValid(regex.test(newValue));
        }

        // Pass the entire event to the parent component
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <div className="mb-1 w-full">
            {label && <label className="block text-gray-700 font-bold">{label}</label>}
            <input
                type={type}
                value={internalValue}
                placeholder={placeholder}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md 
                            ${internalValue !== '' && !isValid ? 'border-red-500' : 'border-gray-300'} 
                            focus:outline-none disabled:opacity-25`}
                disabled={disabled}
            />
            {internalValue !== '' && !isValid && <div className="text-red-500 mt-1">{errorMessage}</div>}
        </div>
    );
};

// InputBoxWithUnit component
const InputBoxWithUnit = ({ label, placeholder, value, onChange, unit = 'gr' }) => {
    const [internalValue, setInternalValue] = useState(value || '');

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInternalValue(newValue);

        // Pass the entire event to the parent component
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <div className="mb-1 w-full">
            {label && <label className="block text-gray-700 font-bold">{label}</label>}
            <div className="flex items-center">
                <input
                    type="number" // Ensure this is a number input
                    value={internalValue}
                    placeholder={placeholder}
                    onChange={handleChange}
                    className=" p-2 border rounded-md border-gray-300 focus:outline-none w-fit"
                />
                <span className="ml-2">{unit}</span> {/* Display the unit next to the input */}
            </div>
        </div>
    );
};

export { InputBox, InputBoxWithUnit };

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
        <div className="w-full">
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
        <div className="w-full">
            {label && <label className="block text-gray-700 font-bold">{label}</label>}
            <div className="flex items-center">
                <input
                    type="number"
                    value={internalValue}
                    placeholder={placeholder}
                    onChange={handleChange}
                    className=" p-2 border rounded-md border-gray-300 focus:outline-none"
                />
            </div>
        </div>
    );
};

//input looks like text
const EditableText = ({ value, onChange }) => {
    const [internalValue, setInternalValue] = useState(value || '');

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInternalValue(newValue);

        // Pass the entire event to the parent component
        if (onChange) {
            onChange(Number(newValue));
        }
    };

    return (
        <input
            type="text"
            value={internalValue}
            onChange={handleChange}
            className="bg-transparent border-none focus:outline-none text-gray-900 w-fit" // Tailwind classes
            style={{
                fontSize: 'inherit', // Inherit font size
                color: 'inherit',    // Inherit text color
                width: 'auto',       // Full width
            }}
        />
    );
};

const NumericInput = ({ label, placeholder, value, onChange, errorMessage, min, max, error }) => {
    const [internalValue, setInternalValue] = useState(value || '');
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleChange = (event) => {
        const newValue = event.target.value;

        // Validate input: allow only numeric values
        if (/^-?\d*\.?\d*$/.test(newValue) || newValue === '') {
            setInternalValue(newValue);
            setIsValid(true);
        } else {
            setIsValid(false);  // Invalid input
        }

        // Pass the entire event to the parent component
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <div className="w-full flex flex-col">
            {label && <label className="block text-gray-700 font-bold">{label}</label>}
            <input
                type="text" // We use text type to handle input validation manually
                value={internalValue}
                placeholder={placeholder}
                onChange={handleChange}
                min={min}
                max={max}
                className={`w-full p-2 border rounded-md transition duration-200 ease-in-out focus:outline-none 
                            ${internalValue !== '' && !isValid ? 'border-red-500' : 'border-gray-300'} 
                            focus:ring-2 focus:ring-blue-500 disabled:opacity-25`}
            />
            {internalValue !== '' && !isValid && (
                <div className="text-red-500 mt-1">{errorMessage || error}</div>
            )}
        </div>
    );
};


export { InputBox, InputBoxWithUnit, EditableText, NumericInput};

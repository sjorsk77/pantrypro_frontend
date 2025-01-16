import React, { useState } from 'react';
import { useEffect } from 'react';

const Dropdown = ({ label, options, value, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        // Update selectedOption when the value prop changes
        setSelectedOption(value);
    }, [value]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        console.log(option);
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            {label && <label className="block text-gray-700 font-bold">{label}</label>}
            <button
                onClick={toggleDropdown}
                className='w-full p-2 border rounded-md focus:outline-none flex justify-between items-center'
            >
                {selectedOption || 'Select..'}
            </button>
            {isOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="cursor-pointer px-2 py-2 hover:bg-gray-200"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const EditableDropdown = ({ options, value, onChange }) => {
    const [selectedValue, setSelectedValue] = useState(value || options[0]?.value || '');

    useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);

        // Pass the selected value to the parent component
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <select
            value={selectedValue}
            onChange={handleChange}
            className="bg-transparent border-none focus:outline-none text-gray-900"
            style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
            }}
        >
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};

export {Dropdown, EditableDropdown};
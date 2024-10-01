import React, { useState } from 'react';

const Dropdown = ({ label, options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        console.log(option);
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="relative mb-1 w-1/3">
            {label && <label className="block text-gray-700 font-bold">{label}</label>}
            <button
                onClick={toggleDropdown}
                className='w-full p-2 border rounded-md focus:outline-none flex justify-between items-center'
            >
                {selectedOption || 'Select..'}
            </button>
            {isOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
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

export default Dropdown;
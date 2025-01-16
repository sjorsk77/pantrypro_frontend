import React, { useState } from 'react';

const ToggleButton = ({ label, initialState = false, onToggle }) => {
    const [isChecked, setIsChecked] = useState(initialState);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        if (onToggle) {
            onToggle(!isChecked);
        }
    };

    return (
        <div className="flex items-center select-none">
            <label htmlFor="toggle" className="flex items-center cursor-pointer gap-3">
                <div className="ml-3 text-gray-700 font-medium">{label}</div>
                <div className="relative">
                    <input
                        id="toggle"
                        type="checkbox"
                        className="hidden"
                        checked={isChecked}
                        onChange={handleToggle}
                    />
                    <div className={`block w-14 h-8 rounded-full ${isChecked ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <div
                        className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isChecked ? 'translate-x-full' : ''}`}></div>
                </div>
            </label>
        </div>
    );
};

export default ToggleButton;

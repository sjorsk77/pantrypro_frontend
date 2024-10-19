import {useRef, useEffect, useState} from "react";
import {InputBox, InputBoxWithUnit} from "../Inputs/InputBox";
import useApiWrapper from "../../api/ApiWrapper";
import {toast} from "react-toastify";


function AddFood({onClose, onAdd, pantryId})  {

    const {addFood, getFoodByBarcode} = useApiWrapper();

    const popupRef = useRef(null);

    const [eanCode, setEanCode] = useState('');
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [img, setImg] = useState('');
    const [eanActive, setEanActive] = useState(true);

    const handleExpiryDateChange = (event) => {
        setExpiryDate(event.target.value);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    }


    const handleEanCodeChange = async (event) => {
        setEanCode(event.target.value);
        if (event.target.value.length === 8 || event.target.value.length === 13) {
            setEanActive(false);
            try {
                console.log('Fetching food item');
                const foodItem = await getFoodByBarcode(event.target.value);
                if (!foodItem.status_verbose === 'product not found') {
                    throw new Error('Product not found');
                }
                setImg(foodItem.product.image_url || '');
                setName(foodItem.product.product_name || '');
                setQuantity(foodItem.product.product_quantity || '');
                setUnit(foodItem.product.product_quantity_unit || '');
                setEanActive(true);

            } catch (error) {
                setImg('');
                setName('');
                setQuantity('');
                setUnit('');
                setEanActive(true);

            }
        } else {
            setEanActive(true);
        }

        console.log(eanActive);
    }



    const handleSubmit = async () => {
        const data = {
            'eanCode': eanCode,
            'name': name,
            'quantity': quantity,
            'expiryDate': expiryDate,
            'pantryId': pantryId
        };

        console.log(expiryDate);

        try {
            const response = await addFood(data);
            onClose();
            onAdd();
            toast.success('Food item added successfully');

        } catch (error) {
            toast(error.message);
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Add Food Item</h2>
                {img && (<img src={img} alt='' className="w-24 h-24 rounded-full mx-auto object-contain flex justify-center items-center"/>)}

                <InputBox
                    label="Name"
                    placeholder="Enter name"
                    value={name}
                    onChange={handleNameChange}
                />
                <InputBox label="EAN code" placeholder="Enter EAN code" regex={/^\d{8}$|^\d{13}$/} errorMessage={"Please enter a valid EAN-8 or EAN-13 code"} onChange={handleEanCodeChange} disabled={!eanActive}/>
                <InputBox label="Expiry Date" type="date" onChange={handleExpiryDateChange}/>
                <InputBoxWithUnit label="Quantity" placeholder="Enter quantity" value={quantity} unit={unit} onChange={handleQuantityChange}/>

                
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-accent-teal text-white px-4 py-2 rounded-md disabled:opacity-50"
                        onClick={handleSubmit}
                        disabled={!eanCode || !name || !quantity || !expiryDate}
                    >
                        Add
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AddFood;
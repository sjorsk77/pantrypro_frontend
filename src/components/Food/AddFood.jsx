import {useRef, useEffect, useState} from "react";
import {InputBox, InputBoxWithUnit} from "../Inputs/InputBox";
import useApiWrapper from "../../api/ApiWrapper";
import {toast} from "react-toastify";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import {Dropdown} from "../Inputs/Dropdown";


function AddFood({onClose, onAdd, pantryId})  {

    const unitTypes = ['g', 'kg', 'oz', 'lb', 'lt', 'ml', 'l', 'fl'];

    const {addFood, getFoodByBarcode} = useApiWrapper();

    const popupRef = useRef(null);

    const [eanCode, setEanCode] = useState('');
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [img, setImg] = useState('');
    const [eanActive, setEanActive] = useState(true);

    const [scannerActive, setScannerActive] = useState(true);

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
                const retrievedUnit = foodItem.product.product_quantity_unit || '';
                if (unitTypes.includes(retrievedUnit)) {
                    console.log('Setting unit');
                    setUnit(retrievedUnit); // Update the unit
                } else {
                    setUnit(''); // Or set to default (e.g., empty string)
                }
                setEanCode(foodItem.code);
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
            'pantryId': pantryId,
            'unit': unit
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
            <div ref={popupRef} className="flex flex-col bg-white p-6 rounded-lg shadow-lg w-96 gap-2">
                <h2 className="text-2xl font-bold mb-4">Add food</h2>
                {img && (<img src={img} alt=''
                              className="w-24 h-24 rounded-full mx-auto object-contain flex justify-center items-center"/>)}
                <InputBox
                    label="Name"
                    placeholder="Enter name"
                    value={name}
                    onChange={handleNameChange}
                />
                <div className='flex flex-row items-end gap-2'>
                    <InputBox label="EAN code" placeholder="Enter EAN code" regex={/^\d{8}$|^\d{13}$/}
                              errorMessage={"Please enter a valid EAN-8 or EAN-13 code"} onChange={handleEanCodeChange}
                              disabled={!eanActive} value={eanCode}/>
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setScannerActive(true)}
                    >
                        Scan
                    </button>
                </div>


                <InputBox label="Expiry Date" type="date" onChange={handleExpiryDateChange}/>
                <div className='flex flex-row items-end gap-2'>
                    <InputBoxWithUnit label="Quantity" placeholder="Enter quantity" value={quantity} unit={unit}
                                      onChange={handleQuantityChange}/>
                    <Dropdown options={unitTypes} value={unit} onSelect={(value) => setUnit(value)}/>
                </div>



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
                        disabled={!eanCode || !name || !quantity || !expiryDate || !unit}
                    >
                        Add
                    </button>
                </div>

                {scannerActive && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col items-center">
                            <h2 className="text-xl font-bold mb-4">Scan Barcode</h2>
                            <BarcodeScannerComponent
                                width={400}
                                height={400}
                                onUpdate={(err, result) => {
                                    if (result) {
                                        handleEanCodeChange({ target: { value: result.text } });
                                        setScannerActive(false); // Close the scanner after scanning
                                    }
                                }}
                            />
                            <button
                                type="button"
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
                                onClick={() => setScannerActive(false)}
                            >
                                Enter manually
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AddFood;
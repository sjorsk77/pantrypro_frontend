import {InputBox} from "../Inputs/InputBox";
import {Dropdown} from "../Inputs/Dropdown";
import {useState} from "react";
import useApiWrapper from "../../api/ApiWrapper";
import Cookies from "js-cookie";
import {toast} from "react-toastify";


function CreatePantry( {onPantryCreated} ) {

    const {createPantry} = useApiWrapper();

    const [name, setName] = useState('');
    const [storageType, setStorageType] = useState('');


    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleCreatePantry = async () => {
        const data = {
            'token': Cookies.get('token'),
            'name': name,
            'storageType': storageType.toUpperCase()
        };


        try {
            const response = await createPantry(data);
            onPantryCreated();
            toast.success('Pantry created successfully');
        } catch (error){
            toast.error(error.message);
        }
    }

    const isButtonDisabled = !name || !storageType;

    return (
        <div className="flex flex-row justify-center items-center w-full h-fit gap-3">
            <InputBox label={'Name'} type={'text'} placeholder={'Enter the name of your pantry'} onChange={handleNameChange}/>
            <Dropdown label={'Type'} options={['Shelf', 'Freezer', 'Fridge']} onSelect={setStorageType}/>
            <button
                className={`bg-accent-teal flex justify-center items-center text-white rounded-xl h-fit p-3 mt-5 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleCreatePantry}
                disabled={isButtonDisabled}>
                <box-icon name='plus-medical'></box-icon>
            </button>
        </div>
    );

}
export default CreatePantry;
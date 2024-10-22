import API_CONFIG from "./ApiConfig";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const useApiWrapper = () => {
    const navigate = useNavigate();

    const sendApiCall = async (api, endpoint, method = 'GET', body = null, pathVar = null, authorize = false) => {

        let url = `${API_CONFIG[api].baseURL}${API_CONFIG[api].endpoints[endpoint]}`;
        if (pathVar) {
            url += `/${pathVar}`;
        }

        const headers = {
            'Content-Type': 'application/json',
        };

        if (authorize) {
            headers["Authorization"] = `Bearer ` + Cookies.get('token');
        }

        const options = {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        };

        console.log('Sending request to:', url, 'with options:', options);


        const response = await fetch(url, options);

        if (response.status === 403 || response.status === 401) {
            console.log('Unauthorized');
            Cookies.set('token', '');
            navigate('/login');
        }

        const contentType = response.headers.get('Content-Type');
        let responseBody;

        if (contentType && contentType.includes('application/json')) {
            responseBody = await response.json(); // Parse as JSON if Content-Type is JSON
        } else {
            responseBody = await response.text(); // Parse as text otherwise
        }

        if (!response.ok) {
            console.log('Error response:', response.statusText); // Log the error
            throw new Error(responseBody);
        }


        console.log('StatusCode:', response.status ,'Success response:', responseBody);

        return responseBody;
    };

    return {
        login: (data) => sendApiCall('pantryproApi', 'login', 'POST', data),
        register: (data) => sendApiCall('pantryproApi', 'register', 'POST', data),
        getUser : (token) => sendApiCall('pantryproApi', 'user', 'GET', null, token, true),

        getPantries: (token) => sendApiCall('pantryproApi', 'pantries', 'GET', null, token, true),
        getPantry: (id) => sendApiCall('pantryproApi', 'singlePantry', 'GET', null, id, true),
        createPantry: (data) => sendApiCall('pantryproApi', 'pantries', 'POST', data, null, true),
        deletePantry: (id) => sendApiCall('pantryproApi', 'pantries', 'DELETE', null, id, true),

        getFood: (pantryId) => sendApiCall('pantryproApi', 'food', 'GET', null, pantryId, true),
        deleteFood: (id) => sendApiCall('pantryproApi', 'food', 'DELETE', null, id, true),
        addFood: (data) => sendApiCall('pantryproApi', 'food', 'POST', data, null, true),

        getDiets: (token) => sendApiCall('pantryproApi', 'diets', 'GET', null, token, true),
        updateDiet: (data) => sendApiCall('pantryproApi', 'diets', 'PUT', data, data.id, true),
        getDietTypes: () => sendApiCall('pantryproApi', 'diets', 'GET', null, 'types', true),
        addDiet: (data) => sendApiCall('pantryproApi', 'createDiet', 'POST', data, null, true),

        getRiskFood: (body) => sendApiCall('pantryproApi', 'riskFood', 'POST', body, null, true),

        getFoodByBarcode: (barcode) => sendApiCall('openfoodfactsApi', 'getProduct', 'GET', null, barcode, false),
    }
}
export default useApiWrapper;



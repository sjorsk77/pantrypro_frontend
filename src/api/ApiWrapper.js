import API_CONFIG from "./ApiConfig";
import Cookies from "js-cookie";

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

    console.log(url);
    console.log(options);

    const response = await fetch(url, options);

    if (response.statusCode === 401) {
        console.log('Unauthorized');
        Cookies.set('token', '');
    }

    const contentType = response.headers.get('Content-Type');
    let responseBody;

    if (contentType && contentType.includes('application/json')) {
        responseBody = await response.json(); // Parse as JSON if Content-Type is JSON
    } else {
        responseBody = await response.text(); // Parse as text otherwise
    }

    if (!response.ok) {
        console.log('Error response:', responseBody); // Log the error
        throw new Error(`Error: ${response.body}`);
    }


    console.log('StatusCode:', response.status ,'Success response:', responseBody);


    return responseBody;
};

//Api: pantryproApi, edamamApi, openfoodfactsApi
const login = (data) => sendApiCall('pantryproApi', 'login', 'POST', data);
const register = (data) => sendApiCall('pantryproApi', 'register', 'POST', data);
const getUser = (token) => sendApiCall('pantryproApi', 'user', 'GET', null, token, true);

const getPantries = (token) => sendApiCall('pantryproApi', 'pantries', 'GET', null, token, true);
const getPantry = (id) => sendApiCall('pantryproApi', 'singlePantry', 'GET', null, id, true);
const createPantry = (data) => sendApiCall('pantryproApi', 'pantries', 'POST', data, null, true);
const deletePantry = (id) => sendApiCall('pantryproApi', 'pantries', 'DELETE', null, id, true);

const getFood = (pantryId) => sendApiCall('pantryproApi', 'food', 'GET', null, pantryId, true);
const deleteFood = (id) => sendApiCall('pantryproApi', 'food', 'DELETE', null, id, true);

const getRiskFood = (body) => sendApiCall('pantryproApi', 'riskFood', 'POST', body, null, true);

export {
    login,
    register,
    getUser,
    getPantries,
    createPantry,
    deletePantry,
    getFood,
    getPantry,
    deleteFood,
    getRiskFood
}
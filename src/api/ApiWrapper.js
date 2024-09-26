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

    console.log(options);


    const response = await fetch(url, options);

    if (response.statusCode === 401) {
        console.log('Unauthorized');
        Cookies.set('token', '');
    }

    if (!response.ok) {
        console.log(response);
        throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
};

//Api: pantryproApi, edamamApi, openfoodfactsApi
const login = (data) => sendApiCall('pantryproApi', 'login', 'POST', data);
const register = (data) => sendApiCall('pantryproApi', 'register', 'POST', data);
const getUser = (token) => sendApiCall('pantryproApi', 'user', 'GET', null, token, true);
const getPantries = (token) => sendApiCall('pantryproApi', 'pantries', 'GET', null, token, true);
const createPantry = (data) => sendApiCall('pantryproApi', 'pantries', 'POST', data, data.token, true);
const deletePantry = (id) => sendApiCall('pantryproApi', 'pantries', 'DELETE', null, id, true);

export {
    login,
    register,
    getUser,
    getPantries,
    createPantry,
    deletePantry
}
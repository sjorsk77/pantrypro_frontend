import API_CONFIG from "./ApiConfig";

const sendApiCall = async (api, endpoint, method = 'GET', body = null) => {
    const url = `${API_CONFIG[api].baseURL}${API_CONFIG[api].endpoints[endpoint]}`;
    console.log(url);
    console.log(body);
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
};

//Api: pantryproApi, edamamApi, openfoodfactsApi
const login = (data) => sendApiCall('pantryproApi', 'login', 'POST', data);
const register = (data) => sendApiCall('pantryproApi', 'register', 'POST', data);

export {
    login,
    register,
}
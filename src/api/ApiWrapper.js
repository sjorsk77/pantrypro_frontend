import API_CONFIG from "./ApiConfig";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {DIET_TYPES, HEALTH_TYPES} from "../assets/Data/DietaryTypes";

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
            Cookies.set('token', '');
            navigate('/login');
        }

        const contentType = response.headers.get('Content-Type');
        let responseBody;

        if (contentType && contentType.includes('application/json')) {
            responseBody = await response.json();
        } else {
            responseBody = await response.text();
        }

        if (!response.ok) {
            console.log('Error response:', response.statusText);
            throw new Error(responseBody);
        }

        return responseBody;
    };

    const searchRecipes = async (requestBody) => {

        let url = `${API_CONFIG.edamamApi.baseURL}?type=public`;
        url += `&app_id=${API_CONFIG.edamamApi.applicationId}&app_key=${API_CONFIG.edamamApi.apiKey}`;

        if (requestBody && requestBody.dietTypes) {
            const dietTypes = requestBody.dietTypes.filter(type => DIET_TYPES.includes(type.name));
            const healthTypes = requestBody.dietTypes.filter(type => HEALTH_TYPES.includes(type.name));

            if (dietTypes.length > 0) {
                dietTypes.forEach(diet => {
                    url += `&diet=${diet.name.toLowerCase()}`;
                });
            }

            if (healthTypes.length > 0) {
                healthTypes.forEach(health => {
                    url += `&health=${health.name.toLowerCase()}`;
                });
            }
        } else {
            console.error('requestBody or dietTypes is undefined:', requestBody);
        }

        if (requestBody.maxCalories || requestBody.minCalories) {
            url += `&calories=${requestBody.minCalories || 0}-${requestBody.maxCalories || ''}`;
        }

        if (requestBody.ingredients && requestBody.ingredients.length > 0) {
            url += `&q=${requestBody.ingredients.join(",")}`;
        }

        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            console.log(url);
            const response = await fetch(url, { method: 'GET', headers });

            if (!response.ok) {
                console.error('Error response:', response.statusText);
                throw new Error(`Failed to fetch recipes: ${response.statusText}`);
            }

            const data = await response.json();
            return data.hits.map(hit => hit.recipe); // Returns only recipe objects
        } catch (error) {
            console.error("Error fetching recipes from Edamam:", error);
            throw error;
        }
    };

    return {
        login: (data) => sendApiCall('pantryproApi', 'login', 'POST', data),
        register: (data) => sendApiCall('pantryproApi', 'register', 'POST', data),
        getUser : (token) => sendApiCall('pantryproApi', 'user', 'GET', null, token, true),

        getPantries: () => sendApiCall('pantryproApi', 'pantries', 'GET', null, null, true),
        getPantry: (id) => sendApiCall('pantryproApi', 'singlePantry', 'GET', null, id, true),
        createPantry: (data) => sendApiCall('pantryproApi', 'pantries', 'POST', data, null, true),
        deletePantry: (id) => sendApiCall('pantryproApi', 'pantries', 'DELETE', null, id, true),

        getFood: (pantryId) => sendApiCall('pantryproApi', 'food', 'GET', null, pantryId, true),
        deleteFood: (id) => sendApiCall('pantryproApi', 'food', 'DELETE', null, id, true),
        addFood: (data) => sendApiCall('pantryproApi', 'food', 'POST', data, null, true),

        getDiets: () => sendApiCall('pantryproApi', 'diets', 'GET', null, null, true),
        updateDiet: (data) => sendApiCall('pantryproApi', 'diets', 'PATCH', data, data.id, true),
        getDietTypes: () => sendApiCall('pantryproApi', 'diets', 'GET', null, 'types', true),
        createDiet: (data) => sendApiCall('pantryproApi', 'createDiet', 'POST', data, null, true),

        getRiskFood: (daysToExpiration) => sendApiCall('pantryproApi', 'riskFood', 'GET', null, daysToExpiration, true),

        getFoodByBarcode: (barcode) => sendApiCall('openfoodfactsApi', 'getProduct', 'GET', null, barcode, false),

        searchForRecipes: (requestBody) => searchRecipes(requestBody),
    }
}
export default useApiWrapper;



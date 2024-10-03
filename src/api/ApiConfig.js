const API_CONFIG = {
    pantryproApi: {
        baseURL: 'http://localhost:8080',
        endpoints: {
            login: '/account/login',
            register: '/account/register',
            user: '/user',
            pantries: '/pantry',
            singlePantry: '/pantry/single',
            food: '/food',
            riskFood: '/food/risk',
        },
    },
    edamamApi: {
        baseURL: 'https://api.edamam.com',
        endpoints: {

        },
    },
    openfoodfactsApi: {
        baseURL: 'https://world.openfoodfacts.org/api/v0',
        endpoints: {
            getProduct: '/product',
        },
    },
};

export default API_CONFIG;
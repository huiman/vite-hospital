// api/api.ts

import axios from 'axios';

// Define a base URL for your API
const BASE_URL = 'http://localhost:3000';

// Define a reusable Axios instance with common configurations
export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000, // set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
        // You can also set common headers, such as authorization headers, here
    },
});

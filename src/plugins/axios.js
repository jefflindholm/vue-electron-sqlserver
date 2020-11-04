import axios from 'axios';

const baseURL = `https://newsapi.org/v2`;
const apiKey = process.env.VUE_APP_APIKEY;
const instance = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
        'X-Api-Key': apiKey,
    }
});

export default instance;
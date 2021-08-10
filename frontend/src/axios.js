import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
});

instance.interceptors.response.use(request => {
    // console.log('Starting Request', JSON.stringify(request, null, 2));
    return request;
})
export default instance;

import axios from 'axios';
import { useAuthContext } from 'context/auth';
import { parse, stringify } from 'qs'

// let numPendingRequests = 0;
const UseAxiosConfig = () => {

    const { user, logOut } = useAuthContext();

    const instance = (baseURL, contentType, isBlob = false) => {
        const axiosInstance = axios.create({
            baseURL: baseURL,
            responseType: isBlob ? 'blob' : 'json',
            paramsSerializer: {
                encode: parse,
                serialize: stringify
            } 
        });
        axiosInstance.interceptors.request.use(
            config => {

                // numPendingRequests++;
                const token = sessionStorage.getItem('accessToken');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token.trim()}`;
                }
                config.headers['Content-Type'] = contentType ?? "application/json";

                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
        axiosInstance.interceptors.response.use(
            response => {
                // numPendingRequests--;
                // if (numPendingRequests === 0) {

                // }
                return response;
            },
            error => {
                console.error(error);
                console.log('====================================');
                console.log("error",error);
                console.log("error.response",error.response);
                console.log("error?.response?.status",error?.response?.status);
                console.log('====================================');
                if (error.response && (error?.response?.status === 401 || error?.response?.status === 403)) {
                    logOut()
                }
                return Promise.reject(error);
            });
        return axiosInstance
    }
    return {
        instance
    };
};
export default UseAxiosConfig
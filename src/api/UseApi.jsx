import { useCallback } from "react";
import UseAxiosConfig from "./UseAxiosConfig";
const UseApi = () => {
    
    const {instance} = UseAxiosConfig();
    const makeRequest = useCallback(async (method, baseURL, endpoint, data, isBlob = false, contentType = 'application/json; charset=utf8') => {
        try {
            const axiosInstance = instance(baseURL, contentType, isBlob);
            const response = await axiosInstance[method](endpoint, data);
            return response;
        } catch (err) {
            throw err;
        }
    }, []);  

    const get = useCallback((baseURL, endpoint, isBlob = false) => 
        makeRequest('get', baseURL, endpoint, null, isBlob), [makeRequest]);

    const getWithUrl = useCallback((url, isBlob = false) => 
        makeRequest('get', '', url, null, isBlob), [makeRequest]);

    const getWithParameters = useCallback((baseURL, endpoint, data, isBlob = false) => 
        makeRequest('get', baseURL, endpoint, { params: data }, isBlob), [makeRequest]);

    const post = useCallback((baseURL, endpoint, request) => 
        makeRequest('post', baseURL, endpoint, request), [makeRequest]);

    const postFormData = useCallback((baseURL, endpoint, request) => 
        makeRequest('post', baseURL, endpoint, request, false, 'multipart/form-data'), [makeRequest]);

    const put = useCallback((baseURL, endpoint, request) => 
        makeRequest('put', baseURL, endpoint, request), [makeRequest]);

    const remove = useCallback((baseURL, endpoint) => 
        makeRequest('delete', baseURL, endpoint), [makeRequest]);

    return { get, getWithUrl, getWithParameters, post, postFormData, put, remove };
};

export default UseApi;
import UseApi from './UseApi';

const UseAuthApi = () => {
    const {post} = UseApi();
    const baseUrl = process.env.NEXT_PUBLIC_SECURITY_API_BASE_URL;
    const endpoint = process.env.NEXT_PUBLIC_AUTHENTICATION_ENDPOINT;



    const login = async (email, password) => {
        const request = {
            email: email,
            password: password
        }
        const response = await post(baseUrl, endpoint + "/login", request)
        return response?.data?.accessToken
    };

    const validateToken = async (token) => {
        const request = {
            token: token,
        };
        const response = await post(baseUrl, endpoint + "/ValidateToken", request)

        return response.data
    };

    return {
        login,
        validateToken
    };
};

export default UseAuthApi;
import UseApi from './UseApi';

const UseUbigeoApi = () => { 
    const useHookApi = UseApi();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_PROD_NUEVO_SISTEMA_FONDOS;
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_UBIGEO;

    const getDistrito = async () => {
        const response = await useHookApi.get(baseUrl, `${endpoint}/Distrito`);
        return response;
    };

    const getDepartamento = async () => {
        const response = await useHookApi.get(baseUrl, `${endpoint}/Departamento`);
        return response;
    };

    const getProvincia = async () => {
        const response = await useHookApi.get(baseUrl, `${endpoint}/Provincia`);
        return response;
    };

    return { getDistrito, getDepartamento, getProvincia };
};

export default UseUbigeoApi;
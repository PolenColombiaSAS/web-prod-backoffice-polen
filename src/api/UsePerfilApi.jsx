import UseApi from './UseApi';

const UsePerfilApi = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_PROD_NUEVO_SISTEMA_FONDOS;
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_PERFIL;
    
    const useHookApi = UseApi();
    const get = async () => {
        const response = await useHookApi.get(baseUrl, endpoint)
    
        return response?.data
    };
    const obtenerCitasUsuario = async () => {
        const response = await useHookApi.get(baseUrl, `${endpoint}/Citas`)
    
        return response?.data
    };

    return { get ,obtenerCitasUsuario};
};

export default UsePerfilApi; 
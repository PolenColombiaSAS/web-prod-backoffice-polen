import UseApi from './UseApi';

const UseMotivoDescarte = () => {

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_PROD_NUEVO_SISTEMA_FONDOS;
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_MOTIVO_DESCARTE;

    const useHookApi = UseApi();
    const getAll = async () => {
        const response=await useHookApi.get(baseUrl, endpoint)
        return response.data
    };
    return {
        getAll
    };
};

export default UseMotivoDescarte;

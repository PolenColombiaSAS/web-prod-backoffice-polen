import UseApi from './UseApi';

const UseAgrupadoProformaApi = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_PROD_NUEVO_SISTEMA_FONDOS;
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_AGRUPADO_PROFORMA;
    const useHookApi = UseApi();

    const getProformas = async (id) => {
        const response = await useHookApi.get(baseUrl,`${endpoint}/${id}/Proformas`)
        return response.data
    }
    
    return { getProformas };
};

export default UseAgrupadoProformaApi;
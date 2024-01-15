import UseApi from './UseApi';

const UseReporte = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_PROD_POLEN_APP;
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_POLEN_REPORTES;
    const useHookApi = UseApi();

    const getReporte1 = async (queryParams) => {
        const response = await useHookApi.get(baseUrl,`${endpoint}/Reporte1?${queryParams}`)
        return response.data
    }
    
    const downloadReporte1 = async (queryParams) => {
        const response = await useHookApi.get(baseUrl,`${endpoint}/Reporte1/export?${queryParams}`,true)
        return response.data
    }
    return { 
        getReporte1,
        downloadReporte1 
    };
};

export default UseReporte;
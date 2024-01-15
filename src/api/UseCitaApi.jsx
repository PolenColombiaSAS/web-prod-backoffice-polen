import UseApi from './UseApi';

const UseCitaApi = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_PROD_NUEVO_SISTEMA_FONDOS;
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_CITAS;
    
    const useHookApi = UseApi();
    const eliminarCita = async (idCita) => {
        const response = await useHookApi.remove(baseUrl, `${endpoint}/${idCita}`)
    
        return response?.data
    };
    const actualizarCita = async (idCita,request) => {
        const response = await useHookApi.put(baseUrl, `${endpoint}/${idCita}`,request)
    
        return response?.data
    };

    return { eliminarCita ,actualizarCita};
};

export default UseCitaApi; 
import UseApi from './UseApi';

const UsePersonaApi = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_PROD_NUEVO_SISTEMA_FONDOS;
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_PERSONA;
    const useHookApi = UseApi();

    const getById = async (id) => {
        const response = await useHookApi.get(baseUrl,`${endpoint}/${id}`)
        return response.data
    };
    const getByDocumento = async (documento) => {
        const response = await useHookApi.get(baseUrl,`${endpoint}/NumeroDocumento/${documento}`)
        return response.data
    };
    
    const getByTelefono = async (telefono) => {
        const response = await useHookApi.get(baseUrl,`${endpoint}/NumeroTelefono/${telefono}`)
        return response.data
    };
    const searchByNombreCompleto = async (nombreCompleto) => {
        const response = await useHookApi.get(baseUrl,`${endpoint}/NombreCompleto/${nombreCompleto}`)
        return response.data
    };
    
    const getProspectosPersonaRecientes = async (idPersona) => {
        const response = await useHookApi.get(baseUrl,`${endpoint}/${idPersona}/prospecto/recientes`)
        return response.data
    };
    
    return {  
        getById,
        getByDocumento,
        getByTelefono,
        getProspectosPersonaRecientes,
        searchByNombreCompleto
    };
};

export default UsePersonaApi;
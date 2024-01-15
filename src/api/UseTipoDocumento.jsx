import UseApi from './UseApi';

const UseTipoDocumento = () => {

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_PROD_NUEVO_SISTEMA_FONDOS;
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_TIPO_DOCUMENTO;

    const useHookApi = UseApi();
    const getAll = async () => {
        const response=await useHookApi.get(baseUrl, endpoint)
        return response.data
    };
    const ObtenerDocumentosAdicionalesSolicitadosPorADV = async () => {
        const response=await useHookApi.get(baseUrl, `${endpoint}/ADV/Solicitados/Adicionales`)
        return response.data
    };

    const RegistrarDocumentosAdicionalesSolicitadosPorADVAlProspecto = async (idProspecto,request) => {
        const response=await useHookApi.post(baseUrl, `${endpoint}/Prospecto/${idProspecto}/Solicitud/DocumentosAdicionales`,request)
        return response.data
    };
    const getDocumentosRequeridosPorProspecto = async (idProspecto) => {
        const response=await useHookApi.get(baseUrl, `${endpoint}/Prospecto/${idProspecto}`)
        return response.data
    };
    return {
        getAll,
        getDocumentosRequeridosPorProspecto,
        ObtenerDocumentosAdicionalesSolicitadosPorADV,
        RegistrarDocumentosAdicionalesSolicitadosPorADVAlProspecto
    };
};

export default UseTipoDocumento;

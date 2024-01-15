import UseApi from './UseApi';

const UseIntegracionSistemaLegacyApi = () => {
    const useHookApi = UseApi();
    const baseUrl = process.env.NEXT_PUBLIC_FONDOS_INTEGRACION;
    const endpointVendedor = process.env.NEXT_PUBLIC_VENDEDOR_ENDPOINT;
    const endPointAsociado=process.env.NEXT_PUBLIC_ASOCIADO_ENDPOINT

    const getVendedorPorDNI = async (dni) => {
        const response = await useHookApi.get(baseUrl, `${endpointVendedor}/Dni/${dni}`)
        return response.data
    };
    const getDatosCertificadoActualPorNumeroDocumentoAsociado = async (numDocumento) => {
        const response = await useHookApi.get(baseUrl, `${endPointAsociado}/NumeroDocumento/${numDocumento}/Historico`)
        return response.data
    };
    const getRequisitoriados = async (numDocumento) => {
        const response = await useHookApi.get(baseUrl, `${endPointAsociado}/NumeroDocumento/${numDocumento}/Requisitoriado`)
        return response.data
    };

    return { 
        getVendedorPorDNI,
        getDatosCertificadoActualPorNumeroDocumentoAsociado,
        getRequisitoriados
    };
};

export default UseIntegracionSistemaLegacyApi;
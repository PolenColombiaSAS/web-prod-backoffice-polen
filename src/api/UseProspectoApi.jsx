import UseApi from './UseApi';

const UseProspectoApi = () =>
{
    const useHookApi = UseApi();

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_PROD_NUEVO_SISTEMA_FONDOS;
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_PROSPECTO;
    const endpointOrigen = process.env.NEXT_PUBLIC_ENDPOINT_ORIGEN;
    const endpointTipoDocumentoIdentiadad = process.env.NEXT_PUBLIC_ENDPOINT_TIPO_DOCUMENTO_IDENTIDAD;

    const getFilePorIdProspecto = async (prospectoId) =>
    {
        const response = await useHookApi.get(baseUrl, `${endpoint}/${prospectoId}/Files`)
        return response.data
    };
    const getProspectoById = async (prospectoId) =>
    {
        const response = await useHookApi.get(baseUrl, `${endpoint}/${prospectoId}`)
        return response.data
    };
    const enviarAprobacionDocumento = async (prospectoId, comentario) =>
    {
        const request = {
            comentario: comentario
        }
        const response = await useHookApi.post(baseUrl, `${endpoint}/${prospectoId}/EnviarAprobacion`, request)
        return response.data
    };
    const rechazarDocumentoProspectos = async (prospectoId, comentario) =>
    {
        const request = {
            comentario: comentario
        }
        const response = await useHookApi.post(baseUrl, `${endpoint}/${prospectoId}/Documentos/Rechazar`, request)
        return response.data
    };
    const devolverDocumentoProspectos = async (prospectoId, comentario) =>
    {
        const request = {
            comentario: comentario
        }
        const response = await useHookApi.post(baseUrl, `${endpoint}/${prospectoId}/Documentos/Devolver`, request)
        return response.data
    };

    const procesarRevisionDocumentoProspectos = async (prospectoId, comentario) =>
    {
        const request = {
            comentario: comentario
        }
        const response = await useHookApi.post(baseUrl, `${endpoint}/${prospectoId}/Documentos/ProcesarRevision`, request)
        return response.data
    };

    const asignarADV = async (prospectoId) =>
    {
        const request = {
        }
        const response = await useHookApi.post(baseUrl, `${endpoint}/${prospectoId}/Asignar/ADV`, request)
        return response.data
    };


    const getEstados = async () =>
    {
        const response = await useHookApi.get(baseUrl, `${endpoint}/Estados`)
        return response.data
    }


    const getAgrupadoProformas = async (prospectoId) =>
    {
        const response = await useHookApi.get(baseUrl, `${endpoint}/${prospectoId}/AgrupadoProformas`)
        return response.data
    }
    const geAgrupadoProformasAprobada = async (prospectoId) =>
    {
        const response = await useHookApi.get(baseUrl, `${endpoint}/${prospectoId}/AgrupadoProformas/Aprobada`)
        return response.data
    }
    const getAsociadoByIdProspecto = async (prospectoId) =>
    {
        const response = await useHookApi.get(baseUrl, `${endpoint}/${prospectoId}/Asociado`)
        return response.data
    }

    const getMetaDataprospecto = async (prospectoId) =>
    {
        const response = await useHookApi.get(baseUrl, `${endpoint}/${prospectoId}/MetaData`)
        return response.data
    }

    const getEventos = async (prospectoId) =>
    {
        const response = await useHookApi.get(baseUrl, `${endpoint}/${prospectoId}/Eventos`)
        return response.data
    }

    const getOrigen = async () =>
    {
        const response = await useHookApi.get(baseUrl, endpointOrigen)
        return response.data
    }

    const getTipoDocumentoIdentidad = async () =>
    {
        const response = await useHookApi.get(baseUrl, endpointTipoDocumentoIdentiadad)
        return response.data
    }

    const getOne = async (id) =>
    {
        const response = await useHookApi.get(baseUrl, `${endpoint}/${id}`)
        return response.data
    }

    const post = async (data) =>
    {
        const response = await useHookApi.post(baseUrl, endpoint, data)
        return response
    }

    const registrarDatosAdicionales = async (data) =>
    {
        const response = await useHookApi.post(baseUrl, `${endpoint}/DatosAdicionales`, data)
        return response
    }

    const generarPago = async (data) =>
    {
        const response = await useHookApi.post(baseUrl, `${endpoint}/GenerarPago`, data)
        return response
    }


    const registrarCita = async (idProspecto,data) =>
    {
        const response = await useHookApi.post(baseUrl, `${endpoint}/${idProspecto}/Cita`, data)
        return response
    }
    const descartarProspecto = async (idProspecto,idDescarte) =>
    {
        const response = await useHookApi.remove(baseUrl, `${endpoint}/${idProspecto}/Descartar/${idDescarte}`)
        return response
    }
    return {
        getFilePorIdProspecto,
        getOne,
        post,
        getEstados,
        getEventos,
        getMetaDataprospecto,
        getOrigen,
        getTipoDocumentoIdentidad,
        getProspectoById,
        enviarAprobacionDocumento,
        rechazarDocumentoProspectos,
        devolverDocumentoProspectos,
        procesarRevisionDocumentoProspectos,
        registrarDatosAdicionales,
        asignarADV,
        getAgrupadoProformas,
        geAgrupadoProformasAprobada,
        getAsociadoByIdProspecto,
        generarPago,
        registrarCita,
        descartarProspecto
    };
};

export default UseProspectoApi;
import UseApi from './UseApi';

const UseFileApi = () => {
    const useHookApi = UseApi();

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_PROD_NUEVO_SISTEMA_FONDOS;
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_FILE;

    const uploadDocumento = async (file, idProspecto, idTipoDocumento, nombreArchivo) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('idProspecto', idProspecto);
        formData.append('idTipoDocumento', idTipoDocumento);
        formData.append('nombreArchivo', nombreArchivo);

        return useHookApi.postFormData(baseUrl, endpoint, formData);
    };
    const actualizarDocumento = async (idDocumento, idTipoDocumento, nombreArchivo) => {
        const request = {
            id: idDocumento,
            idTipoDocumento: idTipoDocumento,
            nombreArchivo: nombreArchivo
        }

        return useHookApi.put(baseUrl, endpoint , request);
    };
    const eliminarDocumento = async (idFile,idProspecto) => {
        return useHookApi.remove(baseUrl, `${endpoint}/${idFile}/Prospecto/${idProspecto}`);
    };
    const aprobarDocumento = async (idFile,idProspecto, comentario = "") => {
        const request = {
            comentario: comentario
        }
        return useHookApi.put(baseUrl, `${endpoint}/${idFile}/Prospecto/${idProspecto}/Aprobar`, request);
    };
    const observarDocumento = async (idFile,idProspecto, comentario) => {
        const request = {
            comentario: comentario
        }
        return useHookApi.put(baseUrl, `${endpoint}/${idFile}/Prospecto/${idProspecto}/Observar`, request);
    };

    const agregarAnotacion = async (idFile,idProspecto, nota) => {
        const request = {
            nota: nota
        }
        return useHookApi.put(baseUrl, `${endpoint}/${idFile}/Prospecto/${idProspecto}/Nota`, request);
    };
    return {
        uploadDocumento,
        eliminarDocumento,
        actualizarDocumento,
        aprobarDocumento,
        observarDocumento,
        agregarAnotacion
    };
};

export default UseFileApi; 
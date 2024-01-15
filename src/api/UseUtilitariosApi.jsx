import UseApi from './UseApi';

const UseUtilitariosApi = () => {
    const useHookApi = UseApi();
    const obtenerDocumento = async (file) => {
        const parsedUrl = new URL(file.urlFile);
        const baseUrl = parsedUrl.origin;
        const path = parsedUrl.pathname;
        const blob = await useHookApi.get(baseUrl, path, true);
        return {
            ...file,
            blob
        }
    };
    const obtenerDocumentoWithURL = async (url) => {
        const blob = await useHookApi.getWithUrl(url, true);
        return {
            url:url,
            blob
        }
    };
    
    return {
        obtenerDocumento,
        obtenerDocumentoWithURL
    };    
};

export default UseUtilitariosApi;

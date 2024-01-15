import UseApi from './UseApi';

const UseProformaApi = () => {
    const useHookApi = UseApi();

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_PROD_NUEVO_SISTEMA_FONDOS;
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_PROFORMA;

    const get = async () => {
        const response = await useHookApi.get(baseUrl,endpoint)
        return response.data
    }
    
    const getCuotaInscripcionFactor = async (data) => {
        const response = await useHookApi.getWithParameters(baseUrl,`${endpoint}/CuotaInscripcionFactor`,data,false)
        return response.data
    }
    
    const getOne = async (id) => {
        const response = await useHookApi.get(baseUrl,`${endpoint}/${id}`)
        return response.data
    }
    
    const post = async (data) => {
        const response = await useHookApi.post(baseUrl,endpoint,data)
        return response
    }
    
    const generarCodigoPago = async (data) => {
        const response = await useHookApi.post(baseUrl,`${endpoint}/GenerarCodigoPago`,data)
        return response
    }  
    
    const aprobar = async (data) => {
        const response = await useHookApi.post(baseUrl,`${endpoint}/Aprobar`,data)
        return response
    }
    
    const getProducto = async (id) => {
        const response = await useHookApi.get(baseUrl,`${endpoint}/Producto/${id}`)
        return response.data
    }
    
    const getGrupo = async (id) => {
        const response = await useHookApi.get(baseUrl,`${endpoint}/Grupo/${id}`)
        return response.data
    }
    
    const getMontoCertificado = async (id) => {
        const response = await useHookApi.get(baseUrl,`${endpoint}/MontoCertificado/${id}`)
        return response.data
    }
    
    const calcularDatos = async (data) => {
        const response = await useHookApi.post(baseUrl,`${endpoint}/Calcular`,data)
        return response
    }
    const obtenerProformasAgrupadasPorProformaID = async (id) => {
        const response = await useHookApi.get(baseUrl,`${endpoint}/Agrupado/${id}`)
        return response?.data
    }
        
 
    return {  get, 
        getCuotaInscripcionFactor,
        getOne ,
        post ,
        aprobar , 
        getProducto , 
        getGrupo , 
        getMontoCertificado, 
        calcularDatos,
        generarCodigoPago,
        obtenerProformasAgrupadasPorProformaID };
};

export default UseProformaApi;
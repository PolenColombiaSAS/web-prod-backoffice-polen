import UseApi from './UseApi';

const UseGraphQLApi = () =>
{
    const useHookApi = UseApi();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_PROD_NUEVO_SISTEMA_FONDOS;
    const endpoint = "/graphql";

    function camposToString(campos)
    {
        let result = [];

        campos.forEach(campo =>
        {
            if (typeof campo === 'object' && campo !== null)
            {
                // Es un objeto, por lo que tiene campos anidados
                const nombreRelacion = Object.keys(campo)[0];
                const subCampos = camposToString(campo[nombreRelacion]);
                result.push(`${nombreRelacion}{${subCampos}}`);
            } else
            {
                // Es un campo simple
                result.push(campo);
            }
        });

        return result.join(",");
    }




    const crearQueryPageDinamica = (modelo, camposModelo, searchTerm = "", pageSize = 10, pageIndex = 0, filterFields = []) =>
    {
        const camposModeloStr = camposToString(camposModelo);

        let formattedStrings = filterFields.map((obj) =>
        {
            let { campo, operator, value } = obj;
            return `{campo:"${campo}",operator:"${operator}",value:"${value}"}`;
        });
        let finalString = '[' + formattedStrings.join(',') + ']';


        return `
        ${modelo}(
            filterList:${finalString},
            searchTerm: "${searchTerm}", 
            pageIndex: ${pageIndex}, 
            pageSize: ${pageSize},        
            )
            { 
                totalCount,
                totalPages, 
                currentPage, 
                pageSize, 
                data 
                {
                    ${camposModeloStr}
                }             
            } 
        `;
    };
    const consumirGraphQL = async (modelo, camposModelo, relaciones, searchTerm = "", pageSize = 10, pageIndex = 0, filterFields = null) =>
    {
        const query = `
            query Operations {
               ${crearQueryPageDinamica(modelo, camposModelo, relaciones, searchTerm, pageSize, pageIndex, filterFields)}
            }
        `
        const request = {
            query: query
        }
        const response = await useHookApi.post(baseUrl, endpoint, request)
        return response?.data?.data
    };

    return { consumirGraphQL };
};

export default UseGraphQLApi; 
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_PROD_POLEN_APP;

export const formConfigFile = (currentDate = new Date()) => {


    const fieldConfigFilterFormProspectoEvento = [
        {
            type: "Select",
            valueType: "string",
            name: "gerente",
            defaultValue: "",
            label: "Gerente",
            // rules: { required: "Seleccione un Departamento" },
            options: {
                valueProperty: "id",
                nameProperty: "text",
                optionsList: [
                ],
                api: `${baseUrl}/api/Vendedor/Gerente`
            },
            disabled: false,
            xs: 12, sm: 12, md: 12, lg: 6, xl: 3
        },
        {
            type: "Select",
            name: "gestor",
            defaultValue: "",
            label: "Gestor",
            // rules: { required: "Seleccione un Programa" },
            options: {
                valueProperty: "id",
                nameProperty: "text",
                optionsList: [
                ],
                apiWithCondition: {
                    responsesApi: [],
                    method: "GET",
                    endPoint: `${baseUrl}/api/Vendedor/Gerente/$idGerente/Gestores`,
                    pathParam: [
                        {
                            typeParameter: "PathParam",
                            nameFieldToGetValue: "gerente",
                            pathParam: "$idGerente"
                        }
                    ]
                }
            },
            conditional: [
                {
                    name: "gerente",
                    value: "any"
                },
            ],
            disabled: false,
            xs: 12, sm: 12, md: 12, lg: 6, xl: 3
        },
        {
            type: "Select",
            name: "director",
            defaultValue: "",
            label: "Director",
            // rules: { required: "Seleccione un Programa" },
            options: {
                valueProperty: "id",
                nameProperty: "text",
                optionsList: [
                ],
                apiWithCondition: {
                    responsesApi: [],
                    method: "GET",
                    endPoint: `${baseUrl}/api/Vendedor/Gestor/$idGestor/Supervisores`,
                    pathParam: [
                        {
                            typeParameter: "PathParam",
                            nameFieldToGetValue: "gestor",
                            pathParam: "$idGestor"
                        }
                    ]
                }
            },
            conditional: [
                {
                    name: "gerente",
                    value: "any"
                },
                {
                    name: "gestor",
                    value: "any"
                },
            ],
            disabled: false,
            xs: 12, sm: 12, md: 12, lg: 6, xl: 3
        },
        {
            type: "Select",
            name: "asesor",
            defaultValue: "",
            label: "Asesor",
            // rules: { required: "Seleccione un Programa" },
            options: {
                valueProperty: "id",
                nameProperty: "text",
                optionsList: [
                ],
                apiWithCondition: {
                    responsesApi: [],
                    method: "GET",
                    endPoint: `${baseUrl}/api/Vendedor/Supervisor/$idDirector/Vendedores`,
                    pathParam: [
                        {
                            typeParameter: "PathParam",
                            nameFieldToGetValue: "director",
                            pathParam: "$idDirector"
                        }
                    ]
                }
            },
            conditional: [
                {
                    name: "gerente",
                    value: "any"
                },
                {
                    name: "gestor",
                    value: "any"
                },
                {
                    name: "director",
                    value: "any"
                },

            ],
            disabled: false,
            xs: 12, sm: 12, md: 12, lg: 6, xl: 3
        },
        {
            type: "Break"
        },
        {
            type: "Select",
            valueType: "string",
            name: "estado",
            defaultValue: "",
            label: "Estado",
            // rules: { required: "Seleccione un Departamento" },
            options: {
                valueProperty: "id",
                nameProperty: "text",
                optionsList: [
                ],
                api: `${baseUrl}/api/Estado`
            },
            disabled: false,
            xs: 12, sm: 12, md: 12, lg: 6, xl: 4
        },
        {
            type: "Select",
            valueType: "string",
            name: "medio",
            defaultValue: "",
            label: "Medios",
            // rules: { required: "Seleccione un Departamento" },
            options: {
                valueProperty: "id",
                nameProperty: "text",
                optionsList: [
                ],
                api: `${baseUrl}/api/Medios`
            },
            disabled: false,
            xs: 12, sm: 12, md: 12, lg: 6, xl: 4
        },
        {
            type: "Select",
            valueType: "string",
            name: "prioridad",
            label: "Prioridad",
            defaultValue: "All",
            valueType: "string",
            // rules: { required: "Seleccione un tipo de documento" },
            options: {
                valueProperty: "id",
                nameProperty: "descripcion",
                optionsList: [
                    { id: "All", descripcion: "Todos" },
                    { id: "1", descripcion: "Con Prioridad" },
                    { id: "0", descripcion: "Sin Prioridad" },
                ]
            },
            disabled: false,
            xs: 12, sm: 12, md: 12, lg: 6, xl: 4
        },
        {
            type: "Break"
        },
        {
            type: "DatePicker",
            valueType: "date",
            name: "fechaInicio",
            label: "Fecha Inicio",
            defaultValue: -30,
            placeholder: "Fecha Inicio",
            rules: { required: "La Fecha de Inicio es requerido" },
            xs: 12, sm: 12, md: 12, lg: 6, xl: 6,
            // minDateValue:"2024-01-06",
            maxDateValue: "Today"
        },
        {
            type: "DatePicker",
            valueType: "date",
            name: "fechaFinal",
            label: "Fecha Final",
            defaultValue: "Today",
            placeholder: "Fecha Final",
            rules: {
                required: "La fecha final es requerido",
                minDate: { 
                    fieldName: "fechaInicio", 
                    message: "Fecha final debe ser después de la fecha de inicio del registro del prospecto" 
                },
            },
            conditional: [
                {
                    name: "fechaInicio",
                    value: "any"
                },
            ],
            maxDateValue: "Today",
            xs: 12, sm: 12, md: 12, lg: 6, xl: 6
        },

    ]

    return [
        {
            title: "Filter Form Prospecto Evento",
            fieldsFormConfig: fieldConfigFilterFormProspectoEvento
        },
    ]
}


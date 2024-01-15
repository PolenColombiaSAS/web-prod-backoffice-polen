import dayjs from 'dayjs';

const esNumero = (valor) => {
    return !isNaN(valor) && valor !== '';
};

const esDayjsValido = (valor) => {
    const fecha = dayjs(valor);
    return fecha.isValid();
};

const esBooleano = (value) => {
    if (typeof value === 'boolean') {
        return {
            isBool: true,
            value: value
        }
    }
    if (!(typeof value === 'string')) {
        return {
            isBool: false
        }
    }
    if (value.trim().toUpperCase() == "TRUE") {
        return {
            isBool: true,
            value: true
        }
    }
    if (value.trim().toUpperCase() == "FALSE") {
        return {
            isBool: true,
            value: false
        }
    }
    return {
        isBool: false,
        value: false
    }
};

const esArray = (valor, mostrarLog) => {
    try {
        if (Array.isArray(valor)) {
            return true
        }
        const valorArray = JSON.parse(valor);
        const isArray = Array.isArray(valorArray)
        if (mostrarLog) {
            console.log('====================================');
            console.log("true");
            console.log("isArray", isArray);
            console.log("valorArray", valorArray);
            console.log('====================================');
        }
        return isArray;
    } catch (e) {
        if (mostrarLog) {
            console.log('====================================');
            console.log("typeof", typeof valor);
            console.log("catch", e);
            console.log('====================================');
        }
        return false;
    }
};

const transformarDato = (key, value, setValue) => {
    const validatedBool = esBooleano(value)
    if (validatedBool.isBool) {
        setValue(key, validatedBool.value);
    } else if (esNumero(value)) {
        setValue(key, Number(value));
    } else if (esArray(value)) {
        JSON.parse(value).forEach((item, index) => {
            Object.entries(item).forEach(([keyArray, valueArray]) => {
                transformarDato(`${key}[${index}].${keyArray}`, valueArray, setValue);
            });
        });
    } else if (esDayjsValido(value)) {
        setValue(key, dayjs(value));
    } else {
        setValue(key, value);
    }
};

//#region 
const obtenerElValorDelValue = (value, tipoValorCampo) => {
    switch (tipoValorCampo) {
        case 'bool':
            return esBooleano(value).value;
        case 'number':
            return esNumero(value) ? Number(value) : value;
        case 'date':
            return esDayjsValido(value) ? dayjs(value) : value;
        case 'array':
            return esArray(value) ? JSON.parse(value) : value;
        default:
            return value;
    }
};
// const obtenerTipoValorCampo = (nombreCampo, formConfig = []) => {
//     for (const campo of formConfig) {
//         if (campo.name === nombreCampo) {
//             return campo.valueType;
//         }
//     }
//     return null;
// };
const setFieldsToFormData = (datos = {}, setValue, formConfig = []) => {
    Object.entries(datos).forEach(([key, value]) => {
        const campoConfig = formConfig.find(campo => campo.name === key);
        if (campoConfig?.type == 'Multiple') {
            if (esArray(value)) {
                const newValue = Array.isArray(value) ? value : JSON.parse(value)

                if (newValue.length === 0) {
                    setValue(`${key}[0]`, {});
                } else {
                    newValue.forEach((item, index) => {
                        setFieldsToFormData(item, (subKey, subValue) => {
                            const subValueConvert = (subValue == null || subValue == undefined) ? "" : subValue
                            setValue(`${key}[${index}].${subKey}`, subValueConvert);
                        }, campoConfig.fieldconfig);
                    });
                }
            }
            // Object.entries(item).forEach(([keyArray, valueArray]) => {
            //     transformarDato(`${key}[${index}].${keyArray}`, valueArray, setValue);
            // });
        } else {
            // Obtener el tipo de valor del campo y transformar el valor
            const tipoValorCampo = campoConfig ? campoConfig.valueType : null;
            const valorConvertido = obtenerElValorDelValue(value, tipoValorCampo);
            const valueConvertNull = (valorConvertido == null || valorConvertido == undefined) ? "" : valorConvertido
            setValue(key, valueConvertNull);
        }
    });
    // Object.entries(datos).forEach(([key, value]) => {
    //     const tipoValorCampo = obtenerTipoValorCampo(key, formConfig);
    //     const valorConvertirdo = obtenerElValorDelValue(value, tipoValorCampo)
    //     setValue(key, valorConvertirdo);
    // });
};
export const setFormDataFromObject = (datos = {}, setValue, formConfigWithSection = []) => {
    const fieldsFormConfig = []
    for (const seccion of formConfigWithSection) {
        fieldsFormConfig.push(...seccion.fieldsFormConfig)
    }
    setFieldsToFormData(datos, setValue, fieldsFormConfig)

};
export const setFormDataFromFormWithStepObject = (datos = {}, setValue, formSteps = []) => {
    const fieldsFormConfig = [];
    formSteps.forEach(step => {
        step.formConfig.forEach(seccion => {
            fieldsFormConfig.push(...seccion.fieldsFormConfig);
        });
    });

    setFieldsToFormData(datos, setValue, fieldsFormConfig);
};
//#endregion


export const obtenerApisDeSelect = (configuracionFormulario) => {
    let urlsApis = new Set();

    configuracionFormulario.forEach(seccion => {
        seccion.fieldsFormConfig.forEach(campo => {
            if (campo.options?.api) {
                urlsApis.add(campo.options.api);
            }
            if (campo.type === "Multiple" && campo.fieldconfig) {
                campo.fieldconfig.forEach(subCampo => {
                    if (subCampo.options?.api) {
                        urlsApis.add(subCampo.options.api);
                    }
                });
            }
        });
    });
    return Array.from(urlsApis);
};

export const asignarOpcionesAFormConfig = (formConfig = [], respuestas, urls) => {
    const formConfigModificado = [...formConfig];

    formConfigModificado.forEach(seccion => {
        seccion.fieldsFormConfig.forEach(campo => {
            if (campo.options?.api) {
                const indiceUrl = urls.indexOf(campo.options.api);
                if (indiceUrl !== -1) {
                    campo.options.optionsList = respuestas[indiceUrl];
                }
            }
            if (campo.type === "Multiple" && campo.fieldconfig) {
                campo.fieldconfig.forEach(subCampo => {
                    if (subCampo.options?.api) {
                        const indiceUrl = urls.indexOf(subCampo.options.api);
                        if (indiceUrl !== -1) {
                            subCampo.options.optionsList = respuestas[indiceUrl];
                        }
                    }
                });
            }
        });
    });

    return formConfigModificado;
};

export const obtenerApisDeSelectFromFormSteps = (formSteps) => {
    let urlsApis = new Set();
    formSteps.forEach(step => {
        step.formConfig.forEach(seccion => {
            seccion.fieldsFormConfig.forEach(campo => {
                if (campo.options?.api) {
                    urlsApis.add(campo.options.api);
                }
                if (campo.type === "Multiple" && campo.fieldconfig) {
                    campo.fieldconfig.forEach(subCampo => {
                        if (subCampo.options?.api) {
                            urlsApis.add(subCampo.options.api);
                        }
                    });
                }
            });
        });
    });

    return Array.from(urlsApis);
};

export const asignarOpcionesASteps = (formSteps, respuestas, urls) => {
    const formStepsModificados = JSON.parse(JSON.stringify(formSteps));
    formStepsModificados.forEach(step => {
        step.formConfig.forEach(seccion => {
            seccion.fieldsFormConfig.forEach(campo => {
                if (campo.options?.api) {
                    const indiceUrl = urls.indexOf(campo.options.api);
                    if (indiceUrl !== -1) {
                        campo.options.optionsList = respuestas[indiceUrl];
                    }
                }
                if (campo.type === "Multiple" && campo.fieldconfig) {
                    campo.fieldconfig.forEach(subCampo => {
                        if (subCampo.options?.api) {
                            const indiceUrl = urls.indexOf(subCampo.options.api);
                            if (indiceUrl !== -1) {
                                subCampo.options.optionsList = respuestas[indiceUrl];
                            }
                        }
                    });
                }
            });
        });
    });

    return formStepsModificados;
};

const ValidarFormato = (fechaStr) => {
    const formato = "YYYY-MM-DD";
    const fecha = dayjs(fechaStr, formato);
    return fecha.isValid() && fecha.format(formato) === fechaStr;
};

export const obtenerFechaDayJS = (value) => {
    if (!value) {
        return null;
    }
    if (value instanceof Date) {
        return dayjs(value);
    }
    if (value instanceof dayjs) {
        return value;
    }
    if (value == "Today") {
        return dayjs()
    }
    if (typeof value === 'number') {
        return dayjs().add(value, 'day');
    }

    const parseDate = (typeof value === 'string')
        ? (ValidarFormato(value) ? dayjs(value) : dayjs())
        : dayjs();
    return parseDate
}
export const emptyValues = (objct) => {
    // tslint:disable-next-line:forin
    for (const member in objct) {
        if (objct[member] === null || objct[member] === '' || objct[member] === undefined || objct[member] === 'null') {
            delete objct[member];
        }
    }
    return objct;
};
export const objectToQueryParams = (obj) => {
    return Object.keys(obj)
        .map(key => {
            if (obj[key] === undefined) return '';
            return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
        })
        .filter(part => part.length > 0)
        .join('&');
}
export const reemplazarTexto = (textoOriginal, valorOriginal, valorReemplazo) => {
    const textoReemplazado = textoOriginal.replace(valorOriginal, valorReemplazo);

    return textoReemplazado;
}

import { Grid, debounce } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CustomControllerTextField from 'shared/ui-components/controles/CustomControllerTextField';
import CustomControllerSelect from '../select/CustomControllerSelect';
import CustomControllerDate from '../CustomControllerDate';
import CustomControllerRadioGroup from '../CustomControllerRadioGroup';
import CustomControllerSwitch from '../CustomControllerSwitch';
import CustomDynamicFormMultipleBuilder from './CustomDynamicFormMultipleBuilder';
import { useLoadingContext } from 'context/loading';
import { reemplazarTexto } from './formularioUtils';
import UseApi from 'api/UseApi';
import CustomControllerTextArea from '../CustomControllerTextArea';
import CustomControllerDateTime from '../CustomControllerDateTime';
import CustomControllerInputNumber from '../CustomControllerInputNumber';

const checkConditions = (fieldConfig, watch) => {
    if (!fieldConfig.conditional || fieldConfig.conditional.length === 0) {
        return true;
    }
    return fieldConfig.conditional.every(cond => {
        const currentValue = watch(cond.name);
        if (cond.value === "any") {
            if (currentValue) {
                return true
            }
        }
        if (Array.isArray(cond.value)) {
            return cond.value.map(x => x.toString().toUpperCase()).includes(currentValue?.toString().toUpperCase());
        }
        return false;
    });
};


const CustomDynamicFormBuilder = ({
    control,
    errors,
    watch,
    setValue,
    resetField,
    fieldsConfig = [],
    isView,
    formData
}) => {

    const { loading, showLoading, hideLoading } = useLoadingContext();
    const [internalFieldsConfigs, setinternalFieldsConfigs] = useState([])

    const useHookApi = UseApi();
    const initialized = useRef(false);
    useEffect(() => {
        if (fieldsConfig?.length > 0
            // &&internalFieldsConfigs.length==0
        ) {

            initialized.current = false;
            setinternalFieldsConfigs([...fieldsConfig])
        }
    }, [fieldsConfig])

    useEffect(() => {
        if (internalFieldsConfigs?.length > 0 && !initialized.current) {
            initialized.current = true;
            ejecutarMetodoPrimeraVez()
        }
    }, [internalFieldsConfigs, initialized.current])

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            /**
            value: 
                -> Representa los valores actuales de todos los campos del formulario en el momento del cambio. 
                NOTA: Te devuelve un objeto cuyas claves son los nombres de los campos del formulario
                    cuyos valores son los valores actuales de esos campos.
                    Object.entries(value).forEach(([key, value]) => {
                        
                            });
            name: 
                -> Este es el nombre del campo del formulario que ha desencadenado el cambio. 
            type: 
                -> Este indica el tipo de evento que ha desencadenado el cambio. 
                   'change': lo que significa que el cambio ha sido causado por una acción de cambio en uno de los campos del formulario 
                            (como escribir en un campo de texto, seleccionar una opción en un menú desplegable, etc.). 
             */
            if (type === 'change') {
                internalFieldsConfigs.forEach(fieldConfig => {
                    if (fieldConfig.conditional) {
                        fieldConfig.conditional.forEach(condition => {
                            if (name === condition.name) {
                                setValue(fieldConfig.name, fieldConfig.defaultValue);
                            }
                        });
                        // if (!checkConditions(fieldConfig, watch)) {
                        //     resetField(fieldConfig.name);
                        // }
                    }
                    if (fieldConfig.setvaluecondition) {
                        fieldConfig.setvaluecondition.forEach(conditionArray => {
                            conditionArray.forEach(condition => {
                                if (name === condition.condition.name) {
                                    if (value[name] === condition.condition.value) {
                                        setValue(fieldConfig.name, condition.value);
                                    }
                                }
                            });
                        });
                    }
                    if (fieldConfig.options?.conditionSearchOptionList) {
                        if (name === fieldConfig.options?.conditionSearchOptionList.formFieldNameCompare) {
                            setValue(fieldConfig.name, fieldConfig.defaultValue);
                        }
                    }
                    if (fieldConfig.options?.filterOptionsListCondition) {
                        fieldConfig.options?.filterOptionsListCondition.forEach(filterCondition => {
                            if (name === filterCondition.fieldName) {
                                setValue(fieldConfig.name, fieldConfig.defaultValue);
                            }
                        });
                    }

                    internalFieldsConfigs.forEach(fieldConfig => {
                        if (fieldConfig.options?.apiWithCondition) {
                            const { method, endPoint, pathParam } = fieldConfig.options?.apiWithCondition;

                            const namesFieldToGetValue = pathParam.map(x => x.nameFieldToGetValue)
                            if (namesFieldToGetValue.includes(name)) {
                                const parametros = []
                                if (pathParam?.length > 0) {
                                    pathParam.forEach(x => {
                                        const value = watch(x.nameFieldToGetValue);
                                        parametros.push({
                                            ...x,
                                            value: value
                                        })
                                    })
                                }
                                const callApi = parametros.every(cond => cond.value);

                                if (callApi) {
                                    let urlApi = endPoint
                                    parametros.forEach(parametro => {
                                        if (parametro.typeParameter == "PathParam") {
                                            urlApi = reemplazarTexto(urlApi, parametro.pathParam, parametro.value)
                                        }
                                    });
                                    // console.log("obtenerInformacion", name);
                                    // console.log("value", value);

                                    obtenerInformacion(method, urlApi, fieldConfig.name)
                                }
                            }
                        }
                    });
                });
            }
        });

        return () => subscription.unsubscribe();
    }, [internalFieldsConfigs]);

    const ejecutarMetodoPrimeraVez = () => {
        internalFieldsConfigs.forEach(fieldConfig => {
            if (fieldConfig.options?.apiWithCondition) {
                const { method, endPoint, pathParam } = fieldConfig.options?.apiWithCondition;
                const parametros = []
                if (pathParam?.length > 0) {
                    pathParam.forEach(x => {
                        const value = watch(x.nameFieldToGetValue);
                        parametros.push({
                            ...x,
                            value: value
                        })
                    })
                }
                const callApi = parametros.every(cond => cond.value);
                if (callApi) {
                    let urlApi = endPoint
                    parametros.forEach(parametro => {
                        if (parametro.typeParameter == "PathParam") {
                            urlApi = reemplazarTexto(urlApi, parametro.pathParam, parametro.value)
                        }
                    });
                    obtenerInformacion(method, urlApi, fieldConfig.name)
                }
            }
        });
    }
    const obtenerInformacion = debounce(
        async (method, urlApi, name) => {
            try {
                showLoading();
                let respuesta = []
                switch (method) {
                    case "GET":
                        const responseApi = await useHookApi.getWithUrl(urlApi);
                        respuesta = responseApi.data
                        break;

                    default:
                        break;
                }
                setinternalFieldsConfigs(prevConfigs => {
                    return prevConfigs.map(config => {
                        if (config.name === name) {
                            return {
                                ...config,
                                options: {
                                    ...config.options,
                                    optionsList: [...respuesta]
                                }
                            };
                        }
                        return config;
                    });
                });
            } catch (error) {
                console.error("Error: ", error);
            } finally {
                hideLoading();
            }
        }
        , 400);

    const obtenerOpcionesFiltradas = (fieldConfig) => {
        const { filterOptionsListCondition, optionsList, conditionSearchOptionList } = fieldConfig.options || {};
        let listaBuscada = [...optionsList]
        if (conditionSearchOptionList) {
            const valorFormFieldNameCompare = watch(conditionSearchOptionList.formFieldNameCompare);
            const filterList = listaBuscada.filter(x => x[conditionSearchOptionList.comparisonProperty]?.toString() === valorFormFieldNameCompare?.toString())
            if (filterList.length > 0) {
                listaBuscada = filterList[0][conditionSearchOptionList.nestedOptionsProperty]
            }
        }

        if (!filterOptionsListCondition) {
            return listaBuscada;
        }

        const listaFiltrada = listaBuscada.filter(option => {
            return filterOptionsListCondition.every(condition => {
                const valorActual = watch(condition.fieldName);
                return !valorActual || option[condition.filterCampo]?.toString() === valorActual?.toString();
            })
        });
        return listaFiltrada;
    };
    const renderField = (fieldConfig) => {
        if (!checkConditions(fieldConfig, watch)) {
            return null;
        }
        let element = null
        switch (fieldConfig.type) {
            case 'Break':

                return <Grid item
                    xs={12}>
                </Grid>
                break
            case 'Switch':
                element = <CustomControllerSwitch
                    name={fieldConfig.name}
                    label={fieldConfig.label}
                    defaultValue={fieldConfig.defaultValue || false}
                    labelplacement={fieldConfig.labelplacement}

                    disabled={isView || fieldConfig.disabled}

                    control={control}

                    rules={fieldConfig.rules}
                    errors={errors?.[fieldConfig.name]}
                    errorMessage={errors?.[fieldConfig.name]?.message}
                />;
                break;

            case 'TextArea':
                element = <CustomControllerTextArea
                    name={fieldConfig.name}
                    label={fieldConfig.label}
                    defaultValue={fieldConfig.defaultValue}
                    placeholder={fieldConfig.placeholder}
                    disabled={isView || fieldConfig.disabled}

                    control={control}

                    rules={fieldConfig.rules}
                    errors={errors?.[fieldConfig.name]}
                    errorMessage={errors?.[fieldConfig.name]?.message}
                    rows={fieldConfig.rows}
                />;
                break;
            case 'TextField':
                element = <CustomControllerTextField
                    name={fieldConfig.name}
                    label={fieldConfig.label}
                    defaultValue={fieldConfig.defaultValue}
                    placeholder={fieldConfig.placeholder}
                    disabled={isView || fieldConfig.disabled}

                    control={control}

                    rules={fieldConfig.rules}
                    errors={errors?.[fieldConfig.name]}
                    errorMessage={errors?.[fieldConfig.name]?.message}
                />;
                break;
            case 'TextField-TypeNumber':
                element = <CustomControllerInputNumber
                    name={fieldConfig.name}
                    label={fieldConfig.label}
                    defaultValue={fieldConfig.defaultValue}
                    placeholder={fieldConfig.placeholder}
                    disabled={isView || fieldConfig.disabled}

                    control={control}

                    rules={fieldConfig.rules}
                    errors={errors?.[fieldConfig.name]}
                    errorMessage={errors?.[fieldConfig.name]?.message}
                />;
                break;
            case 'Select':
                const optionsToDraw = obtenerOpcionesFiltradas(fieldConfig, watch)
                element = <CustomControllerSelect
                    name={fieldConfig.name}
                    label={fieldConfig.label}
                    // setValue={setValue}

                    defaultValue={fieldConfig.defaultValue}

                    valueProperty={fieldConfig.options?.valueProperty}
                    nameProperty={fieldConfig.options?.nameProperty}
                    options={optionsToDraw}
                    formatLabel={fieldConfig.options.formatLabel}
                    disabled={isView || fieldConfig.disabled}

                    control={control}

                    rules={fieldConfig.rules}
                    errors={errors?.[fieldConfig.name]}
                    errorMessage={errors?.[fieldConfig.name]?.message}
                />;
                break;
            case 'DatePicker':
                let minDateValue = null;
                if (fieldConfig.rules && fieldConfig.rules.minDate) {
                    minDateValue = watch(`${fieldConfig.rules.minDate.fieldName}`);
                }
                element = <CustomControllerDate
                    name={fieldConfig.name}
                    label={fieldConfig.label}

                    defaultValue={fieldConfig.defaultValue}
                    minDate={minDateValue || fieldConfig.minDateValue}
                    maxDate={fieldConfig.maxDateValue}

                    disabled={isView || fieldConfig.disabled}

                    control={control}

                    rules={fieldConfig.rules}
                    error={errors?.[fieldConfig.name]}
                    errorMessage={errors?.[fieldConfig.name]?.message}
                    zIndexDatePicker={fieldConfig.zIndexDatePicker}
                />;
                break;
            case 'DateTimePicker':
                let minDateTimeValue = null;
                if (fieldConfig.rules && fieldConfig.rules.minDate) {
                    minDateTimeValue = watch(`${fieldConfig.rules.minDate.fieldName}`);
                }
                element = <CustomControllerDateTime
                    name={fieldConfig.name}
                    label={fieldConfig.label}

                    defaultValue={fieldConfig.defaultValue}
                    minDate={minDateTimeValue || fieldConfig.minDateValue}

                    disabled={isView || fieldConfig.disabled}
                    control={control}

                    rules={fieldConfig.rules}
                    error={errors?.[fieldConfig.name]}
                    errorMessage={errors?.[fieldConfig.name]?.message}
                    zIndexDatePicker={fieldConfig.zIndexDatePicker}
                />;
                break;

            case 'RadioGroup':
                element = <CustomControllerRadioGroup
                    name={fieldConfig.name}
                    label={fieldConfig.label}

                    defaultValue={fieldConfig.defaultValue}

                    optionValueProperty={fieldConfig.options?.valueProperty}
                    optionLabelProperty={fieldConfig.options?.nameProperty}
                    options={fieldConfig.options?.optionsList}

                    disabled={isView || fieldConfig.disabled}

                    control={control}
                    rules={fieldConfig.rules}
                    error={errors?.[fieldConfig.name]}
                    errorMessage={errors?.[fieldConfig.name]?.message}
                />;
                break;
            case 'Multiple':
                if (fieldConfig.name) {
                    element = <CustomDynamicFormMultipleBuilder
                        control={control}
                        errors={errors}
                        watch={watch}
                        setValue={setValue}
                        resetField={resetField}
                        isView={isView}

                        fieldGroupName={fieldConfig.name}
                        fieldsConfig={fieldConfig.fieldconfig}
                        enabledEsPrincipal={fieldConfig.enabledEsPrincipal}

                        formData={formData}

                    />;

                }
                break;
        }

        return (
            <Grid item
                xs={fieldConfig.xs}
                sm={fieldConfig.sm}
                md={fieldConfig.md}
                lg={fieldConfig.lg}
                xl={fieldConfig.xl}>
                {element}
            </Grid>
        )
    };
    return (
        <Grid container spacing={1}>
            {
                internalFieldsConfigs.map((fieldConfig, index) => (
                    <React.Fragment key={index} >
                        {renderField(fieldConfig)}
                    </React.Fragment>
                ))
            }
        </Grid>
    );
};

export default CustomDynamicFormBuilder;

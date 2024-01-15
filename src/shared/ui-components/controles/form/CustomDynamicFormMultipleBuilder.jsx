
import { Box, Button, Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import CustomControllerTextField from 'shared/ui-components/controles/CustomControllerTextField';
import CustomControllerSelect from '../select/CustomControllerSelect';
import CustomControllerDate from '../CustomControllerDate';
import CustomControllerRadioGroup from '../CustomControllerRadioGroup';
import CustomControllerSwitch from '../CustomControllerSwitch';
import { obtenerFechaDayJS, reemplazarTexto } from './formularioUtils';
import { useLoadingContext } from 'context/loading';
import UseApi from 'api/UseApi';
import CustomControllerTextArea from '../CustomControllerTextArea';
import CustomControllerDateTime from '../CustomControllerDateTime';
import CustomControllerInputNumber from '../CustomControllerInputNumber';


const obtenerOpcionesFiltradas = (fieldConfig, fieldGroupName, index, watch) => {

    const { filterOptionsListCondition, optionsList, conditionSearchOptionList, apiWithCondition } = fieldConfig.options || {};
    if (apiWithCondition) {
        const { responsesApi } = apiWithCondition || {};
        if (responsesApi?.length > 0) {
            const existe = responsesApi?.find(x => x.indexGroup == index && x.name == fieldConfig.name)
            if (existe) {
                return existe.respuesta
            }
        }

    }

    let listaBuscada = [...optionsList]
    if (conditionSearchOptionList) {
        const valorFormFieldNameCompare = watch(`${fieldGroupName}[${index}].${conditionSearchOptionList.formFieldNameCompare}`);
        const filterList = listaBuscada.filter(x => x[conditionSearchOptionList.comparisonProperty]?.toString() === valorFormFieldNameCompare?.toString())
        if (filterList.length > 0) {
            listaBuscada = filterList[0][conditionSearchOptionList.nestedOptionsProperty]
        }
    }
    if (!filterOptionsListCondition) {
        return listaBuscada;
    }
    const listaOriginal = [...listaBuscada];
    const opcionesFiltradas = listaOriginal.filter(option =>
        filterOptionsListCondition.every(condition => {
            const valorActual = watch(`${fieldGroupName}[${index}].${condition.fieldName}`);
            return !valorActual || option[condition.filterCampo]?.toString() === valorActual?.toString();
        })
    );
    return opcionesFiltradas;
};

const checkConditions = (fieldConfig, fieldGroupName, index, watch) => {
    if (!fieldConfig.conditional || fieldConfig.conditional.length === 0) {
        return true;
    }
    return fieldConfig.conditional.every(cond => {
        const currentValue = watch(`${fieldGroupName}[${index}].${cond.name}`);
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

const CustomDynamicFormMultipleBuilder = ({ control, errors, watch, setValue, resetField,
    fieldGroupName = "", fieldsConfig = [], enabledEsPrincipal, isView, formData }) => {

    const [internalFieldsConfigs, setinternalFieldsConfigs] = useState([])
    const { loading, showLoading, hideLoading } = useLoadingContext();
    const useHookApi = UseApi();

    useEffect(() => {
        if (fieldsConfig?.length > 0) {
            setinternalFieldsConfigs(fieldsConfig)

        }
    }, [fieldsConfig])


    const { fields, append, remove } = useFieldArray({
        control,
        name: fieldGroupName
    });
    const initialized = useRef(false);
    useEffect(() => {
        if (fields?.length == 0 && !initialized.current) {
            initialized.current = true;
            onAdd()
        }
    }, [fields])
    useEffect(() => {
        resetFieldArray()
    }, [formData])

    // Función para resetear los campos del FieldArray
    const resetFieldArray = () => {
        const fieldGroup = formData?.[fieldGroupName];
        if (Array.isArray(fieldGroup)) {
            const newLength = fieldGroup.length;
            for (let i = fields.length - 1; i >= newLength; i--) {
                remove(i);
            }
        }
    };



    const onAdd = () => {
        const newRow = {};
        internalFieldsConfigs.forEach(fieldConfig => {
            let value = undefined;
            switch (fieldConfig.type) {
                case 'DatePicker':
                    value = obtenerFechaDayJS(fieldConfig.defaultValue)

                    break;
                default:
                    value = fieldConfig.defaultValue
                    break;
            }
            newRow[fieldConfig.name] = value
        })
        append(newRow);
    };

    const onDelete = (index) => {
        if (fields.length > 1) {
            remove(index);
        }
    };

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (type === 'change') {
                /**
                 * Logica Para el campo es prinicipal_ 
                 *      1) Cuando cambia a prinicipal los demas dejan de ser principales
                 *      2) si quieres desabilitarlo el uno que es principal evalua que por lo menos haya uno que sea principal
                 */
                if (name.startsWith(fieldGroupName)) {

                    const indexMatch = name.match(/\[(\d+)\]/);
                    const indexGroup = indexMatch ? indexMatch[1] : null;

                    const parts = name.split('.');
                    const fieldAttribute = parts[1]
                    const currentValueFieldChange = value[fieldGroupName][indexGroup][fieldAttribute]
                    if (enabledEsPrincipal) {
                        if (fieldAttribute == "esPrincipal") {
                            if (currentValueFieldChange === true) {
                                value[fieldGroupName].forEach((field, index) => {
                                    if (index != indexGroup) {
                                        setValue(`${fieldGroupName}[${index}].esPrincipal`, false);
                                    }
                                });
                            } else {
                                const canSetFalse = value[fieldGroupName].some(x => {
                                    return x.esPrincipal == true
                                });
                                if (!canSetFalse) {
                                    setValue(`${fieldGroupName}[${indexGroup}].esPrincipal`, true);
                                }
                            }
                        }
                    }
                    internalFieldsConfigs.forEach(fieldConfig => {
                        if (fieldConfig.conditional) {
                            const namesField = fieldConfig.conditional.map(x => x.name)
                            if (namesField.includes(fieldAttribute)) {
                                fieldConfig.conditional.forEach(condition => {
                                    if (fieldAttribute === condition.name) {
                                        setValue(`${fieldGroupName}[${indexGroup}].${fieldConfig.name}`, fieldConfig.defaultValue);
                                    }
                                });
                                // if (!checkConditions(fieldConfig, watch)) {
                                //     resetField(fieldConfig.name);
                                // }

                            }
                        }
                        if (fieldConfig.conditional) {

                            if (!checkConditions(fieldConfig, fieldGroupName, indexGroup, watch)) {
                                resetField(`${fieldGroupName}[${indexGroup}].${fieldConfig.name}`);
                            }
                        }
                        if (fieldConfig.setvaluecondition) {
                            fieldConfig.setvaluecondition.forEach(conditionArray => {
                                conditionArray.forEach(condition => {
                                    if (fieldAttribute === condition.condition.name) {
                                        if (currentValueFieldChange === condition.condition.value) {
                                            setValue(`${fieldGroupName}[${indexGroup}].${fieldConfig.name}`, condition.value);
                                        }
                                    }
                                });
                            });
                        }
                        if (fieldConfig.options?.conditionSearchOptionList) {
                            if (fieldAttribute === fieldConfig.options?.conditionSearchOptionList.formFieldNameCompare) {
                                setValue(`${fieldGroupName}[${indexGroup}].${fieldConfig.name}`, fieldConfig.defaultValue);
                            }
                        }
                        if (fieldConfig.options?.filterOptionsListCondition) {
                            fieldConfig.options?.filterOptionsListCondition.forEach(filterCondition => {
                                if (fieldAttribute === filterCondition.fieldName) {
                                    setValue(`${fieldGroupName}[${indexGroup}].${fieldConfig.name}`, fieldConfig.defaultValue);
                                }
                            });
                        }
                        if (fieldConfig.options?.apiWithCondition) {
                            const { method, endPoint, pathParam } = fieldConfig.options?.apiWithCondition;
                            const namesFieldToGetValue = pathParam.map(x => x.nameFieldToGetValue)
                            if (namesFieldToGetValue.includes(fieldAttribute)) {
                                const parametros = []
                                if (pathParam?.length > 0) {
                                    pathParam.forEach(x => {
                                        const value = watch(`${fieldGroupName}[${indexGroup}].${x.nameFieldToGetValue}`);
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
                                    ObtenerInformacion(method, urlApi, indexGroup, fieldConfig.name)
                                }
                            }
                        }
                    });

                }



            }
        });
        // Logica Si es el unico que queda se debe de activar es principal
        if (enabledEsPrincipal) {
            if (fields.length == 1) {
                setValue(`${fieldGroupName}[${0}].esPrincipal`, true);
            }
        }

        return () => subscription.unsubscribe();

    }, [fields, watch, internalFieldsConfigs]);

    const ObtenerInformacion = async (method, urlApi, indexGroup, name) => {
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
            const newInternalFieldsConfig = internalFieldsConfigs.map(fieldConfig => {
                if (fieldConfig.name.toString() == name.toString()) {
                    if (!fieldConfig.options.apiWithCondition.responsesApi) {
                        fieldConfig.options.apiWithCondition.responsesApi = []
                    }
                    const indexExiste = fieldConfig.options.apiWithCondition.responsesApi.findIndex(x => x.indexGroup == indexGroup && x.name == name)
                    if (indexExiste !== -1) {
                        fieldConfig.options.apiWithCondition.responsesApi[indexExiste] = {
                            indexGroup,
                            name,
                            respuesta
                        };
                    } else {
                        fieldConfig.options.apiWithCondition.responsesApi.push({
                            indexGroup,
                            name,
                            respuesta
                        });
                    }
                    return fieldConfig
                } else {
                    return fieldConfig
                }
            })
            setinternalFieldsConfigs(newInternalFieldsConfig)
        } catch (error) {
            console.error("Error: ", error);
        } finally {
            hideLoading();
        }
    }

    const renderField = (field, fieldConfig, name, index) => {
        if (!checkConditions(fieldConfig, fieldGroupName, index, watch)) {
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
                element = (<CustomControllerSwitch
                    name={`${name}[${index}].${fieldConfig.name}`}
                    label={fieldConfig.label}
                    defaultValue={field[fieldConfig.name] || fieldConfig.defaultValue || false}
                    labelPlacement={fieldConfig.labelplacement}

                    disabled={isView || fieldConfig.disabled}
                    control={control}

                    rules={fieldConfig.rules}
                    errors={errors?.[name]?.[index]?.[fieldConfig.name]}
                    errorMessage={errors?.[name]?.[index]?.[fieldConfig.name]?.message}
                />);
                break;
            case 'TextArea':
                element = (<CustomControllerTextArea
                    name={`${name}[${index}].${fieldConfig.name}`}
                    label={fieldConfig.label}
                    defaultValue={field[fieldConfig.name] || ""}
                    placeholder={fieldConfig.placeholder}

                    disabled={isView || fieldConfig.disabled}

                    control={control}

                    rules={fieldConfig.rules}
                    errors={errors?.[name]?.[index]?.[fieldConfig.name]}
                    errorMessage={errors?.[name]?.[index]?.[fieldConfig.name]?.message}
                    rows={fieldConfig.rows}
                />);
                break;
            case 'TextField':
                element = (<CustomControllerTextField
                    name={`${name}[${index}].${fieldConfig.name}`}
                    label={fieldConfig.label}
                    defaultValue={field[fieldConfig.name] || ""}
                    placeholder={fieldConfig.placeholder}

                    disabled={isView || fieldConfig.disabled}

                    control={control}

                    rules={fieldConfig.rules}
                    errors={errors?.[name]?.[index]?.[fieldConfig.name]}
                    errorMessage={errors?.[name]?.[index]?.[fieldConfig.name]?.message}
                />);
                break;
            case 'TextField-TypeNumber':
                element = (<CustomControllerInputNumber
                    name={`${name}[${index}].${fieldConfig.name}`}
                    label={fieldConfig.label}
                    defaultValue={field[fieldConfig.name] || ""}
                    placeholder={fieldConfig.placeholder}

                    disabled={isView || fieldConfig.disabled}

                    control={control}

                    min={fieldConfig.min}
                    max={fieldConfig.max}
                    rules={fieldConfig.rules}
                    errors={errors?.[name]?.[index]?.[fieldConfig.name]}
                    errorMessage={errors?.[name]?.[index]?.[fieldConfig.name]?.message}
                />);
                break;
            case 'Select':
                const optionsToDraw = obtenerOpcionesFiltradas(fieldConfig, fieldGroupName, index, watch)
                element = <CustomControllerSelect
                    name={`${name}[${index}].${fieldConfig.name}`}
                    label={fieldConfig.label}
                    // setValue={setValue}

                    defaultValue={fieldConfig.defaultValue}

                    valueProperty={fieldConfig.options?.valueProperty}
                    nameProperty={fieldConfig.options?.nameProperty}
                    options={optionsToDraw}

                    disabled={isView || fieldConfig.disabled}

                    control={control}

                    rules={fieldConfig.rules}
                    errors={errors?.[name]?.[index]?.[fieldConfig.name]}
                    errorMessage={errors?.[name]?.[index]?.[fieldConfig.name]?.message}
                />;
                break;
            case 'DatePicker':
                let minDateValue = null;
                if (fieldConfig.rules && fieldConfig.rules.minDate) {
                    minDateValue = watch(`${name}[${index}].${fieldConfig.rules.minDate.fieldName}`);
                }
                element = (<CustomControllerDate
                    name={`${name}[${index}].${fieldConfig.name}`}
                    label={fieldConfig.label}

                    defaultValue={field[fieldConfig.name] || null}
                    minDate={minDateValue}

                    disabled={isView || fieldConfig.disabled}

                    control={control}

                    rules={fieldConfig.rules}
                    errors={errors?.[name]?.[index]?.[fieldConfig.name]}
                    errorMessage={errors?.[name]?.[index]?.[fieldConfig.name]?.message}
                    zIndexDatePicker={fieldConfig.zIndexDatePicker}
                />);
                break;
            case 'DateTimePicker':
                let minDateTimeValue = null;
                if (fieldConfig.rules && fieldConfig.rules.minDate) {
                    minDateTimeValue = watch(`${name}[${index}].${fieldConfig.rules.minDate.fieldName}`);
                }
                element = (<CustomControllerDateTime
                    name={`${name}[${index}].${fieldConfig.name}`}
                    label={fieldConfig.label}

                    defaultValue={field[fieldConfig.name] || null}
                    minDate={minDateTimeValue}

                    disabled={isView || fieldConfig.disabled}

                    control={control}

                    rules={fieldConfig.rules}
                    errors={errors?.[name]?.[index]?.[fieldConfig.name]}
                    errorMessage={errors?.[name]?.[index]?.[fieldConfig.name]?.message}
                    zIndexDatePicker={fieldConfig.zIndexDatePicker}
                />);
                break;

            case 'RadioGroup':
                element = (<CustomControllerRadioGroup
                    name={`${name}[${index}].${fieldConfig.name}`}
                    label={fieldConfig.label}

                    defaultValue={fieldConfig.defaultValue}

                    optionValueProperty={fieldConfig.options?.valueProperty}
                    optionLabelProperty={fieldConfig.options?.nameProperty}
                    options={fieldConfig.options?.optionsList}

                    disabled={isView || fieldConfig.disabled}

                    control={control}

                    rules={fieldConfig.rules}
                    errors={errors?.[name]?.[index]?.[fieldConfig.name]}
                    errorMessage={errors?.[name]?.[index]?.[fieldConfig.name]?.message}
                />)
                break;
        }
        return (
            <Grid item
                xs={fieldConfig.xs}
                sm={fieldConfig.sm}
                md={fieldConfig.md}
                lg={fieldConfig.lg}
                xl={fieldConfig.xl}
            >
                {element}
            </Grid>
        )
    };

    return (

        <>
            <Grid container rowSpacing={1}>
                <Grid item xs={12}>
                    <Grid container rowSpacing={1}  >
                        {fields.map((field, index) => (
                            <Grid key={field.id} item xs={12}>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        border: "2px dashed rgba(0, 0, 0, 0.5)"
                                    }}
                                >
                                    <Grid container spacing={1}>
                                        {
                                            enabledEsPrincipal && (
                                                <Grid item >
                                                    <Grid item xs={1}>
                                                        <CustomControllerSwitch
                                                            name={`${fieldGroupName}[${index}].esPrincipal`}
                                                            control={control}
                                                            defaultValue={false}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            )
                                        }
                                        <Grid item xs>
                                            <Grid
                                                container
                                                columnSpacing={1}>
                                                <Grid item xs>
                                                    <Grid container spacing={1}>
                                                        {
                                                            internalFieldsConfigs.map((fieldConfig) => {
                                                                return (
                                                                    <React.Fragment key={field.id + fieldConfig.name}>
                                                                        {renderField(field, fieldConfig, fieldGroupName, index)}
                                                                    </React.Fragment>
                                                                )
                                                            })
                                                        }
                                                    </Grid>
                                                </Grid>

                                                {fields.length > 1 && (
                                                    <Grid item xs={12} sm={12} md={2} lg={2}>
                                                        <Button
                                                            fullWidth
                                                            onClick={() => onDelete(index)}
                                                            color="secondary"
                                                            variant="outlined"
                                                            sx={{ fontSize: "24px" }}
                                                        >
                                                            X
                                                        </Button>
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={onAdd}
                        fullWidth
                        color='primary'
                        variant="outlined"
                        sx={{ fontSize: "24px" }}
                    >
                        +
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default CustomDynamicFormMultipleBuilder;

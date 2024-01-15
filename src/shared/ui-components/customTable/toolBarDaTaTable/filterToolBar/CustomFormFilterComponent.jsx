import { Grid } from '@mui/material';
import CustomControllerSelect from 'shared/ui-components/controles/select/CustomControllerSelect';
import CustomControllerTextField from 'shared/ui-components/controles/CustomControllerTextField';
import { useEffect, useState } from 'react';
import CustomControllerDate from 'shared/ui-components/controles/CustomControllerDate';
import { OperatorsType, buscarOperatorsTypePorValor } from './typeOperator';
import CustomControllerInputNumber from 'shared/ui-components/controles/CustomControllerInputNumber';

const CustomFormFilterComponent = ({
    index,
    columns = [],
    control,
    setValue,
    errors,
    watch
}) => {
    const selectedColumnField = watch(`filters[${index}].campo`);
    const selectedOperatorField = watch(`filters[${index}].operator`);


    const [optionsOperator, setOptionsOperator] = useState([])
    const [optionSelected, setoptionSelected] = useState(null)
    const [internalColumns, setInternalColumns] = useState([])
    const [columnType, setColumnType] = useState(null)

    useEffect(() => {
        const optionSelected = buscarOperatorsTypePorValor(selectedOperatorField)
        setoptionSelected(optionSelected)
    }, [selectedOperatorField])


    useEffect(() => {
        const typeValid = ["string", "number", "date", "bool"];
        const newInternalColumns = columns.filter(col =>
            typeValid.includes(col?.type?.toLowerCase()?.trim())
        );
        setInternalColumns(newInternalColumns)
    }, [columns]);

    useEffect(() => {
        if (selectedColumnField) {
            setOptionsOperatior();
            setValue(`filters[${index}].operator`, "");  // Reiniciar el valor del operador
        }
    }, [internalColumns, selectedColumnField]);

    const setOptionsOperatior = () => {
        const selectedColumn = internalColumns.find(col => col.field === selectedColumnField);
        if (selectedColumn && selectedColumn?.type) {
            const optionsOperator = OperatorsType[selectedColumn?.type.toLowerCase()?.trim()];

            if (optionsOperator) {
                setOptionsOperator(optionsOperator)
            } else {
                setOptionsOperator([])
            }
            setColumnType(selectedColumn?.type)
        } else {
            setColumnType(null)
        }
    }
    const renderFieldByColumnType = (columnType) => {
        switch (columnType) {
            case "string":
                return (
                    <CustomControllerTextField
                        name={`filters[${index}].value`}
                        control={control}
                        defaultValue={""}
                        rules={{ required: true }}
                        label={"Valor"}
                        placeholder={"Ingrese un valor"}
                        errors={errors?.filters?.[index]?.value}
                        errorMessage="Ingrese un valor"
                    />
                );
            case "date":
                return (
                    <CustomControllerDate
                        name={`filters[${index}].value`}
                        control={control}
                        defaultValue={null}
                        rules={{ required: true }}
                        label={"Valor"}
                        placeholder={"Ingrese un valor"}
                        errors={errors?.filters?.[index]?.value}
                        errorMessage="Ingrese un valor"
                    />
                );
            case "number":
                return (
                    <CustomControllerInputNumber
                        name={`filters[${index}].value`}
                        control={control}
                        rules={{ required: true }}
                        label={"Valor"}
                        placeholder={"Ingrese un valor"}
                        errors={errors?.filters?.[index]?.value}
                        errorMessage="Ingrese un valor"
                    />
                );
            default:
                return null;
        }
    }

    return (
        <Grid
            container
            spacing={2}
            width={"100%"}
            direction="column"
        >
            <Grid item >
                <CustomControllerSelect
                    name={`filters[${index}].campo`}
                    control={control}
                    defaultValue={""}
                    rules={{ required: true }}
                    label={"Campo"}
                    valueProperty={"field"}
                    nameProperty={"headerName"}
                    setValue={setValue}
                    errors={errors?.filters?.[index]?.campo}
                    options={internalColumns}
                    disabled={false}
                    errorMessage="Seleccione una columna"
                />
            </Grid>
            <Grid item >
                {selectedColumnField &&
                    <CustomControllerSelect
                        name={`filters[${index}].operator`}
                        control={control}
                        defaultValue={""}
                        rules={{ required: true }}
                        label={"Criterio"}
                        valueProperty={"value"}
                        nameProperty={"name"}
                        setValue={setValue}
                        errors={errors?.filters?.[index]?.operator}
                        options={optionsOperator}
                        disabled={optionsOperator?.length == 0}
                        errorMessage="Seleccione un operador"
                    />
                }

            </Grid>
            <Grid item > 
                {(selectedOperatorField && columnType && optionSelected?.isValueNeed) &&
                    renderFieldByColumnType(columnType)
                }
            </Grid>
        </Grid>
    );
};

export default CustomFormFilterComponent;

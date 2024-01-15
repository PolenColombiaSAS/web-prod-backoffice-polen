import { TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

export const CustomControllerInputNumber = ({
    name,
    label = "",
    defaultValue = 0,
    placeholder = "",
    disabled,
    control,
    rules = {},
    isDecimal = true,
    min,
    errors,
    errorMessage,
    max,
    tipoMoneda = "NuevoSol"
}) => {
    const [id, setId] = useState(uuidv4());
    const [previousValue, setPreviousValue] = useState("");
    const [isNegative, SetIsNegative] = useState(false)
    const [intenralErrorMessage, setIntenralErrorMessage] = useState("")
    const [internalErrors, setInternalErrors] = useState(false)
    const [errorMessageVisible, setErrorMessageVisible] = useState(false);


    const [displayValue, setDisplayValue] = useState(null);
    const [internalTipoMoneda, setInternalTipoMoneda] = useState("S/.")

    const formatNumber = useMemo(() => (value, includeDecimals = true) => {
        if (!value) return '';
        let [integerPart, decimalPart] = value.split('.');
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return includeDecimals && decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
    }, []);



    useEffect(() => {
        setInternalErrors(intenralErrorMessage.length > 0)
    }, [intenralErrorMessage])
    useEffect(() => {
        switch (tipoMoneda) {
            case "NuevoSol":
                setInternalTipoMoneda("S/.")
                break;
            case "Dolar":
                setInternalTipoMoneda("$")
                break;
            case "Euro":
                setInternalTipoMoneda("€")
                break;
            default:
                setInternalTipoMoneda("S/.")
                break;
        }
    }, [])
    useEffect(() => {
        if (intenralErrorMessage.length > 0) {
            setErrorMessageVisible(true);
            const timer = setTimeout(() => {
                setIntenralErrorMessage("");
                setErrorMessageVisible(false);
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [intenralErrorMessage]);


    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={rules}
            render={({ field, ...props }) => {

                const handleInputChange = (event) => {
                    const input = event.target;
                    let currentValue = input.value.replace(/,/g, '');
                    console.log("currentValue",currentValue);
                    if (event.target.value == "") {
                        currentValue = "0"
                    }
                    const selectionStart = input.selectionStart;
                    if (/^0+/.test(currentValue)) {
                        currentValue = currentValue.replace(/^0+/, '0');
                    }
                    if (currentValue.length > 1 && !currentValue.startsWith('0.')) {
                        currentValue = currentValue.replace(/^0+/, '');
                    }
                    const isNumber = !Number.isNaN(Number(currentValue));
                    if (!isNumber) {
                        if (currentValue != "-" && currentValue != ".") {

                            requestAnimationFrame(() => {
                                input.setSelectionRange(selectionStart - 1, selectionStart - 1);
                            });
                            SetIsNegative(false)
                            setIntenralErrorMessage(`Debe ingresar un número ${isDecimal ? "decimal" : "entero"}`)
                            return;
                        }
                    }
                    let lenghtReduce = 0
                    if (currentValue.includes('.')) {
                        let parts = currentValue.split('.');
                        if (parts[1].length === 0) {
                            if (parts[0] == 0) {
                                currentValue = `0.00`;
                                lenghtReduce = 2
                            } else {
                                currentValue = `${parts[0]}.00`;
                                lenghtReduce = 2
                            }
                        } else if (parts[1].length === 1) {
                            currentValue = `${parts[0]}.${parts[1]}0`;
                            lenghtReduce = 1
                        } else {
                            currentValue = `${parts[0]}.${parts[1].substring(0, 2)}`;

                            if (event.target.value.length - selectionStart == 1 ||
                                event.target.value.length - selectionStart == 2) {
                                lenghtReduce = -1
                            }
                        }
                    }
                    const convertNumber = Number(currentValue)
                    if (min !== undefined && min !== null) {
                        if (convertNumber < min) {
                            requestAnimationFrame(() => {
                                input.setSelectionRange(selectionStart - 1, selectionStart - 1);
                            });
                            setIntenralErrorMessage(`El valor debe ser mayor a: ${min}`)
                            return
                        }
                    }
                    if (max !== undefined && max !== null) {
                        if (convertNumber > max) {
                            requestAnimationFrame(() => {
                                input.setSelectionRange(selectionStart - 1, selectionStart - 1);
                            });
                            setIntenralErrorMessage(`El valor debe ser menor a: ${max}`)
                            return
                        }
                    }
                    SetIsNegative(convertNumber < 0 ? true : false)
                    let newValue = "";
                    if (isDecimal) {
                        if (/^-?\d*\.?\d{0,2}$/.test(currentValue)) {

                            newValue = formatNumber(currentValue);
                        } else {
                            requestAnimationFrame(() => {
                                input.setSelectionRange(selectionStart - 1, selectionStart - 1);
                            });
                            setIntenralErrorMessage(`El valor debe ser un decimal con dos decimales`)
                            return;
                        }
                    } else {
                        if (/^-?\d+$/.test(currentValue) || currentValue === '') {
                            newValue = formatNumber(currentValue, false);
                        } else {
                            requestAnimationFrame(() => {
                                input.setSelectionRange(selectionStart - 1, selectionStart - 1);
                            });
                            setIntenralErrorMessage(`El valor debe ser un entero`)
                            return;
                        }
                    }
                    const oldValueLength = event.target.value.length;
                    const newValueLength = newValue.length;
                    const lengthChange = newValueLength - oldValueLength;
                    let newCursorPosition = selectionStart + lengthChange - lenghtReduce;

                    requestAnimationFrame(() => {
                        input.setSelectionRange(newCursorPosition, newCursorPosition);
                    });
                    setPreviousValue(newValue);
                    setDisplayValue(newValue)
                    field.onChange(convertNumber||0);
                };

                return (
                    <TextField
                        id={`numberField-id-${id}`}
                        {...field}
                        label={label}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        variant="outlined"
                        fullWidth
                        value={displayValue !== null ? displayValue : formatNumber(field.value.toString())}
                        type="text"
                        error={Boolean(errors) || Boolean(internalErrors)}
                        helperText={errors ? errorMessage : (errorMessageVisible ? intenralErrorMessage : "")}
                        disabled={disabled}
                        InputProps={{
                            startAdornment: (
                                <>
                                    {internalTipoMoneda}
                                </>
                            ),
                            style: { color: isNegative ? 'red' : 'inherit' },
                        }} 
                    />
                )
            }}
        />
    )
}


export default CustomControllerInputNumber;

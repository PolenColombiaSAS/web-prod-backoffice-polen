import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { TextField } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { obtenerFechaDayJS } from "./form/formularioUtils";

// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';

const obtenerMensajeError = (error) => {
    switch (error) {
        case 'maxDate':
        case 'minDate': {
            return 'Please select a date in the first quarter of 2022';
        }

        case 'invalidDate': {
            return 'Your date is not valid';
        }

        default: {
            return '';
        }
    }
}

const CustomControllerDateTime = ({
    name,
    control,
    defaultValue = null,
    rules = {},
    label = "",
    disabled = false,
    errorMessage,
    minDate,
    zIndexDatePicker = 1000
}) => {
    const [error, setError] = useState(null);
    const [internalErrorMessage, setInternalErrorMessage] = useState(null)

    useEffect(() => {
        setInternalErrorMessage(obtenerMensajeError(error))
    }, [error])
    const defaultDate = obtenerFechaDayJS(defaultValue)

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultDate}
            rules={rules}
            render={({ field, fieldState: { error: fieldError } }) => {
                return (
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            disabled={disabled}
                            PopperProps={{
                                style: { zIndex: zIndexDatePicker }
                            }}
                            label={label}
                            value={field.value}
                            onChange={date => field.onChange(date)}
                            onError={(newError) => setError(newError)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    error={!!fieldError}
                                    helperText={fieldError ? errorMessage : internalErrorMessage}
                                />
                            )}
                            minDate={minDate}
                        // maxDate={endOfQ12022}
                        />
                    </LocalizationProvider>
                )
            }}
        />
    );
}

export default CustomControllerDateTime;
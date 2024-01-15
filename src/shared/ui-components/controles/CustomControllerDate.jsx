import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { esES } from '@mui/x-date-pickers/locales';
import { obtenerFechaDayJS } from "./form/formularioUtils";
import { useMediaQuery } from "@mui/material";

const obtenerMensajeError = (error) =>
{
    switch (error)
    {
        case 'maxDate': {
            return 'The selected date is after the maximum allowed date';
        }
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

const CustomControllerDate = ({
    name,
    control,
    defaultValue = null,
    rules = {},
    label = "",
    disabled = false,
    errorMessage,
    minDate,
    maxDate,
    zIndexDatePicker = 1000,
    openTo = "day"
}) =>
{
    const [error, setError] = useState(null);
    const [internalErrorMessage, setInternalErrorMessage] = useState(null)


    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('md'));

    useEffect(() =>
    {
        setInternalErrorMessage(obtenerMensajeError(error))
    }, [error])
    const defaultDate = obtenerFechaDayJS(defaultValue)
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultDate}
            rules={rules}
            render={({ field, fieldState: { error: fieldError } }) =>
            {
                return (
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
                    >
                        {isSmallScreen ? (
                            <MobileDatePicker
                                label={label}

                                value={field.value}
                                onChange={date => field.onChange(date)}

                                disabled={disabled}
                                onError={(newError) => setError(newError)}
                                format="DD/MM/YYYY"

                                slotProps={{
                                    textField: {
                                        // helperText: 'DD/MM/YYYY',
                                        // error:true,
                                        error: !!fieldError,
                                        helperText: fieldError ? errorMessage : internalErrorMessage,
                                        fullWidth: true
                                    },
                                }}
                                
                                PopperProps={{
                                    style: { zIndex: zIndexDatePicker }
                                }}

                                views={['year', 'month', 'day']}
                                openTo={openTo}

                                minDate={obtenerFechaDayJS(minDate)}
                                maxDate={obtenerFechaDayJS(maxDate)}
                            />
                        ) : (
                            <DatePicker
                                label={label}

                                value={field.value}
                                onChange={date => field.onChange(date)}

                                disabled={disabled}
                                onError={(newError) => setError(newError)}
                                format="DD/MM/YYYY"


                                slotProps={{
                                    textField: {
                                        // helperText: 'DD/MM/YYYY',
                                        // error:true,
                                        error: !!fieldError,
                                        helperText: fieldError ? errorMessage : internalErrorMessage,
                                        fullWidth: true
                                    },
                                }}
                                PopperProps={{
                                    style: { zIndex: zIndexDatePicker }
                                }}

                                views={['year', 'month', 'day']}
                                openTo={openTo}

                                minDate={obtenerFechaDayJS(minDate)}
                                maxDate={obtenerFechaDayJS(maxDate)}
                            />
                        )}
                    </LocalizationProvider>
                )
            }}
        />
    );
}

export default CustomControllerDate;
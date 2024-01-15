import React from 'react';
import { Controller } from 'react-hook-form';
import { Box, FormControl, FormControlLabel, FormHelperText, Switch } from '@mui/material';

const CustomControllerSwitch = ({
    name,
    label,
    control,
    defaultValue = false,
    rules = {},
    errorMessage = "",
    labelplacement = "start"//["end","bottom","start","top"]
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={rules}
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                <FormControl
                    component="fieldset"
                    error={Boolean(error)}>
                    {label ? (
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={value === true}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    ref={ref}
                                />
                            }
                            label={label}
                            labelPlacement={labelplacement}
                        />
                    ) : (
                        <Switch
                            checked={value === true}
                            onChange={onChange}
                            onBlur={onBlur}
                            ref={ref}
                        />
                    )}
                    {error && <FormHelperText>{errorMessage || error.message}</FormHelperText>}
                </FormControl>
            )}
        />

    );
}

export default CustomControllerSwitch;

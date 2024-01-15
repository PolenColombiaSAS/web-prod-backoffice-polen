import React from 'react';
import { Controller } from "react-hook-form";
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, useMediaQuery, useTheme } from "@mui/material";

const CustomControllerRadioGroup = ({
    name,
    control,
    rules = {},
    label,
    options = [],
    optionValueProperty = "value",
    optionLabelProperty = "label",
    defaultValue = "",
    errorMessage = ""
}) => {
    const theme = useTheme();
    const isDownMdScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <FormControl
                    component="fieldset"
                    error={Boolean(error)}
                >
                    <FormLabel component="legend">{label}</FormLabel>
                    <RadioGroup
                        row={!isDownMdScreen}
                        {...field}>
                        {options.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                value={option[optionValueProperty]}
                                control={<Radio />}
                                label={option[optionLabelProperty]}
                            />
                        ))}
                    </RadioGroup>
                    {error && <FormHelperText>{errorMessage}</FormHelperText>}
                </FormControl>
            )}
        />
    );
}

export default CustomControllerRadioGroup;

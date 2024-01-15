import { TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form"
import { v4 as uuidv4 } from 'uuid';
import CustomIconButton from "../button/CustomIconButton";

export const CustomControllerTextField = ({
    name,
    control,
    defaultValue = "",
    rules = {},
    disabled,
    label = "",
    placeholder = "",
    errors,
    errorMessage = "",
    iconName
}) => {
    const [id, setId] = useState(uuidv4())


    return (
        <Controller
            name={name} 
            control={control}
            defaultValue={defaultValue}
            rules={rules}
            render={({ field }) => {
                return (
                    <TextField
                        id={`textField-id-${id}`}
                        {...field}
                        label={label}
                        placeholder={placeholder}
                        variant="outlined"
                        fullWidth
                        error={Boolean(errors)}
                        helperText={errors ? errorMessage : ""}
                        disabled={disabled}
                        InputProps={{
                            startAdornment: (
                                <>
                                    {iconName&&<CustomIconButton iconName={iconName}/>}
                                </>
                            ),
                        }} 
                    />
                )
            }}
        />
    )
}

export default CustomControllerTextField
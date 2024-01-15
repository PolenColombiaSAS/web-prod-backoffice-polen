import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export const CustomControllerTextArea = ({

  name,
  control,
  defaultValue = "",
  rules = {},
  disabled,
  label = "",
  placeholder = "",
  errors,
  errorMessage = "",
  rows = 4,
}) => {
  const [id, setId] = useState(uuidv4());
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => {
        return (
          <TextField
            id={`textArea-id-${id}`}
            {...field}
            label={label}
            placeholder={placeholder}
            variant="outlined"
            fullWidth
            
            multiline 
            rows={rows} 

            error={Boolean(errors)}
            helperText={errors ? errorMessage : ""}          
            disabled={disabled}
          />
        );
      }}
    />
  );
};

export default CustomControllerTextArea;

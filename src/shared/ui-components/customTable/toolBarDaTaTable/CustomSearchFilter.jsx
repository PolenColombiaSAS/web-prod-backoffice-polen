import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import { useState, useEffect } from 'react';

const CustomSearchFilter = ({ onSearchChange, sx = {} }) => {
    const [valorBuscado, setvalorBuscado] = useState("");
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    const handleQuickFilterChange = (e) => {
        const newValue = e.target.value;
        setvalorBuscado(newValue);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            if (typeof onSearchChange === "function") {
                onSearchChange(newValue);
            }
        }, 1000);

        setTimeoutId(newTimeoutId);
    };

    return (
        <TextField
            sx={sx}
            value={valorBuscado}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            variant="standard"
            size="small"
            placeholder='Search...'
            onChange={handleQuickFilterChange}
        />
    );
};

export default CustomSearchFilter;

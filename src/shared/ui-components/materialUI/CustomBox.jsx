
import { Box } from '@mui/material';
import { forwardRef } from 'react';

const CustomBox = forwardRef(({ children, sx,...props }, ref) => {
    // Aquí puedes añadir lógica adicional o estilos predeterminados
    return (
        <Box
            ref={ref}
            sx={{
                p: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
                ...sx
            }}
            {...props}

        >
            {children}
        </Box>
    );
});

CustomBox.displayName = 'CustomBox';

export default CustomBox;
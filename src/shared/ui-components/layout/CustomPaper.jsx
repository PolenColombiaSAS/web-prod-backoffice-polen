
import { Paper } from '@mui/material';
import { forwardRef } from 'react';

const CustomPaper = forwardRef(({ children, sx,elevation=5, ...props }, ref) => {
    // Aquí puedes añadir lógica adicional o estilos predeterminados
    return (
        <Paper
            elevation={elevation}
            ref={ref}
            sx={{
                p: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },

                ...sx
            }}
            {...props}

        >
            {children}
        </Paper>
    );
});

CustomPaper.displayName = 'CustomPaper';

export default CustomPaper;
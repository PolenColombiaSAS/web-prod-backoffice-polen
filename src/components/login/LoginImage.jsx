import { Box, Paper } from "@mui/material";


const LoginImage = () => (
    
     <Box sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <img 
            src="/FotoFondo.jpg" 
            height={'100%'} 
            alt="Imagen" 
            style={{ maxWidth: '100%', maxHeight: '100%' }} />
    </Box>
);

export default LoginImage;
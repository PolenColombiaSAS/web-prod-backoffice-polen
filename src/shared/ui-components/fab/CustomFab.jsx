import { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import styles from './fabAnimation.module.css';
import { Box } from '@mui/material';

function CustomFab({ descripcion, onClick, icon }) {
    const [vibrate, setVibrate] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setVibrate(true);
            setTimeout(() => {
                setVibrate(false);
            }, 1000);  // Vibra durante 200ms
        }, 5000);  // Vibra cada 5 segundos

        return () => {
            clearInterval(interval);
        };
    }, []);
    const handleOnClick = () => {
        if (onClick) {
            onClick()
        }
    }
    return (

        <Box sx={{
            position: 'fixed',
            bottom: { xs: 16, sm: 24, md: 32, lg: 40, xl: 48 },
            right: { xs: 16, sm: 24, md: 32, lg: 40, xl: 48 },
            zIndex: 6000,
            height: 'auto',
            width: 'auto',

        }}>
            <Fab
                sx={{
                }}
                variant="extended"
                color="primary"
                className={vibrate ? styles.vibrate : ''}
                onClick={handleOnClick}
            >
                {icon}
                {descripcion}
            </Fab>
        </Box>

    );
}

export default CustomFab;

import { Box, Grid, Paper, Typography, Avatar } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import ErrorSnackbar from '../../shared/ui-components/ErrorSnackbar';
import LoginForm from './LoginForm';

const avatarStyle = { backgroundColor: '#1bbd7e' }

const LoginFormContent = ({ handleOnSubmit, loading, showError }) => {

    return (

        <Box sx={{
            height: "100%", width: "100%",
            p: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }
        }}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                sx={{ height: "100%", width: "100%" }}
            >
                <Grid item align='center' >
                    <img
                        src="/LogoSplashScreen.svg"
                        alt="Imagen"
                        style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </Grid>
                <Grid item align='center'>
                    <LockIcon style={{ color: 'red' }} />
                    <Typography variant='h4'>Iniciar sesión</Typography>
                </Grid>
                <Grid item  >
                    <LoginForm
                        handleOnSubmit={handleOnSubmit}
                        loading={loading}
                    />
                    <ErrorSnackbar
                        open={showError}
                        severity={"error"}
                        message="Credenciales incorrectas!" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginFormContent 
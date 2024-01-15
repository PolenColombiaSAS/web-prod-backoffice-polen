import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import LoginFormContent from './LoginFormContent.jsx';
import { useLoadingContext } from '../../context/loading/useLoadingContext.js';
import { useAuthContext } from '../../context/auth/useAuthContext.js';
import StretchToEndOfPage from 'shared/ui-components/layout/StretchToEndOfPage.jsx';
import UseAuthApi from 'api/UseAuthApi.jsx';
import LoginImage from './LoginImage.jsx';

const LoginContainer = () => {
    const {login} = UseAuthApi();
    const router = useRouter();
    const { loading, showLoading, hideLoading } = useLoadingContext();
    const { updateAccessToken } = useAuthContext();
    const [showError, setShowError] = useState(false);

    const theme = useTheme();

    const isXsScreen = useMediaQuery(theme.breakpoints.only('xs'));

    const onLoginUser = async (data) => {

        try {
            if (loading) { return }
            setShowError(false)
            showLoading()
            const token = await login(data.email, data.password);
            if (!token) {
                throw new Error("Error al obtener el token de acceso");
            }
            updateAccessToken(token);

            // router.replace('/admin/prospecto');
        } catch (error) {
            setShowError(true);
            console.error(error);
            setTimeout(() => setShowError(false), 4000);
        } finally {
            hideLoading();
        }

    };

    return (
        <StretchToEndOfPage>
            {isXsScreen
                ? (
                    <>
                        <LoginFormContent
                            handleOnSubmit={onLoginUser}
                            loading={loading}
                            showError={showError}
                        />
                    </>
                )
                : (
                    <>
                        <Paper elevation={2} sx={{
                            height: '80%',
                            width:"75%",
                            top:"10%",
                            left:{  sm: "6%", md: "9%", lg: "12%", xl: "15%" },
                            position: 'absolute',
                            
                            // transform: 'translate(-50%, -50%)'
                        }}>
                            <LoginImage />
                        </Paper>
                        <Paper
                            elevation={10}
                            sx={{
                                height: '65%',
                                width: '450px',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'absolute',
                                top: '50%',
                                right: {  sm: "6%", md: "9%", lg: "12%", xl: "15%" } ,
                                transform: 'translateY(-50%)',
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            }}>

                            <LoginFormContent
                                handleOnSubmit={onLoginUser}
                                loading={loading}
                                showError={showError}
                            />
                        </Paper>
                    </>
                )
            }

        </StretchToEndOfPage >
    )

}

export default LoginContainer
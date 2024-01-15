import { useReducer, useEffect, useState } from 'react';
import { AuthContext, AuthReducer } from './';
import { useRouter } from 'next/router';
import { useLoadingContext } from '../loading';
import LoadingAnimation from './componenteDeInicio/LoadingAnimation';
import UseAuthApi from 'api/UseAuthApi';
import jwt from 'jsonwebtoken';
// import UsePerfilApi from 'api/UsePerfilApi';

export const AuthProvider = ({ children }) => {

    const useAuthApi = UseAuthApi();
    // const usePerfilApi = UsePerfilApi();
    const router = useRouter();
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        if (accessToken) {
            // console.log("accessToken", accessToken);
            const decoded = jwt.decode(accessToken);
            console.log(decoded);
            setUser(decoded);
            router.replace('/admin/reportes');
        }
    }, [accessToken]);

    const { loading, showLoading, hideLoading } = useLoadingContext();
    const [stateAuth, dispatchAuth] = useReducer(AuthReducer, {
        isLoggedIn: false,
        user: undefined,
        isCheckingAuth: true
    });

    useEffect(() => {
        if (!router.isReady) return;
        checkAuthentication();
    }, [router.isReady]);

    const checkAuthentication = async () => {
        try {
            showLoading();
            const accessToken = sessionStorage.getItem('accessToken');
            if (accessToken) {
                const tokenResult = await useAuthApi.validateToken(accessToken);
                if (!tokenResult?.isValid) throw new Error("Token no Valido");
                setUserFromSession()
                if (router.pathname.startsWith("/auth/")) {
                    router.replace('/admin/reportes');
                }
                setAccessToken(accessToken)
            } else if (router.pathname.startsWith("/admin/")) {
                await logOut();
            }
            if (router.pathname == "/") {
                router.push('/auth/login');
            }
        } catch (error) {
            await logOut();
        } finally {
            hideLoading();
            setTimeout(function () {
                dispatchAuth({ type: 'SET_CHECKING_AUTH', payload: false });
            }, 1800);

        }
    }

    // const cargarDatosDelPerfil = async () =>
    // {
    //     try
    //     {
    //         const [perfil] = await Promise.all([
    //             usePerfilApi.get()
    //         ]);
    //         if (!perfil)
    //         {
    //             throw new Error("Error al obtener los datos del usuario");
    //         }

    //         setUser(perfil);
    //     } catch (error)
    //     {
    //         console.error(error);
    //     } finally
    //     {
    //     }
    // };

    const setUserFromSession = () => {
        const userSession = sessionStorage.getItem('user');
        dispatchAuth({ type: '[Auth] - Login', payload: JSON.parse(userSession) });
    }
    const updateAccessToken = (newAccessToken) => {
        sessionStorage.setItem('accessToken', newAccessToken);
        setAccessToken(newAccessToken); // Actualiza el estado
    };
    const setUser = (user) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        dispatchAuth({ type: '[Auth] - Login', payload: user });
    }
    const logOut = async () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('user');
        dispatchAuth({ type: '[Auth] - Logout', payload: null });
        router.replace('/auth/login');
        setAccessToken(null)
    }


    return (
        <AuthContext.Provider value={{
            ...stateAuth,
            setUser,
            logOut,
            updateAccessToken,
        }}>
            {stateAuth.isCheckingAuth ? <LoadingAnimation /> : children}
        </AuthContext.Provider>
    )
};



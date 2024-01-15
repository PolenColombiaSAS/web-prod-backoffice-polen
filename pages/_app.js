import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/shared/theme';
import createEmotionCache from '../src/shared/createEmotionCache';
import { LoadingProvider, useLoadingContext } from '../src/context/loading';
// Import the styles provided by the react-pdf-viewer packages
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { SnackBarProvider } from '../src/context/snackBar';
import { DialogProvider } from '../src/context/dialog';
import { DialogFullScreenProvider } from '../src/context/dialogFullScream';
import { useRouter } from 'next/router';
import AdminLayout from 'shared/layout/adminLayout/AdminLayout';
import { AuthProvider } from 'context/auth';
import { AdminLayoutProvider } from 'context/adminLayout';
import { DrawerProvider } from 'context/drawer';
import DrawerContextElement from 'shared/contextComponent/DrawerContextElement';
import LoadingContextElement from 'shared/contextComponent/LoadingContextElement';
import DialogContextElement from 'shared/contextComponent/DialogContextElement';
import FullScreenDialogContextElement from 'shared/contextComponent/FullScreenDialogContextElement';
import SnackbarContextElement from 'shared/contextComponent/SnackbarContextElement';
import '../public/css/main.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const clientSideEmotionCache = createEmotionCache();

const MainComponent = ({ Component, pageProps }) => {

  const router = useRouter();
  const { showLoading, hideLoading } = useLoadingContext();
  React.useEffect(() => {
    // Mostrar el loading cuando comienza la navegación
    const handleRouteChangeStart = () => {
      showLoading()
    }

    // Ocultar el loading cuando finaliza la navegación
    const handleRouteChangeComplete = () => {
      hideLoading();
    }

    // Ocultar el loading si ocurre un error
    const handleRouteChangeError = () => {
      hideLoading();
    }

    // Agregar los event listeners al router
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    // Limpiar (quitar) los event listeners cuando el componente se desmonte
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    }

  }, [router]);
  return <Component {...pageProps} />
}

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const router = useRouter();

  const isLayoutNeeded = router.pathname.startsWith("/admin/");

  const LayoutComponent = isLayoutNeeded ? AdminLayout : React.Fragment;


  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <LoadingProvider>
        <AuthProvider>
          <AdminLayoutProvider>
            <DialogFullScreenProvider>
              <DialogProvider>
                <DrawerProvider>
                  <SnackBarProvider>
                    <ThemeProvider theme={theme}>
                      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                      <CssBaseline />
                      <DrawerContextElement />
                      <LoadingContextElement />
                      <DialogContextElement />
                      <FullScreenDialogContextElement />
                      <SnackbarContextElement />
                      <LayoutComponent >

                        <MainComponent Component={Component} pageProps={pageProps} />
                      </LayoutComponent>
                    </ThemeProvider>
                  </SnackBarProvider>
                </DrawerProvider>
              </DialogProvider>
            </DialogFullScreenProvider>
          </AdminLayoutProvider>
        </AuthProvider>
      </LoadingProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

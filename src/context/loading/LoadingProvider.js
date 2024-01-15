import { useReducer } from 'react';
import { LoadingContext,LoadingReducer } from '.';

export function LoadingProvider({ children }) {
    const [state, dispatch] = useReducer(LoadingReducer, {
        loading: false,
        contador: 0,
    });
    function showLoading() {
        dispatch({ type: '[Loading] - Show' });
    }

    function hideLoading() {
        dispatch({ type: '[Loading] - Hide' });
    }

    return (

        <LoadingContext.Provider value={{
            loading: state.loading,
            showLoading,
            hideLoading
        }}>
            {children}
        </LoadingContext.Provider>
    );
}
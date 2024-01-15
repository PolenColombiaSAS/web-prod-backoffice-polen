import { useState } from 'react';
import { SnackBarContext, SnackBarReducer } from '.';
import { useReducer } from 'react';

export function SnackBarProvider({ children }) {
    const [state, dispatch] = useReducer(SnackBarReducer, {
        isOpen: false,
        message: 'This is a success message!',
        severity: 'success'
    });
    const validSeverities = new Set(['error', 'warning', 'info', 'success']);
    function openSnackBar(newSeverity, newMessage) {
        if (!validSeverities.has(newSeverity)) {
            newSeverity = "success";
        }
        dispatch({
            type: 'SNACKBAR_OPEN',
            message: newMessage,
            severity: newSeverity
        });
    }

    function closeSnackBar() {
        dispatch({ type: 'SNACKBAR_CLOSE' });
    }


    return (
        <SnackBarContext.Provider value={{
            isOpen: state.isOpen, 
            message: state.message,
            severity: state.severity,
            openSnackBar,
            closeSnackBar
        }}>
            {children}
        </SnackBarContext.Provider>
    );
}
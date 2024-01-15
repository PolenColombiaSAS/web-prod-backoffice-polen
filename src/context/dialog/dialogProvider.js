import { DialogContext } from '.';
import { useReducer } from 'react';
import { DialogReducer } from './dialogReducer';

const initialState = {
    dialogTitle: null,
    dialogContent: null,
    dialogButtons: null,
    isDialogOpen: false,
};

export function DialogProvider({
    children
}) {
    const [state, dispatch] = useReducer(DialogReducer, initialState);

    function showDialog(title, content, actions) {
        dispatch({
            type: 'SHOW_DIALOG',
            payload: {
                title,
                content,
                actions
            },
        });
    }

    function hideDialog() {
        dispatch({
            type: 'HIDE_DIALOG'
        });
    }

    return ( <DialogContext.Provider value = {
            {
                ...state,
                showDialog,
                hideDialog,
            }
        } >
        {
            children
        } </DialogContext.Provider>
    );
}
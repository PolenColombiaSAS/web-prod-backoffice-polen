import { useReducer } from 'react';
import { DrawerContext } from '.';
import DrawerReducer from './drawerReducer';

const initialState = {
    drawerContent: null,
    isDrawerOpen: false,
    anchor:"right"
};

export function DrawerProvider({children}) {
    const [state, dispatch] = useReducer(DrawerReducer, initialState);

    const validAnchor = new Set(['left', 'right', 'top', 'bottom']);
    function showDrawer(content,anchor) {
        if (!validAnchor.has(anchor)) {
            anchor = "right";
        }
        dispatch({
            type: 'SHOW_DRAWER',
            payload: {
                content,
                anchor
            },
        });
    }

    function hideDrawer() {
        dispatch({
            type: 'HIDE_DRAWER'
        });
    }

    return ( <DrawerContext.Provider value = {
            {
                anchor:state.anchor,
                isDrawerOpen:state.isDrawerOpen,
                drawerContent:state.drawerContent,
                showDrawer,
                hideDrawer,
            }
        } >
        {
            children
        } </DrawerContext.Provider>
    );
}
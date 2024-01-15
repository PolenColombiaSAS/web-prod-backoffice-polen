import { useEffect, useReducer, useState } from "react";
import { AdminLayoutContext } from "./AdminLayoutContext";
import { AdminLayoutReducer } from "./AdminLayoutReducer";
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material';
import { useRouter } from "next/router";
import menuItemsList from "../../shared/layout/adminLayout/menuItemsList";

export const AdminLayoutProvider = ({ children }) => {
  const theme = useTheme();
  const { pathname } = useRouter();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const isDownMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [state, dispatch] = useReducer(AdminLayoutReducer, {
    isOpen: isLargeScreen,
    drawerwidthopen: 300,
    drawerwidthclose: 0,
    currentRoute: "/",
    menuItemsList: menuItemsList,
    itemsSelected: {},
    toolBarHeight: 85
  });

  useEffect(() => {
    dispatch({
      type: 'SET_IS_OPEN_DRAWER',
      payload: isLargeScreen,
    });

    if (isLargeScreen) {
      handleLinkOpen(cleanedPathname(pathname))
      dispatch({
        type: 'SET_DRAWER_WIDTH_CLOSE',
        payload: 64,
      });
    } else {
      dispatch({
        type: 'SET_DRAWER_WIDTH_CLOSE',
        payload: 0,
      });

    }
  }, [isLargeScreen]);

  const cleanedPathname = (pathname) => {
    return pathname.split('/')
      .filter(part => !part.startsWith('[') && !part.includes('?'))
      .join('/');
  }

  const findItemByLink = (items, path, parents = []) => {
    for (const item of items) {
      if (item.link && path === item.link) {
        return [...parents, item];
      }
      if (item.subitems) {
        const found = findItemByLink(item.subitems, path, [...parents, item]);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const handleLinkOpen = (pathname) => {
    const itemsSelected = findItemByLink(menuItemsList, pathname)
    if (!Array.isArray(itemsSelected) || itemsSelected.length === 0) {
      return
    }
    itemsSelected.forEach((item, index) => {
      if (item) {
        dispatch({
          type: 'SET_ITEM',
          payload: {
            nivel: index + 1,
            item: item
          },
        });
      }
    })
  }

  const handleItemsClick = (item, nivel) => {
    if (item === state.itemsSelected[nivel]) {
      return
    }
    if (!state.isOpen) {
      dispatch({
        type: 'SET_IS_OPEN_DRAWER',
        payload: !state.isOpen,
      });
    }
    if (isDownMdScreen) {

      dispatch({
        type: 'SET_IS_OPEN_DRAWER',
        payload: false,
      });
    }
    dispatch({
      type: 'SET_ITEM',
      payload: {
        nivel: nivel,
        item: item
      },
    });

    const claves = Object.keys(state.itemsSelected);
    claves.forEach((clave) => {
      if (clave > nivel) {
        dispatch({
          type: 'SET_ITEM',
          payload: {
            nivel: clave,
            item: null
          },
        });
      }
    });
  };

  const handleToggleDrawer = () => {
    dispatch({
      type: 'SET_IS_OPEN_DRAWER',
      payload: !state.isOpen,
    });
    if (!state.isOpen) {
      handleLinkOpen(cleanedPathname(pathname))
    }
  };

  return (
    <AdminLayoutContext.Provider value={{
      handleToggleDrawer,
      isOpen: state.isOpen,
      drawerwidthopen: state.drawerwidthopen,
      drawerwidthclose: state.drawerwidthclose,
      currentRoute: state.currentRoute,
      menuItemsList: state.menuItemsList,
      itemsSelected: state.itemsSelected,
      handleItemsClick: handleItemsClick,
      toolBarHeight: state.toolBarHeight
    }}>
      {children}
    </AdminLayoutContext.Provider>
  );
};

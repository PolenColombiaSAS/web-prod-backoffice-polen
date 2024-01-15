import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import AppBarAdmin from './AppBarAdmin/AppBarAdmin';
import CustomDrawer from './customDrawer/CustomDrawer';
import { useAdminLayoutContext } from '../../../context/adminLayout/useAdminLayoutContext';
import { useAuthContext } from '../../../context/auth';
import Backdrop from '@mui/material/Backdrop';
import { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import InactivityHandler from 'shared/contextComponent/InactivityHandler';

const AdminLayout = ({ children }) => {
  const { isOpen, itemsSelected, drawerwidthopen, drawerwidthclose, toolBarHeight, menuItemsList,
    handleItemsClick, handleToggleDrawer } = useAdminLayoutContext();
  const { user, logOut } = useAuthContext();
  const [backdropOpen, setBackdropOpen] = useState(true);
  const [menuList, setMenuList] = useState([])
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  useEffect(() => {
    var user = JSON.parse(sessionStorage.getItem("user"))
    menu(user?.menu)
    if (!isLargeScreen && isOpen) {
      setBackdropOpen(true)
    } else {
      setBackdropOpen(false)
    }
  }, [isLargeScreen, isOpen, user]);


  const handleCloseDrawer = () => {
    setBackdropOpen(!backdropOpen)
    handleToggleDrawer()
  };


  const settings = [
    // { name: 'Profile', action: null, icon: { name: "Edit" } },
    // { name: 'My account', action: null, icon: { name: "Edit" } },
    // { name: 'Settings', action: null, icon: { name: "Settings" } },
    // { name: 'divider' },
    { name: 'Cerrar Sesión', action: logOut, icon: { name: "Logout" } },
  ];

  const menu = (menuItems = []) => {

    if (!menuItems) {
      return;
    }


    setMenuList(
      [{
        link: "/admin/reportes",
        name: "Reportes",
        icon: { name: "Assessment", size: "small" },
        order: 1
      }]
    )

    // const menuConfig = {
    //   '/admin/prospecto': {
    //     name: "Prospecto",
    //     icon: { name: "SupervisorAccount", size: "small" },
    //     order: 1
    //   },
    //   '/admin/prospecto/documentos': {
    //     name: "Revisión Documentos",
    //     icon: { name: "LocalAtm", size: "small" },
    //     order: 3
    //   }
    // };
    // const menuItemsListData = menuItems.map(item => {
    //   return menuConfig[item] ? { ...menuConfig[item], link: item } : null;
    // }).filter(item => item !== null);

    // setMenuList(menuItemsListData);
  };

  return (
    <Box sx={{ display: 'flex' }}>

      <InactivityHandler/>
      <AppBarAdmin
        toolBarHeight={toolBarHeight}
        isOpen={isOpen}
        handleToggleDrawer={handleToggleDrawer}
        user={user}
        logOut={logOut}
        settings={settings}
        drawerwidthopen={drawerwidthopen}
      /> 
      <CustomDrawer
        toolBarHeight={toolBarHeight}
        menuItems={menuList}
        isOpen={isOpen}
        itemsSelected={itemsSelected}
        handleItemsClick={handleItemsClick}
        handleToggleDrawer={handleToggleDrawer}
        drawerwidthopen={drawerwidthopen}
        drawerwidthclose={drawerwidthclose}
      />
      <Backdrop style={{ zIndex: 500 }} open={backdropOpen} onClick={handleCloseDrawer} />
      <Box component="main" sx={{
        flexGrow: 1,
        width: isOpen ? `calc(100% - ${drawerwidthopen}px)` : `calc(100% - ${drawerwidthclose}px)`,
        minWidth: "300px",
        px: { xs: 1, sm: 2, md: 3, lg: 3, xl: 3 },
        py: 3,
        marginTop: `${toolBarHeight}px`
      }} >
        {children}
      </Box>
    </Box>
  );
}
export default AdminLayout;







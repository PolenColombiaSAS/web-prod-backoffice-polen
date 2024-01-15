import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button, useMediaQuery } from '@mui/material';
import CustomMenuDrawerTree from './CustomMenuDrawerTree';
import CustomDrawerHeader from './CustomDrawerHeader';

const openedMixin = (theme, drawerwidthopen) => ({
  width: drawerwidthopen,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme, drawerwidthclose) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `${drawerwidthclose}px`
  // `calc(${theme.spacing(7)} + 1px)`,
  // [theme.breakpoints.up('sm')]: {
  //   width: `calc(${theme.spacing(8)} + 1px)`,
  // },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, drawerwidthopen, drawerwidthclose }) => ({
    width: drawerwidthopen,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    ...(open && {
      ...openedMixin(theme, drawerwidthopen),
      '& .MuiDrawer-paper': openedMixin(theme, drawerwidthopen),
    }),
    ...(!open && {
      ...closedMixin(theme, drawerwidthclose),
      '& .MuiDrawer-paper': closedMixin(theme, drawerwidthclose),
    }),
  }),
);

const CustomDrawer = ({ menuItems, isOpen, drawerwidthopen, drawerwidthclose, toolBarHeight,
  itemsSelected, handleItemsClick, handleToggleDrawer }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Drawer
      variant="permanent"
      open={isOpen}
      hideBackdrop={isLargeScreen}
      drawerwidthopen={drawerwidthopen}
      drawerwidthclose={drawerwidthclose}
    >
      <CustomDrawerHeader toolBarHeight={toolBarHeight}>
        {theme.direction === 'rtl' ? <></>:<img src="/LogoSplashScreen.svg" width={'215px'} alt="Logo" />}
          <IconButton onClick={handleToggleDrawer}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </CustomDrawerHeader>
        <Divider />
        <List>
          <CustomMenuDrawerTree
            items={menuItems}
            handleItemsClick={handleItemsClick}
            isOpen={isOpen}
            itemsSelected={itemsSelected}
          />
        </List>
        {isOpen && <Divider />}
        {isOpen && <Button onClick={handleToggleDrawer}>Cerrar</Button>}
    </Drawer>
  );
}

export default CustomDrawer;
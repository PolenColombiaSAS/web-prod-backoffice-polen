import { styled } from '@mui/material/styles';
import { Box, Toolbar } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CustomAppBarLogo from './CustomAppBarLogo';
import CustomAppBarUserInfo from './CustomAppBarUserInfo';
import CustomUserMenuWithAvatar from './CustomUserMenuWithAvatar';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, drawerwidthopen }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerwidthopen,
        width: `calc(100% - ${drawerwidthopen}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const AppBarAdmin = ({ isOpen, handleToggleDrawer, user, settings, drawerwidthopen,  toolBarHeight }) => {

    return (
        <AppBar open={isOpen} drawerwidthopen={drawerwidthopen}>
            <Toolbar sx={{ height: `${toolBarHeight}px` }}>
                <IconButton
                    color="inherit"
                    onClick={handleToggleDrawer}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(isOpen && { display: 'flex', }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                {!isOpen &&
                    <CustomAppBarLogo srcLogo="/LogoSplashScreen.svg" />
                }
                <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", marginLeft: 'auto' }}>
                    {
                        user &&
                        <CustomAppBarUserInfo user={user} />
                    }
                    <CustomUserMenuWithAvatar settings={settings} nombresCompletos={`${user?.nombres} ${user?.apellidos}`}/>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default AppBarAdmin;







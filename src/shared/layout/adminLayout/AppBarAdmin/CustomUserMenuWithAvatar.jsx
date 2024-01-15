import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography, alpha, styled } from "@mui/material";
import { useState } from "react";
import Divider from '@mui/material/Divider';
import CustomIconComponent from "../../../ui-components/button/CustomIconComponent";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 220,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
const CustomUserMenuWithAvatar = ({ settings, nombresCompletos = "" }) => {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            {/* <Tooltip title="Open settings">
            </Tooltip>
             */}
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar {...stringAvatar(nombresCompletos)} />
                    {/* <Avatar
                        alt="Avatar"
                        src="https://mui.com/static/images/avatar/2.jpg"
                    /> */}
                </IconButton>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting, index) => (
                    setting.name == "divider"
                        ?
                        <Divider key={index} />
                        :
                        <MenuItem
                            key={index}
                            onClick={setting.action}
                        >
                            <CustomIconComponent iconName={setting.icon.name} />
                            <Typography textAlign="center">{setting.name}</Typography>
                        </MenuItem>
                ))}
            </StyledMenu>
        </>
    );
}

export default CustomUserMenuWithAvatar


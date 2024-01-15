import { useTheme } from '@mui/material';
import { Box } from "@mui/material";

const CustomDrawerHeader = ({ children, toolBarHeight }) => {
    const theme = useTheme()
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: `${toolBarHeight}px`,
            padding: theme.spacing(0, 1),
            backgroundColor: theme.palette.primary.main,
            ...theme.mixins.toolbar,
        }}>
            {children}
        </Box>
    )
}


export default CustomDrawerHeader;
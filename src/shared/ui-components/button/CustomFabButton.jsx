import { Fab, IconButton, useMediaQuery, useTheme } from "@mui/material";
import CustomIconComponent from "./CustomIconComponent";

const CustomFabButton = ({
    iconName,
    disabled = false,
    color = "primary",
    onAction,
    sx,
    type="button"

}) => {


    return (
        <>
            <Fab  
                color={color} 
                aria-label={iconName}
                onClick={onAction}
                sx={sx}
                disabled={disabled}
                size={"large"}
                type={type}
                >
                <CustomIconComponent
                    color={'inherit'}
                    iconName={iconName}
                    fontSize={'medium'}
                />
            </Fab>
        </>
    )
}
export default CustomFabButton
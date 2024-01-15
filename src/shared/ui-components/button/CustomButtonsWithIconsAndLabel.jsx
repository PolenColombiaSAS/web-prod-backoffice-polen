import { Button } from "@mui/material"
import CustomIconComponent from "./CustomIconComponent"


const CustomButtonsWithIconsAndLabel = ({
    name = "",
    iconName = "",
    variant = "outlined",
    disabled = false,
    color,
    onAction,
    sx,
    type="button"
}) => {
    const combinedSx = {
        fontSize: {
            xs: "0.60rem",
            sm: "0.70rem",
            md: "0.80rem",
            lg: "0.90rem",
            xl: "1rem"
        },
        padding: {
            xs: "2px 4px",
            sm: "4px 8px",
            md: "6px 12px",
            lg: "8px 16px",
            xl: "10px 20px"
        },
        ...sx, 
    };
    return (
        <>
            <Button
                variant={variant}
                size={"small"}
                startIcon={iconName&&<CustomIconComponent iconName={iconName} color="inherit" />}
                disabled={disabled}
                onClick={onAction}
                sx={combinedSx}
                color={color}
                type={type}
            >
                {name}
            </Button>
        </>
    )
}
export default CustomButtonsWithIconsAndLabel
/**
 * 'contained' | 'outlined' | 'text' | string
 */

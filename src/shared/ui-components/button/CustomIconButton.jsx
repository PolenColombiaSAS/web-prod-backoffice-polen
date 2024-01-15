import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import CustomIconComponent from "./CustomIconComponent";

const CustomIconButton = ({
    iconName,
    disabled = false,
    color = "primary",
    onAction,
    sx,
    type="button"

}) => {
    // const defaultFontSize = {
    //     xs: "0.60rem",
    //     sm: "0.70rem",
    //     md: "0.80rem",
    //     lg: "0.90rem",
    //     xl: "1rem"
    // };
    // const defaultPadding = {
    //     xs: "2px 4px",
    //     sm: "4px 8px",
    //     md: "6px 12px",
    //     lg: "8px 16px",
    //     xl: "10px 20px"
    // };

    // const fontSize = fab ? "24px" : defaultFontSize;
    // const padding = fab ? "16px" : defaultPadding;

    const combinedSx = {
        // fontSize: fontSize,
        // padding: padding,
        ...sx,
    };

    const theme = useTheme();

    // Define los tamaños para cada breakpoint
    const breakpoints = {
        xs: useMediaQuery(theme.breakpoints.only('xs')),
        sm: useMediaQuery(theme.breakpoints.only('sm')),
        md: useMediaQuery(theme.breakpoints.only('md')),
        lg: useMediaQuery(theme.breakpoints.only('lg')),
        xl: useMediaQuery(theme.breakpoints.only('xl'))
    };

    // Determina el tamaño del botón basado en el breakpoint
    const getSize = () => {
        if (typeof sx === 'object' && 'fontSize' in sx) return null;
        if (breakpoints.xl) return "large";
        if (breakpoints.lg) return "large";
        if (breakpoints.md) return "medium";
        if (breakpoints.sm) return "small";
        if (breakpoints.xs) return "small";
        return "medium"; // default size para 'xs' y por si acaso no hay match
    };

    const size = getSize();

    return (
        <>
            <IconButton
                aria-label={iconName}
                onClick={onAction}
                disabled={disabled}
                color={color}
                size={size ? size : 'inherit'} // Usar 'inherit' si el size es null
                sx={{ ...combinedSx }}
                type={type}
            >
                <CustomIconComponent
                    color={'inherit'}
                    iconName={iconName}
                    fontSize={'inherit'}
                />
            </IconButton>
        </>
    )
}
export default CustomIconButton
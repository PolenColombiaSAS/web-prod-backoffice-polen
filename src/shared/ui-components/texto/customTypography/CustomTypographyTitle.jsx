import { Typography } from "@mui/material";
import { forwardRef } from "react";

const CustomTypographyTitle = forwardRef(({ children, sx, ...props }, ref) => {

    const combinedSx = {
        ...sx,
        fontSize: { xs: "21px", sm: "24px", md: "27px", lg: "30px", xl: "33px" },
        fontWeight: "bold",
        color: "#232323",
    };

    return (
        <Typography
            ref={ref}
            sx={combinedSx}
            {...props}
        >
            {children}
        </Typography>
    );
});

CustomTypographyTitle.displayName = 'CustomTypographyTitle';

export default CustomTypographyTitle;
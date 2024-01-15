import { Typography } from "@mui/material";
import { forwardRef } from "react";

const CustomTypographyError = forwardRef(({ children, sx, ...props }, ref) => {

    const combinedSx = {
        ...sx,
        width:"100%",
        height:"100%",
        // backgroundColor:"red",
        fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "16px", xl: "18px" },
        textAlign: "left", 
        color:"#990000"

        
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

export default CustomTypographyError;
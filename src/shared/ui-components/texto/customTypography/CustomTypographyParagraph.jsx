import { Typography } from "@mui/material";
import { forwardRef } from "react";

const CustomTypographyParagraph = forwardRef(({ children, sx,fontSize, ...props }, ref) => {
    const combinedSx = {
        ...sx,
        width:"100%",
        height:"100%",
        // backgroundColor:"red",
        fontSize: fontSize||{ xs: "12px", sm: "14px", md: "16px", lg: "18px", xl: "20px" },
        textAlign: "left", 
        
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

export default CustomTypographyParagraph;
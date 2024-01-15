import { Typography } from "@mui/material";
import { forwardRef } from "react";

const CustomTypographySubTitle = forwardRef(({ children, sx, ...props }, ref) => {

    const combinedSx = {
        ...sx,
        fontSize: { xs: "14px", sm: "16px", md: "18px", lg: "20px", xl: "22px" },
    };

    return (
        <Typography
            ref={ref}
            sx={combinedSx}
            color="textSecondary"
            {...props}

        >
            {children}
        </Typography>
    );
});

CustomTypographySubTitle.displayName = 'CustomTypographySubTitle';

export default CustomTypographySubTitle;
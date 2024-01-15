import { Typography } from "@mui/material";
import { forwardRef } from "react";

const CustomTypographyTitleModal = forwardRef(({ children, sx, ...props }, ref) => {

    const combinedSx = {
        fontSize: { xs: "18px", sm: "21px", md: "24px", lg: "27px", xl: "30px" },
        fontWeight: "bold",
        color: "#001a57",
        ...sx,
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


export default CustomTypographyTitleModal;
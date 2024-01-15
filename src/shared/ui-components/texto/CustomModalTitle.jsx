import { Grid } from "@mui/material"
import CustomIconComponent from "../button/CustomIconComponent"
import CustomTypographyTitleModal from "./customTypography/CustomTypographyTitleModal"

const CustomModalTitle = ({ iconName, iconSize, title,iconColor }) => {
    return (
        <Grid
            container
            spacing={1}
        >
            <Grid item >
                <CustomIconComponent iconName={iconName} fontSize={iconSize} color={iconColor}/>
            </Grid>
            <Grid item xs>
                <CustomTypographyTitleModal>
                    {title}
                </CustomTypographyTitleModal>
            </Grid>
        </Grid>
    )
}

export default CustomModalTitle
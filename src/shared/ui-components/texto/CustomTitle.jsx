import { Grid } from "@mui/material"
import CustomTypographyTitle from "./customTypography/CustomTypographyTitle"
import CustomTypographySubTitle from "./customTypography/CustomTypographySubTitle"
import CustomIconComponent from "../button/CustomIconComponent"

const CustomTitle = ({ iconName, iconSize = "large", title = "", buttons, subTitle = "" }) => {
    return (
        <Grid
            container
            spacing={1}
        >
            <Grid item sx={{ alignSelf: "center" }} xs="auto">
                <CustomIconComponent iconName={iconName} fontSize={iconSize} />
            </Grid>
            <Grid item sx={{ alignSelf: "center" }} xs>
                <Grid
                    container
                    direction="column"
                    alignItems="flex-start"
                >
                    <Grid item  >
                        <CustomTypographyTitle>
                            {title}
                        </CustomTypographyTitle>
                    </Grid>
                    <Grid item >
                        {(typeof subTitle === "string")
                            ? <CustomTypographySubTitle>
                                {subTitle}
                            </CustomTypographySubTitle>
                            : <>
                                {subTitle}
                            </>
                        }
                    </Grid>
                </Grid>
            </Grid>
            {
                buttons &&
                <Grid item xs={12} md={"auto"}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: { xs: "left", sm: "left", md: "center", lg: "center", xl: "center" }
                    }}
                >

                    {buttons}
                </Grid>
            }
        </Grid>
    )
}

export default CustomTitle
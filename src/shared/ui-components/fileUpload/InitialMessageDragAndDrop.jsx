import { Grid, Typography } from '@mui/material'
import { UploadFile } from '@mui/icons-material';
import CustomTypographyTitle from '../texto/customTypography/CustomTypographyTitle';
import CustomTypographySubTitle from '../texto/customTypography/CustomTypographySubTitle';
const InitialMessageDragAndDrop = ({ iconColor = "#2196F3", textColor = "#2196F3" }) => {
    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <UploadFile sx={{ color: iconColor, fontSize: 75 }} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center">
                        <Grid item>
                            <CustomTypographyTitle
                                sx={{
                                    color: textColor,
                                    textAlign: "center",
                                }}>
                                Arrastra y suelta archivos aquí!!
                            </CustomTypographyTitle>
                        </Grid>
                        <Grid item>
                            <CustomTypographySubTitle
                                sx={{
                                    color: textColor,
                                    textAlign: "center",
                                }}>
                                Archivos Aceptados [PDF o imágenes]
                            </CustomTypographySubTitle>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
export default InitialMessageDragAndDrop
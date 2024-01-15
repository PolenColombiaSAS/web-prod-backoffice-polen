import React from 'react'
import CustomCarrousel from '../CustomCarrousel'
import { Box, Grid } from '@mui/material'

export const CarrouselFilePreview = ({ elements, deleteElementFromCarrousel }) => {
    return (
        <>
            <Grid
                sx={{ width: "100%", height: "100%" }}
                container
                justifyContent="center"
                alignItems="center"
                spacing={!(previewUrls.length > 0 && onFileUpload) ? 0 : 2}
            >
                <Grid item xs={12} sx={{
                    height: !(previewUrls.length > 0 && onFileUpload) ? "90%" : "100%",
                    ...alignStyles.centeredContentStyles
                }}>

                    <CustomCarrousel elements={elements} deleteElementFromCarrousel={deleteElementFromCarrousel} />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{
                        mt: 1,
                        ...alignStyles.centeredContentStyles
                    }}>
                        <Button
                            variant="contained"
                            onClick={onFileUpload}
                            startIcon={<CloudUploadIcon />}
                        >
                            Cargar
                        </Button>
                    </Box>
                </Grid>
            </Grid>

        </>
    )
}

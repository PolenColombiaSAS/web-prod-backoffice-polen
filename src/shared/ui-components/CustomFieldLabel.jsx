import { Grid, Stack, Typography } from "@mui/material"
import CustomIconComponent from "./button/CustomIconComponent"

export const CustomFieldLabel = ({ fieldName, fieldData, iconName, onClick,hoverColor=true ,sx }) => {

    return (
        <Grid
            container
            direction="row"
            columnSpacing={2}
            alignItems="left"
            sx={{
                py: 1,
                cursor: onClick ? 'pointer' : 'default',
                '&:hover': {
                    color:hoverColor&& onClick ? 'blue' : 'inherit'
                },
                ...sx
            }}
            onClick={(e) => {
                if (onClick) {
                    e.stopPropagation()
                    onClick(e)
                }
            }}
        >
            <Grid item xs="auto" >
                <Stack direction="row" spacing={2}>
                    {iconName && <CustomIconComponent iconName={iconName} />}
                    {fieldName &&
                        <Typography variant="body1" style={{ fontWeight: 'bold', }}>{fieldName}:</Typography>
                    }
                </Stack>
            </Grid>
            <Grid item xs sx={{display:"flex",alignItems:"center"}} >
                <Typography variant="body1" component="div" sx={{ textDecoration: 'underline' }}>{fieldData && fieldData }</Typography>
            </Grid>
        </Grid>
    )
}


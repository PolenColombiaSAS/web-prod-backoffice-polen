import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material"
import CustomPaper from "shared/ui-components/layout/CustomPaper"
import CustomDynamicFormBuilder from "./CustomDynamicFormBuilder"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FormWrapper = ({ errors, control, watch, setValue, resetField, title, fieldsConfig = [],formData }) => {

    const theme = useTheme();
    const isDownMdScreen = useMediaQuery(theme.breakpoints.down('md'));
    return ( 
        <> 
            {isDownMdScreen
                ? (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{
                                backgroundColor: "#C7CBD8",
                                color: "white"
                            }}
                        >
                            <Typography>
                                {title}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CustomDynamicFormBuilder
                                control={control}
                                errors={errors}
                                watch={watch}
                                setValue={setValue}
                                resetField={resetField}
                                fieldsConfig={fieldsConfig}
                                formData={formData}
                            />
                        </AccordionDetails>
                    </Accordion>
                )
                : (
                    <CustomPaper elevation={5} sx={{ mb: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 } }}>
                        <Grid container spacing={4} >
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Typography variant="h5">
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <CustomDynamicFormBuilder
                                    control={control}
                                    errors={errors}
                                    watch={watch}
                                    setValue={setValue}
                                    resetField={resetField}
                                    fieldsConfig={fieldsConfig}
                                    formData={formData}
                                />
                            </Grid>
                        </Grid>
                    </CustomPaper >
                )
            }
        </>

    )
}
export default FormWrapper




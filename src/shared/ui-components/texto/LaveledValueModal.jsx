import React from 'react';
import { Box, Grid } from '@mui/material';
import CustomTypographyParagraph from './customTypography/CustomTypographyParagraph';
import CustomIconComponent from '../button/CustomIconComponent';

const LaveledValueModal = ({ label, value, iconName,fontSize,secondaryFontSize, direction="row"}) => {
    const renderValue = (value) => {
        let element = null
        switch (typeof value) {
            case 'string':
                element = (
                    <CustomTypographyParagraph sx={{ textAlign: "left" }} fontSize={secondaryFontSize}>
                        {value}
                    </CustomTypographyParagraph>)
                break;
            case 'object':
                if (Array.isArray(value)) {
                    element = (
                        <Grid container >
                            {
                                value.map((item, index) =>
                                    <Grid item xs={12} key={index}>
                                        {item}
                                    </Grid>
                                )
                            }
                        </Grid>
                    )
                } else {
                    element = (<Box sx={{ textAlign: "left", }}>
                        {value}
                    </Box>)
                }
                break;
            default:
                break;
        }

        return (<>
            {element}
        </>)
    }
    return (
        <Grid container columnSpacing={1} sx={{}} >
            {iconName && <Grid item xs={1.5} >
                <CustomIconComponent iconName={iconName} />
            </Grid>}
            <Grid item xs={iconName ? 12 - 1.5 : 12}>
                <Grid container columnSpacing={1} direction={direction}>

                    {label &&
                        <Grid item >
                            <CustomTypographyParagraph
                                sx={{ fontWeight: "bold" }}
                                fontSize={fontSize}
                            >
                                {label}
                            </CustomTypographyParagraph>
                        </Grid>}
                    <Grid item xs={label ? undefined : 12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                        {renderValue(value)}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default LaveledValueModal;

import { Accordion, AccordionDetails, AccordionSummary, Divider } from '@mui/material'
import CustomIconComponent from './button/CustomIconComponent'

const CustomAccordion = ({ children,headerComponent,backgroundColorHeaderAccordion }) => {
    return (
        <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
                expandIcon={
                    <CustomIconComponent
                        color={'inherit'}
                        iconName={"ExpandMore"}
                        fontSize={'inherit'}
                    />
                }
                
                sx={{ backgroundColor: backgroundColorHeaderAccordion }}

                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                {headerComponent}
            </AccordionSummary>
            <Divider sx={{ border: '#1976d2 2px solid' }} />
            <AccordionDetails >
                {children}
            </AccordionDetails>
        </Accordion>
    )
}

export default CustomAccordion
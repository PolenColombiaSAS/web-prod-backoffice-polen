
import { styled } from '@mui/material/styles';
import { Paper, Tooltip, tooltipClasses } from '@mui/material';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        // border: '1px solid #dadde9',
    },
}));

const CustomHtmlToolTip = ({children,htmlToolTip,placement="right-end"}) => {
    return (
        <HtmlTooltip
            placement={placement}            
            title={
                <Paper sx={{p:1}}>
                    {htmlToolTip}
                </Paper>
            }
        >
            {children}
        </HtmlTooltip>
    )
}
export default CustomHtmlToolTip

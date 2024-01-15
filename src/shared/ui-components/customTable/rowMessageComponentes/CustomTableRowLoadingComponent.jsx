import { TableCell, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";

const CustomTableRowLoadingComponent = ({ columns }) =>
{
    return (
        <TableRow>
            <TableCell colSpan={columns.length} align="center">
                <Box py={2}>
                    <Typography variant="h6">...loading</Typography>
                </Box>
            </TableCell>
        </TableRow>
    );
}

export default CustomTableRowLoadingComponent;

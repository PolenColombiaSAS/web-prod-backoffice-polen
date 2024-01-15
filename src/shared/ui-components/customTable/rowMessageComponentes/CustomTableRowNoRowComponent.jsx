import { TableCell, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";

const CustomTableRowNoRowComponent = ({ columns }) =>
{
    return (
        <TableRow>
            <TableCell colSpan={columns.length} align="center">
                <Box py={2}>
                    <Typography variant="h6">Sin Registros!!</Typography>
                </Box>
            </TableCell>
        </TableRow>
    );
}

export default CustomTableRowNoRowComponent;

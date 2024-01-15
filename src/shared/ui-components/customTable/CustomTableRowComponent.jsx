import { Checkbox, TableCell, TableRow } from '@mui/material';
import getPinnedStyles from './getPinnedStyles';
import renderCell from './renderCell';


const CustomTableRowComponent = ({ columns, row, selectedRows = [], onSelectedCheckBox }) => {

    return (
        <TableRow key={row.id}>
            {columns.map((column, index) => {
                const pinnedStyles = getPinnedStyles(column, index, columns.length);

                return (
                    <TableCell
                        key={column?.field}
                        align={column?.align}
                        style={{
                            minWidth: column?.minWidth ? column.minWidth : undefined,
                            ...pinnedStyles
                        }}
                        className={column?.pinnedClass}
                    >
                        {renderCell(column, row,selectedRows,onSelectedCheckBox)}
                    </TableCell>
                )
            })}
        </TableRow>
    );
}

export default CustomTableRowComponent;

import { TableBody } from '@mui/material';
import CustomTableRowLoadingComponent from './rowMessageComponentes/CustomTableRowLoadingComponent';
import CustomTableRowComponent from './CustomTableRowComponent';
import CustomTableRowNoRowComponent from './rowMessageComponentes/CustomTableRowNoRowComponent';

const CustomTableBodyComponent = ({ columns, rows, loading, onSelectionChange, selectedRows }) => {


    const handleSelectCheckBox = (row) => {
        if (selectedRows.find((selectedRow) => selectedRow.id === row.id)) {
            onSelectionChange(selectedRows.filter((selectedRow) => selectedRow.id !== row.id));
        } else {
            onSelectionChange([...selectedRows, row]);
        }
    }
    return (
        <TableBody>
            {
                loading
                    ? (
                        <CustomTableRowLoadingComponent columns={columns} />
                    )
                    :
                    rows.length === 0
                        ? (
                            <CustomTableRowNoRowComponent columns={columns} />
                        )
                        : (
                            rows.map((row) => (
                                <CustomTableRowComponent
                                    key={row.id}
                                    columns={columns}
                                    row={row}
                                    onSelectedCheckBox={handleSelectCheckBox}
                                    selectedRows={selectedRows}
                                />
                            ))
                        )
            }
        </TableBody>
    );
}

export default CustomTableBodyComponent;

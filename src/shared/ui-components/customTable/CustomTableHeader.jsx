import { TableHead, TableCell, TableRow, Tooltip, Checkbox } from '@mui/material';
import getPinnedStyles from './getPinnedStyles';
const CustomTableHeader = ({ columns, onSelectAllClick,rows=[],selectedRows=[] }) => {


  const renderCell = (column) => {
    if (column?.field === 'selectCheckBox') {
      return (
        <Checkbox
          checked={rows.length==selectedRows.length&&rows.length>0}
          onChange={() => {
            if (onSelectAllClick) {
              onSelectAllClick()
            }
          }}
        />
      );
    }
    if (column?.renderHeader) {
      return column?.renderHeader({});
    }
    return column?.headerName;
  };
  return (
    <TableHead >
      <TableRow >
        {columns.map((column) => {

          const pinnedStyles = getPinnedStyles(column);

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
              {
                column?.description ? (
                  <Tooltip title={column.description}>
                    <>
                      {renderCell(column)}
                    </>
                  </Tooltip>
                ) : (
                  renderCell(column)
                )
              }
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  );
}

export default CustomTableHeader;

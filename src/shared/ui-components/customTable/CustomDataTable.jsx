import { Box, Divider, List, ListItem, ListItemText, Stack, Table, TableContainer, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import CustomTableHeader from './CustomTableHeader';
import CustomTableBodyComponent from './CustomTableBodyComponent';
import styles from './customTable.module.css';
import renderCell from './renderCell';

import Grid from '@mui/material/Unstable_Grid2';
const CustomDataTable = ({ columns = [], rows = [], onSelectionChange, loading, initialState = {} }) => {

  const [internalColumns, setInternalColumns] = useState(columns)
  const [selectedRows, setSelectedRows] = useState([])

  useEffect(() => {
    if (onSelectionChange && selectedRows?.length > 0) {
      onSelectionChange(selectedRows);
    }
  }, [selectedRows]);

  useEffect(() => {
    let internalColumns = columns;
    if (onSelectionChange) {
      internalColumns = [{
        field: 'selectCheckBox',
        align: 'center',
        minWidth: 50,
      }, ...columns];
    }
    if (initialState?.pinnedColumns) {
      const internalColumnsPinned = setPinned(internalColumns)
      setInternalColumns(internalColumnsPinned);
    } else {
      setInternalColumns(internalColumns);
    }
  }, [onSelectionChange, columns, initialState?.pinnedColumns])


  const theme = useTheme();
  const isDownMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleOnSelectionChange = (rowsParam) => {
    setSelectedRows(rowsParam)
  }
  const handleOnSelectAllClick = () => {
    setSelectedRows(rows)

  }

  const setPinned = (internalColumns) => {
    const arrPinnedLeft = ['selectCheckBox', ...initialState?.pinnedColumns?.left] || ['selectCheckBox'];
    const pinnedLeft = arrPinnedLeft.filter(element => internalColumns.some(col => col.field === element));

    const arrPinnedRight = initialState?.pinnedColumns?.right || [];
    const pinnedRight = arrPinnedRight.filter(element => internalColumns.some(col => col.field === element));

    const unpinned = internalColumns.filter(col => !pinnedLeft.includes(col.field) && !pinnedRight.includes(col.field));

    let leftPinnedAcumulado = 0;

    const rowsPinnedLeft = pinnedLeft.map((field, index) => {
      const col = internalColumns.find(col => col.field === field)
      if (col) {
        const leftPinned = leftPinnedAcumulado
        leftPinnedAcumulado += col.minWidth

        if (index == 2) {
          leftPinnedAcumulado += 10
        }
        const isLastElement = index === pinnedLeft.length - 1;

        return ({
          ...col,
          pinned: 'left',
          leftPinned: leftPinned,
          pinnedClass: isLastElement ? styles?.pinnedLeft : undefined
        })
      }
      else {
        undefined
      }

    }).filter(item => item !== null && item !== undefined) || []

    let rightPinnedAcumulado = 0;
    const rowsPinnedRight = pinnedRight.map((field, index) => {
      const col = internalColumns.find(col => col.field === field)
      const rightPinned = rightPinnedAcumulado
      rightPinnedAcumulado += col?.minWidth || 0;

      const isSecondToLast = index === pinnedRight.length - 2;
      const isLastElement = index === pinnedRight.length - 1;
      if (isSecondToLast) {
        rightPinnedAcumulado += 10
      }
      return ({
        ...col,
        pinned: 'right',
        rightPinned: rightPinned,
        pinnedClass: isLastElement ? styles?.pinnedRight : undefined
      })
    }).filter(item => item !== null && item !== undefined).reverse() || []

    let reorderedColumns = [
      ...unpinned
    ];
    if (rowsPinnedLeft?.length > 0) {
      reorderedColumns = [...rowsPinnedLeft, ...reorderedColumns]
    }
    if (rowsPinnedRight?.length > 0) {
      reorderedColumns = [...reorderedColumns, ...rowsPinnedRight]
    }
    return reorderedColumns;
  }
  const isPinned = (column) => {
    return column.pinned;
  };
  const renderList = () => (
    <Box

    >
      {rows.map((row, index) => {
        return (
          <Box key={index} >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              sx={{
                // backgroundColor: "yellow",
              }}
            >
              <Grid xs>
                <Grid container
                  direction="column"
                // sx={{ backgroundColor: "blue" }}
                >
                  {internalColumns.filter(column => !isPinned(column)).map((column) => (
                    <Grid key={column.field}>
                      <Grid
                        container
                        direction="column"
                      >
                        <Grid xs={12}>
                          <strong>{column.headerName}:</strong>
                        </Grid>
                        <Grid xs={12} sx={{ pl: 3 }}>
                          {renderCell(column, row, selectedRows, handleOnSelectionChange)}
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid
                xs={3.5}
                // sx={{ backgroundColor: "pink" }}
              >
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "black",
                  }}
                >
                  {internalColumns.filter(column => isPinned(column)).map((column) => (
                    <Box key={column.field} sx={{width:"100%", pb:1}}>
                      {
                        renderCell(column, row, selectedRows, handleOnSelectionChange)
                      }
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ my: 1 }} />
          </Box>
        )
      })}
    </Box>
  );

  const renderTable = () => (
    <TableContainer component={Paper} style={{ position: "relative" }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table" >
        <CustomTableHeader
          columns={internalColumns}
          onSelectAllClick={handleOnSelectAllClick}
          rows={rows}
          selectedRows={selectedRows}
        />
        <CustomTableBodyComponent
          columns={internalColumns}
          rows={rows}
          loading={loading}
          onSelectionChange={handleOnSelectionChange}
          selectedRows={selectedRows}
        />
      </Table>
    </TableContainer>
  );
  return (
    <>
      {isDownMdScreen ? renderList() : renderTable()}
    </>
  );
}

export default CustomDataTable;

/**
 * https://mui.com/material-ui/api/table-container/
 */
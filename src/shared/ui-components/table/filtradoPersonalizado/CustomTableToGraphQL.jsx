import { Box, TablePagination } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from 'react';
import ContainerCustomToolbar from 'shared/ui-components/customTable/toolBarDaTaTable/ContainerCustomToolbar';


const CustomTableToGraphQL = ({
  rowList = [], columns = [],
  totalPages = 0, totalCount = 0, currentPage = 0,
  onFilterChange, onPageChange,
  initialRowsPerPage = 10, 
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (typeof onPageChange === 'function') {
      onPageChange({ pageIndex: newPage, pageSize: rowsPerPage });
    }
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, initialRowsPerPage);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    if (typeof onPageChange === 'function') {
      onPageChange({ pageIndex: 0, pageSize: newRowsPerPage });
    }
  };

  const handleOnfilterChange = (value) => {
    if (typeof onFilterChange === 'function') {
      setPage(0);
      onFilterChange(value);
      onPageChange({ pageIndex: 0, pageSize: rowsPerPage });
    }
  };
  return (
    <Card variant="outlined" sx={{ height: "100%"}} >
      <CardContent sx={{ height: "100%" }}>
        <Box sx={{
          minHeight: 350,
          width: "100%",
          height: "100%"
        }} >
          <ContainerCustomToolbar onFilterChange={handleOnfilterChange} />
          <DataGrid 
            columns={columns}
            rows={rowList?.length ? rowList : []}
            hideFooter
            hideFooterPagination
            autoHeight
          />
          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20, 50]}
            labelDisplayedRows={({ from, to, count }) => (
              `Página ${currentPage + 1} de ${totalPages} | Filas ${from} a ${to} de ${count}`
            )}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default CustomTableToGraphQL;

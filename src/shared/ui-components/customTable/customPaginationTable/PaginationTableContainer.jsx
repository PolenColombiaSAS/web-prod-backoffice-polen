import { TablePagination } from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react'

const PaginationTableContainer = forwardRef(({
    onPageChange,
    totalPages = 1,
    totalCount = 5,
    initialRowsPerPage = 5
}, ref) => {
    const [internalPage, setInternalPage] = useState(0);
    const [rowsInternalPerPage, setInternalRowsPerPage] = useState(initialRowsPerPage);

    // Usa useImperativeHandle para exponer setInternalPage.
    useImperativeHandle(ref, () => ({
        setInternalPage
    }));

    const handleChangePage = (event, newPage) => {
        setInternalPage(newPage);
        if (typeof onPageChange === 'function') {
            onPageChange({ pageIndex: newPage, pageSize: rowsInternalPerPage });
        }
    };
    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value);
        setInternalRowsPerPage(newRowsPerPage);
        setInternalPage(0);
        if (typeof onPageChange === 'function') {
            onPageChange({ pageIndex: 0, pageSize: newRowsPerPage });
        }
    };
    return (
        <>
            {initialRowsPerPage > 0 &&
                <TablePagination
                    component="div"
                    count={totalCount}
                    page={internalPage}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsInternalPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    labelDisplayedRows={({ from, to, count }) => (
                        `Página ${internalPage + 1} de ${totalPages} | Filas ${from} a ${to} de ${count}`
                    )}
                />}

        </>
    )
});
export default PaginationTableContainer
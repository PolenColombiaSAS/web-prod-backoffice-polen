import { Card, CardContent, Box, TablePagination } from '@mui/material';
import { useRef, useState } from 'react';
import ContainerCustomToolbar from './toolBarDaTaTable/ContainerCustomToolbar';
import CustomDataTable from './CustomDataTable';
import PaginationTableContainer from './customPaginationTable/PaginationTableContainer';


const CustomContainerDataTable = ({
    rowList = [], columns = [],
    totalPages = 0, totalCount = 0,
    onTableChange,
    // onSearchChange, 
    // onPageChange, 
    // onFilterChange,
    onSelectionChange,
    loading,
    initialState = {
        rowsPerPage: 5,
        pinnedColumns: {
            left: [],
            right: []
        }
    }
}) => {

    const [pageValue, setPageValue] = useState({
        pageIndex: 0,
        pageSize: 10
    })
    const [searchValue, setSearchValue] = useState("")
    const [filterFields, setFilterFields] = useState([])
    const paginationRef = useRef(null);

    const handleChangePage = ({ pageIndex, pageSize }) => {
        setPageValue({pageIndex, pageSize})
        if (typeof onTableChange === 'function') {
            onTableChange({
                pageIndex: pageIndex,
                pageSize: pageSize,
                searchValue: searchValue,
                filterFields: filterFields
            });
        }
    };

    const handleOnSearchChange = (searchValue = "") => {
        setSearchValue(searchValue)
        if (paginationRef.current) {
            paginationRef.current.setInternalPage(0);
        }
        if (typeof onTableChange === 'function') {
            onTableChange({
                pageIndex: 0,
                pageSize: pageValue.pageSize,
                searchValue: searchValue,
                filterFields: filterFields
            });
        }
    };
    const handleOnFilterChange = (filterFields = []) => {
        setFilterFields(filterFields)
        if (paginationRef.current) {
            paginationRef.current.setInternalPage(0);
        }
        if (typeof onTableChange === 'function') {
            onTableChange({
                pageIndex: 0,
                pageSize: pageValue.pageSize,
                searchValue: searchValue,
                filterFields: filterFields
            });
        }
    }

    return (
        <Card variant="outlined" sx={{ height: "100%" }} >
            <CardContent sx={{ height: "100%" }}>
                <Box sx={{
                    minHeight: 350,
                    width: "100%",
                    height: "100%"
                }} >
                    <ContainerCustomToolbar
                        onSearchChange={handleOnSearchChange}
                        onFilterChange={handleOnFilterChange}
                        columns={columns} />
                    <CustomDataTable
                        columns={columns}
                        rows={rowList?.length ? rowList : []}
                        onSelectionChange={onSelectionChange}
                        initialState={initialState}
                        loading={loading}
                    />
                    <PaginationTableContainer
                        ref={paginationRef}
                        onPageChange={handleChangePage}
                        totalPages={totalPages}
                        totalCount={totalCount}
                        initialRowsPerPage={initialState.rowsPerPage}
                    />
                </Box>
            </CardContent>
        </Card>
    )
}

export default CustomContainerDataTable;

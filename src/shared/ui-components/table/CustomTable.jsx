import { Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridToolbar, GridToolbarQuickFilter, GridToolbarFilterButton, GridToolbarColumnsButton } from "@mui/x-data-grid";
import { useState } from 'react';
import QuickSearchToolbar from './QuickSearchToolbar';



const CustomTable = ({ rowList=[], columns=[] }) => {
    const [filterModel, setFilterModel] = useState({
        items: [],
        quickFilterExcludeHiddenColumns: true,
        quickFilterValues: [''],
    });
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({});
    return (
        <Card sx={{height:"100%"}}>
            <CardContent sx={{height:"100%"}}>
                <Box sx={{
                    minHeight: 350,
                    width: "100%",
                    height:"100%"
                }} >
                    <DataGrid 
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 100]}

                        columns={columns}
                        rows={rowList}
                        slots={{ toolbar: QuickSearchToolbar }}
                        // slots={{ toolbar: GridToolbar  }}

                        filterModel={filterModel}
                        onFilterModelChange={(newModel) => setFilterModel(newModel)}
                        columnVisibilityModel={columnVisibilityModel}
                        onColumnVisibilityModelChange={(newModel) =>
                            setColumnVisibilityModel(newModel)
                        }
                    />
                </Box>
            </CardContent>
        </Card>
    )
}

export default CustomTable


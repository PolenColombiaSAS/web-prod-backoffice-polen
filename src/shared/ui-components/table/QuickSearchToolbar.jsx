import { Box, Grid } from "@mui/material";
import { GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarQuickFilter } from "@mui/x-data-grid";

const QuickSearchToolbar=()=> {
    return (
        <Box sx={{ p: 3 }}>
            <Grid container alignItems="center">
                <Grid item xs={12} sm={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <GridToolbarFilterButton />
                        </Grid>
                        <Grid item>
                            <GridToolbarColumnsButton />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <GridToolbarQuickFilter
                            sx={{ width: { xs: "100%", sm: "100%", md: "300px" } }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
export default QuickSearchToolbar
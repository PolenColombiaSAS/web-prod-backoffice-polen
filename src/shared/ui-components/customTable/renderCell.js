const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const renderCell = (column, row, selectedRows = [], onSelectedCheckBox) => {
    if (column?.field === 'selectCheckBox') {
        return (
            <Checkbox
                checked={!!selectedRows.find((selectedRow) => selectedRow.id === row.id)}
                onChange={() => {
                    if (typeof onFilterChange === "function") {
                        onSelectedCheckBox(row)
                    }
                }}
            />
        );
    }
    let value = getNestedValue(row, column?.field);
    // If there's a custom renderer function in the column definition, use it
    if (column?.renderCell) {
        return column?.renderCell({ row, value: value });
    }

    // If there's a custom valueGetter function in the column definition, use it
    if (column?.valueGetter) {
        return column?.valueGetter({ row });
    }

    // Default: just return the value from the row for this column's field
    return value||"";
};

export default renderCell
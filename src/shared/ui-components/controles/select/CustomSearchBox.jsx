import {  TextField } from "@mui/material";
import { useState } from "react";
import CustomTypographyTitleModal from "shared/ui-components/texto/customTypography/CustomTypographyTitleModal";

const CustomSearchBox = ({ onSearchTextField, title }) => {

    const [insideSearchTerm, setInsideSearchTerm] = useState('');

    const handleOnSearchTextField = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const searchValue = e.target.value;
        setInsideSearchTerm(searchValue);
        if (typeof onSearchTextField === 'function') {
            onSearchTextField(searchValue)
        }

    };
    return (
        <>
            {title &&
                <CustomTypographyTitleModal sx={{ color: "#37406E", py: 1 }}>
                    {title}
                </CustomTypographyTitleModal>
            }
            <TextField
                fullWidth
                placeholder="Buscar"
                value={insideSearchTerm}
                onKeyDown={(e) => {
                    e.stopPropagation();
                }}
                onChange={(e) => handleOnSearchTextField(e)}
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}
                sx={{ px: 1, pb: 1 }}
            />
        </>
    )
}
export default CustomSearchBox

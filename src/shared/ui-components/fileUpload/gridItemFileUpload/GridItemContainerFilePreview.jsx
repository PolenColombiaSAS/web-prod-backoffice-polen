import { Box, Paper } from "@mui/material"
import CustomButtons from "shared/ui-components/button/CustomButtons"
import CustomBox from "shared/ui-components/materialUI/CustomBox"

const GridItemContainerFilePreview = ({ children, stopPropagation = true, onDeleteElement, disableDeleteButton }) => {

    const handleOnDeleteElement = (data) => {
        if (typeof onDeleteElement === "function") {
            onDeleteElement(data)
        }
    }
    return (
        <CustomBox
            sx={{ width: "100%", height: "100%", minHeight: 400 }}
            onClick={(event) => {
                if (stopPropagation) {
                    event.stopPropagation()
                }
            }}
        >
            <Paper elevation={6} sx={{ height: "100%", width: "100%", position: "relative" }}>
                {!disableDeleteButton &&
                    <CustomBox sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        transform: "translate(50%, -50%)",
                        zIndex: 1000,
                    }}>
                        <CustomButtons
                            infoButtons={[{ type: "delete", action: handleOnDeleteElement, data: children, onlyIcon: true, sx: { fontSize: "22px" } }]}
                        />
                    </CustomBox>
                }
                {children}
            </Paper>
        </CustomBox>
    )
}

export default GridItemContainerFilePreview
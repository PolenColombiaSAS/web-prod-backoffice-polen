import { Fade, Modal, Paper, Backdrop, Box, Divider } from "@mui/material"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import CustomButtons from "../button/CustomButtons";



const CustomModal = forwardRef(({ children, stickyElement, sx, onClose, showButtonCerrar = true, zIndex = 20000 }, ref) =>
{
    const [internalOpen, setInternalOpen] = useState(false);

    useEffect(() =>
    {
        if (!internalOpen)
        {
            if (typeof onClose === "function")
            {
                onClose()
            }
        }

    }, [internalOpen]);
    const handleOnClose = () =>
    {

        setInternalOpen(prev => (false));
    }
    const handleOnOpen = () =>
    {
        if (!internalOpen)
        {
            setInternalOpen(prev => (true));
        }
    }
    useImperativeHandle(ref, () => ({
        openModal: () =>
        {
            handleOnOpen();
        },
        closeModal: () =>
        {
            handleOnClose();
        }
    }));
    return (
        <>
            <Modal
                open={internalOpen}
                onClose={handleOnClose}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"

                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
                sx={{
                    zIndex: zIndex
                }}
            >
                <Fade in={internalOpen}>
                    <Paper
                        elevation={5}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            px: {
                                xs: 1,
                                sm: 2,
                                md: 3,
                                lg: 4,
                                xl: 5,
                            },
                            py: !stickyElement && {
                                xs: 1,
                                sm: 2,
                                md: 3,
                                lg: 4,
                                xl: 5,
                            },
                            maxHeight: "95%",
                            overflow: "auto",
                            minWidth: {
                                xs: '95%',
                                sm: `calc(100%*8/10)`,
                                md: `calc(100%*7/10)`,
                                lg: `calc(100%*6/10)`,
                                xl: `calc(100%*5/10)`,
                            },
                            maxWidth: "95%",
                            ...sx
                        }}
                    >
                        <Box sx={{
                            position: "sticky",
                            top: 0,
                            zIndex: 1100,
                            backgroundColor: "#ffffff",
                            width: "100%",
                        }} >
                            <Box sx={{
                                position: "absolute",
                                top: 0,
                                right: {
                                    xs: -5,
                                    sm: -10,
                                    md: -20,
                                    lg: -30,
                                    xl: -40,
                                },
                                zIndex: 2000
                            }}>
                                {showButtonCerrar && <CustomButtons
                                    infoButtons={[{ type: "cerrar", action: handleOnClose, onlyIcon: true, sx: { color: "#FF5436", backgroundColor: "#FF8975" } }]}
                                />}
                            </Box>
                            {stickyElement}

                            {stickyElement && <Divider />}
                        </Box>
                        {children}
                    </Paper>
                </Fade>
            </Modal>
        </>
    )
})

export default CustomModal
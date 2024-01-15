import { Badge, Box, Button, Divider, Grid, Pagination, Paper, Popper, Stack, TextField, TextareaAutosize, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
const CustomCarrousel = ({ elements = [], elementTopLeft,elementTopCenter, activeIndex = 0, onActualActiveIndex }) => {
    const [internalActiveIndex, setInternalActiveIndex] = useState(activeIndex);
    const [page, setPage] = useState(1);
    const [heightBoxFooter, setheightBoxFooter] = useState(0)



    const footerRef = useRef(null);

    useEffect(() => {
        if (footerRef.current) {
            setheightBoxFooter(footerRef.current.offsetHeight);
        }
    }, [footerRef]);
    useEffect(() => {
        setInternalActiveIndex(activeIndex);
        setPage(activeIndex + 1)
    }, [activeIndex]);

    useEffect(() => {
        if (onActualActiveIndex) {
            onActualActiveIndex(internalActiveIndex)
        }
    }, [internalActiveIndex]);



    const handleChangePagination = (event, value) => {
        setPage(value);
        setInternalActiveIndex(value - 1)
    };
    return (
        <Box
            position="relative"
            sx={{
                width: "100%",
                height: "100%",
                pt:(elementTopCenter|| elementTopLeft)?"55px":0
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    padding: 2,
                    zIndex: 1000,
                }}
            >
               {elementTopLeft}
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: "50%",
                    transform: 'translateX(-50%)',
                    padding: 2,
                    zIndex: 1000,
                }}
            >
               {elementTopCenter}
            </Box>
            <Paper

                elevation={3}
                sx={{
                    height: "100%",
                    width: "100%",
                    p: 1
                }}
            >
                <Stack
                    direction="column"
                    divider={<Divider />}
                    sx={{
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <Box sx={{
                        height: `calc(100% - ${heightBoxFooter}px)`,
                        width: "100%",
                    }} >
                        {elements[internalActiveIndex]}
                    </Box>
                    <Grid
                        ref={footerRef}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ height: 80 }}
                    >
                        <Grid item >
                            <Pagination
                                count={elements.length}
                                shape="rounded"
                                showFirstButton
                                showLastButton
                                page={page}
                                onChange={handleChangePagination}
                                size="large"
                            />
                        </Grid>
                    </Grid>
                </Stack>
            </Paper>
        </Box>
    );
};
export default CustomCarrousel

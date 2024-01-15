import { useState } from "react";
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
const CustomRenderToolbar = (Toolbar) => (
    <Toolbar>
        {(toolbarSlot) => {
            const {
                CurrentPageInput,
                Download,
                EnterFullScreen,
                GoToNextPage,
                GoToPreviousPage,
                NumberOfPages,
                Open,
                Print,
                SwitchTheme,
                Zoom,
                ZoomIn,
                ZoomOut,
            } = toolbarSlot;

            return (
                <div className="rpv-toolbar" role="toolbar" aria-orientation="horizontal">
                    <div className="rpv-toolbar__left">
                        <ZoomOut />
                        <Zoom />
                        <ZoomIn />
                    </div>
                    <div className="rpv-toolbar__center">
                        <GoToPreviousPage />
                        <CurrentPageInput />
                        <NumberOfPages />
                        <GoToNextPage />
                    </div>
                    <div className="rpv-toolbar__right">
                        <Download />
                        <Print />
                    </div>
                </div>
            );
        }}
    </Toolbar>
);


const CustomViewFile = ({ pdfUrl, displayToolbar = true }) => {
    const [viewPdf, setviewPdf] = useState(null);
    useEffect(() => {
        if (pdfUrl) {
            setviewPdf(pdfUrl);
        } else {
            setviewPdf(null);
        }
    }, [pdfUrl]);

    const defaultLayoutPluginInstance = defaultLayoutPlugin(
        {
            renderToolbar: CustomRenderToolbar,
            sidebarTabs: (defaultTabs) => [
                defaultTabs[0], // Thumbnails tab
            ],
        }
    );
    return (
        <>
            <Box sx={{
                height: "100%",
                width: "100%",
            }}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
                    <Box sx={{
                        width: "100%",
                        maxWidth: "970px",
                        height: '100%',
                        margin: "auto",
                    }}>
                        {
                            viewPdf &&
                            <>
                                <Viewer
                                    fileUrl={viewPdf}
                                    plugins={
                                        displayToolbar
                                            ? [defaultLayoutPluginInstance]
                                            : []
                                    }
                                />
                            </>
                        }
                        {
                            !viewPdf &&
                            <>
                                <Typography sx={{ textAlign: "center" }}>No PDF</Typography>
                            </>
                        }
                    </Box>
                </Worker>
            </Box>
        </>
    )
}

export default CustomViewFile;
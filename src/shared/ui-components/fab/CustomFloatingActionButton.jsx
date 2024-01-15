import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Box, Fab, useMediaQuery, useTheme } from '@mui/material';
import CustomBox from '../materialUI/CustomBox';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CustomButtons from '../button/CustomButtons';

const CustomFloatingActionButton = forwardRef(({ customButtonsInfo = [], position = "button-right" }, ref) => {
    const [open, setOpen] = useState(false);
    const [postionSx, setPostionSx] = useState({})

    const theme = useTheme();
    const isDownMdScreen = useMediaQuery(theme.breakpoints.down('md'));
    const floatingActionButtonRef = useRef(null);
    useEffect(() => {
        setOpen(false)
    }, [isDownMdScreen])

    const handleClickOutside = (event) => {
        if (floatingActionButtonRef.current && !floatingActionButtonRef.current.contains(event.target)) {
            setOpen(false); 
        }
    };
    useEffect(() => {
        window.addEventListener('mousedown', handleClickOutside);
        return () => window.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    const closeToggle = () => {
        setOpen(false);
    };

    useImperativeHandle(ref, () => ({
        closeToggle
    }));
    const handleToggle = (e) => {
        e.preventDefault();
        e.stopPropagation()
        setOpen(!open);
    };

    useEffect(() => {
        const breakpointDistances = {
            xs: 16, sm: 24, md: 32, lg: 40, xl: 48
        };
        let positionStyle;

        switch (position) {
            case "button-right":
                positionStyle = {
                    bottom: breakpointDistances,
                    right: breakpointDistances,
                };
                break;
            case "button-left":
                positionStyle = {
                    bottom: breakpointDistances,
                    left: breakpointDistances,
                };
                break;
            case "top-right":
                positionStyle = {
                    top: breakpointDistances,
                    right: breakpointDistances,
                };
                break;
            case "top-left":
                positionStyle = {
                    top: breakpointDistances,
                    left: breakpointDistances,
                };
                break;
            default:
                positionStyle = {
                    bottom: breakpointDistances,
                    right: breakpointDistances,
                };
                break;
        }
        setPostionSx(positionStyle);
    }, [position]);

    const handleOnButtonSelected=()=>{
        closeToggle()
    }
    return (
        <Box 
        ref={floatingActionButtonRef}
        sx={{
            position: 'fixed',
            ...postionSx,
            zIndex: 6000, 
        }}>
            <Fab
                color="primary"
                aria-label="add"
                onClick={handleToggle}

            >
                {!open ? <OpenInFullIcon /> : <CloseFullscreenIcon />}
            </Fab>
            <CustomBox
                hidden={!open}
                sx={{

                    position: "absolute",
                    zIndex: 6000,
                    bottom: "110%",
                    left: '50%',
                    transform: 'translateX(-50%)',
                    height: 'auto',
                    width: 'auto',
                }}
            >
                <>
                   {open&& <CustomButtons
                        direction={"column"}
                        fab={true}
                        infoButtons={customButtonsInfo}
                        onButtonSelected={handleOnButtonSelected}
                    />}
                </>
            </CustomBox>

        </Box>
    );
});

export default CustomFloatingActionButton;


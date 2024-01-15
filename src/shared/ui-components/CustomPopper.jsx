import { Paper, Popper } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import CustomIconButton from './button/CustomIconButton';
import CustomButtonsWithIconsAndLabel from './button/CustomButtonsWithIconsAndLabel';
// import { ClickAwayListener } from '@mui/material';

const CustomPopper = ({
    children,
    iconName,
    open, setOpen,
    popperWidth = 250,
    popperPlacement = "right-start",
    buttonPopperName
}) =>
{

    const [openInterna, setOpenInternal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);


    const popperRef = useRef(null);
    const handleClickOutside = (event) =>
    {
        if (popperRef.current && !popperRef.current.contains(event.target))
        {
            setOpenInternal(false);
        }
    };
    useEffect(() =>
    {
        window.addEventListener('mousedown', handleClickOutside);
        return () => window.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() =>
    {
        if (open !== undefined && setOpen !== undefined)
        {
            setOpenInternal(open);
        }
    }, [open]);

    useEffect(() =>
    {
        if (open !== undefined && setOpen !== undefined)
        {
            setOpen(openInterna);
        }
    }, [openInterna]);

    const handleClick = (event) =>
    {
        if (openInterna)
        {
            setAnchorEl(null);
        } else
        {
            setAnchorEl(event.currentTarget);
        }
        setOpenInternal(!openInterna);
    };

    const handleClose = () =>
    {
        setOpenInternal(false);
        setAnchorEl(null);
    };

    const handleOnClickChildren = (e) => {
        e.preventDefault();
        e.stopPropagation()
    };

    
    return (
        <>
            {
                buttonPopperName
                    ? <CustomButtonsWithIconsAndLabel
                        iconName={iconName}
                        onAction={handleClick}
                        name={buttonPopperName}
                        variant='text'
                    />
                    : <CustomIconButton iconName={iconName} onAction={handleClick} />
            }
            <Popper

                ref={popperRef}
                onMouseDown={(event) => event.stopPropagation()}
                open={openInterna}
                anchorEl={anchorEl}
                onClose={handleClose}
                placement={popperPlacement}
                sx={{ zIndex: 1000 }}
            >
                <Paper onClick={handleOnClickChildren} sx={{ padding: 2, width: popperWidth }}>
                    {children}
                </Paper>
            </Popper>
        </>
    )
}

export default CustomPopper
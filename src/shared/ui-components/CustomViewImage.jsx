import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react';
import CustomButtons from './button/CustomButtons';
const CustomViewImage = ({ previewUrls }) => {
    const [imageScale, setImageScale] = useState(1);

    const handleZoomIn = () => {
        setImageScale((prevScale) => Math.min(prevScale + 0.2, 3));
    };

    const handleZoomOut = () => {
        setImageScale((prevScale) => Math.max(prevScale - 0.2, 0.5));
    };
    useEffect(() => {
        setImageScale(1)
    }, [previewUrls]);

    const buttonsCommunProperties = {
        onlyIcon: true,
        sx: {
            backgroundColor: "rgba(69, 173, 255, 0.5)",
            ':hover': {
                backgroundColor: 'rgba(69, 173, 255)', // Color de fondo al hacer hover
            },
            fontSize: { xs: "16px", sm: "20px", md: "24px", lg: "28px", xl: "32px" }
        },
        toolTipInfo: {}
    }
    const infoButtons = [
        {
            type: "aumentar",
            action: handleZoomIn,
            data: null,
            ...buttonsCommunProperties
        },
        {
            type: "reducir",
            action: handleZoomOut,
            data: null,
            ...buttonsCommunProperties
        },
    ]
    return (

        <Box
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'auto',
                }}
            >
                <img
                    src={previewUrls}
                    alt="Imagen"
                    loading="lazy"
                    style={{
                        transform: `scale(${imageScale})`,
                        transformOrigin: 'top left',
                        maxHeight: '100%',
                        maxWidth: '100%',
                        transition: 'transform 0.2s',
                    }}
                />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}
            >
                <CustomButtons infoButtons={infoButtons} direction={"column"} />
            </Box>
        </Box>
    )
}
export default CustomViewImage



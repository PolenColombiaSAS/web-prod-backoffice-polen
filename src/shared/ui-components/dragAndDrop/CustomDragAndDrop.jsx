import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/material';
import { useDialogContext } from '../../../context/dialog';
import FileRejectionComponent from './FileRejectionComponent';
import dragAndDropThumbStyle from './dragAndDropThumbStyle';
import { v4 as uuidv4 } from 'uuid';
import { getFileNameWithoutExtension } from '../../helper/helper';
import CustomBox from '../materialUI/CustomBox';


const CustomDragAndDrop = forwardRef(({ children, disabledDragAndDrop, onDropEmit }, ref) => {
    const { showDialog } = useDialogContext();
    const [previewUrls, setPreviewUrls] = useState([]);

    const inputRef = useRef();

    const handleOpenDragAndDrop = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };
    useEffect(() => {
        return () => {
            if (previewUrls.length > 0) {
                previewUrls.forEach(element => {
                    URL.revokeObjectURL(element);
                });
            }
        };
    }, [previewUrls]);

    useImperativeHandle(ref, () => ({
        openDragAndDrop: handleOpenDragAndDrop
    }));

    const onDrop = (acceptedFiles) => {
        const objectUrls = acceptedFiles.map(file => {
            const blobURL = URL.createObjectURL(file);
            return ({
                id: uuidv4(),
                file: file,
                nombreArchivo: getFileNameWithoutExtension(file.path),
                type: file.type,
                imageUploaded: false,
                blobURL: blobURL,
                esEditable: true
            })
        });
        onDropEmit(objectUrls);
    }

    const onDropRejected = (rejectedFiles) => {
        const dialogContent = <FileRejectionComponent rejectedFiles={rejectedFiles} />
        showDialog("Archivos Rechazados", dialogContent);
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        isFocused,
        acceptedFiles,
        fileRejections
    } = useDropzone({
        disabled: disabledDragAndDrop,
        onDrop,
        onDropRejected,
        accept: {
            'image/*': [],
            'application/pdf': []
        }
    });

    return (
        <Box
                {...getRootProps()}
                sx={
                    ...dragAndDropThumbStyle({
                isDragAccept,
                isDragReject,
                isFocused,
                previewUrls
            })
                }
            >
            <input {...getInputProps()} ref={inputRef} />

            {children}

        </Box>
    );
});

export default CustomDragAndDrop;

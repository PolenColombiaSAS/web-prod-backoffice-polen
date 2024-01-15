import { Box, Chip, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import alignStyles from '../../styles/alignStyles';
import InitialMessageDragAndDrop from './InitialMessageDragAndDrop';
import GridItemContainerFilePreview from './gridItemFileUpload/GridItemContainerFilePreview';
import GridItemContentFilePreview from './gridItemFileUpload/GridItemContentFilePreview';
import GridItemFormFilePreview from './gridItemFileUpload/GridItemFormFilePreview';
import CustomButtons from '../button/CustomButtons';
import { CustomFieldLabel } from '../CustomFieldLabel';
import { ShowComentarios } from '../../../components/VisualizadorDocumentosProspectoAprobacion/DatosProspectos/ShowComentarios';
import { useDialogContext } from '../../../context/dialog';
import { useAdminLayoutContext } from 'context/adminLayout';
import CustomFloatingActionButton from '../fab/CustomFloatingActionButton';
import CustomModalTitle from '../texto/CustomModalTitle';
import Swal from 'sweetalert2';

const GridFilesPreview = ({
    elements = [],
    onDeleteElement,
    onSubmit,
    tipoDocumentos = [],
    disabledDragAndDrop,
    openDragAndDropFunction,
    onRetroceder,
    onClickDragAndDropInitialMessage,
    onMostrarDocumentosRequeridos,
    buttonsPadre=[]
}) => {

    const [showBtnEnviar, setShowBtnEnviar] = useState(true)

    const { showDialog, hideDialog } = useDialogContext();
    const { register, handleSubmit, setValue, control, formState: { errors }, reset, watch } = useForm({
        defaultValues: {
            dynamicInputs: elements
        }
    });

    const theme = useTheme();
    const isDownMdScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { isOpen } = useAdminLayoutContext();
    const currentValues = watch("dynamicInputs");

    useEffect(() => {
        setShowBtnEnviar(elements.filter(x => !x.imageUploaded).length == 0)

        const updatedValues = []
        elements.forEach(element => {
            const matchingValue = currentValues.find(cv => cv.id === element.id);
            if (matchingValue) {
                updatedValues.push(matchingValue)
                const dataInput = currentValues[element.id]
                if (dataInput) {
                    updatedValues[element.id] = dataInput
                }
            } else {
                updatedValues.push(element)
            }
        });
        reset({ dynamicInputs: updatedValues });
    }, [elements]);

    const onSubmitInternal = (data, typeSubmit) => {
        if (onSubmit) {
            onSubmit({
                typeSubmit: typeSubmit,
                data: data
            })
        }
    };
    const handleClickDragAndDropInitialMessage = () => {
        if (typeof onClickDragAndDropInitialMessage === "function") {
            onClickDragAndDropInitialMessage()
        }
    }
    const showComentarios = (comentarios) => {
        const dialogTitle = <CustomModalTitle iconName="Comment" iconSize="large" title={`Historico de Comentarios`} />
        const dialogContent = <ShowComentarios comentarios={comentarios} />

        showDialog(
            dialogTitle,
            dialogContent,
            null
        );
    }
    const handleAddNewElement = () => {
        if (typeof openDragAndDropFunction === "function") {
            openDragAndDropFunction()
        }
    };
    const handleRetroceder = async () => {
        if (elements.length > 0 && elements.some(x => !x.imageUploaded)) {

            const responseSwal = await Swal.fire({
                title: "Hay cambios que faltan guardar; Deseas retroceder?",
                icon: "question",
                showCancelButton: true,
                cancelButtonText: "No",
                cancelButtonColor: "#d33",

                confirmButtonColor: "#3085d6",
                confirmButtonText: "Si",
                customClass: {
                    container: 'custom-zindex-swal-container'
                }
            })

            if (!responseSwal?.isConfirmed) {
                return
            }
        }
        if (typeof onRetroceder === "function") {
            onRetroceder()
        }
    }
    const handleMostrarDocumentosRequeridos = async () => {
        if (typeof onMostrarDocumentosRequeridos === "function") {
            onMostrarDocumentosRequeridos()
        }
    }
    const buttonCommonProperty = isDownMdScreen ? {
        onlyIcon: true,
        toolTipInfo: { placement: "left", open: true },
    } : {}

    const customButtonsInfo = [
        (isDownMdScreen && !disabledDragAndDrop) && {
            type: "add",
            action: handleAddNewElement,
            data: null,
            sx: { backgroundColor: "red" },
            ...buttonCommonProperty
        },
        (!disabledDragAndDrop && elements.length > 0) && {
            type: "upload",
            action: (data) => { handleSubmit((form) => { onSubmitInternal(form, data) })() },
            data: 1,
            sx: isDownMdScreen && { backgroundColor: "red" },
            ...buttonCommonProperty
        },
        (!disabledDragAndDrop && elements.length > 0 && elements.every(x => x.imageUploaded)) && {
            type: "enviar",
            action: (data) => { handleSubmit((form) => { onSubmitInternal(form, data) })() },
            data: 2,
            sx: isDownMdScreen && { backgroundColor: "red" },
            disabled: !showBtnEnviar,
            ...buttonCommonProperty
        },
        ...(isDownMdScreen ? buttonsPadre : [])
    ]

    return (
        <>
            {(isDownMdScreen) &&
                <CustomFloatingActionButton
                    position={"button-left"}
                    customButtonsInfo={customButtonsInfo}
                />
            }
            <form style={{ width: "100%", height: "100%" }}>

                <Grid container spacing={2}>
                    {elements.length >= 0 && elements.map((element, index) => {
                        return (
                            <Grid
                                item
                                key={element.id}
                                xs={12} sm={12} md={isOpen ? 12 : 6} lg={isOpen ? 6 : 4} xl={isOpen ? 4 : 3}
                            >
                                <GridItemContentFilePreview
                                    disableDeleteButton={disabledDragAndDrop || element?.estado?.id.toLowerCase()=="3b8341ee-95f8-42e0-ae28-a42f469ea8dd".toLowerCase()}
                                    onDelete={() => { onDeleteElement(element) }}
                                    imageUploaded={element.imageUploaded}
                                    showButtonDelete={element.esEditable}
                                >
                                    {
                                        element?.estado &&
                                        <Chip
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                zIndex: 1000,
                                            }}
                                            label={`${element?.estado?.descripcion}`}
                                            color={element?.estado?.color}
                                        />
                                    }
                                    <Box sx={{ height: "300px", p: 1 }}>
                                        {element.element}
                                    </Box>
                                    <Divider />
                                    
                                    <GridItemFormFilePreview
                                        control={control}
                                        errors={errors}
                                        setValue={setValue}
                                        nombreArchivo={element.nombreArchivo}
                                        elementId={element.id}
                                        disabled={!element.esEditable}
                                        tipoDocumentos={tipoDocumentos}
                                        idTipoDocumento={element.idTipoDocumento}
                                    />
                                    {
                                        element?.comentarios?.length > 0 &&
                                        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                                            <Box sx={{ width: "250px" }}>
                                                <CustomFieldLabel fieldData={"Ver Comentarios anteriores"} iconName={"WarningAmber"} onClick={() => { showComentarios(element?.comentarios) }} />
                                            </Box>
                                        </Box>
                                    }
                                </GridItemContentFilePreview>
                            </Grid>
                        )
                    })}
                    {(
                        (!disabledDragAndDrop)
                        &&
                        (
                            (elements?.length == 0 && isDownMdScreen) ||
                            (!isDownMdScreen)
                        )
                    ) &&
                        <Grid
                            item
                            xs={12} sm={12} md={isOpen ? 12 : 6} lg={isOpen ? 6 : 4} xl={isOpen ? 4 : 3}
                        >
                            <GridItemContainerFilePreview disableDeleteButton={true}>
                                <Box
                                    onClick={handleClickDragAndDropInitialMessage}
                                    sx={{ ...alignStyles.centeredContentStyles, height: "100%" }}>
                                    <InitialMessageDragAndDrop />
                                </Box>
                            </GridItemContainerFilePreview>
                        </Grid>
                    }
                    {(!disabledDragAndDrop && !isDownMdScreen) &&
                        <Grid
                            item
                            xs={12}
                        >
                            <CustomButtons
                                infoButtons={customButtonsInfo}
                            />
                        </Grid>
                    }
                </Grid>
            </form>
        </>
    );
};

export default GridFilesPreview 
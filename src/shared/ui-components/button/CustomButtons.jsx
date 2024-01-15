import { Box, Grid, Tooltip } from "@mui/material";
import CustomButtonsWithIconsAndLabel from "./CustomButtonsWithIconsAndLabel";
import CustomIconButton from "./CustomIconButton";
import CustomFabButton from "./CustomFabButton";
import { useEffect, useState } from "react";

const buttonConfigs = {
    applyFilter: { iconName: "FilterAlt", color: "warning", label: "Aplicar Filtro" },
    add: { iconName: "Add", color: "info", label: "Agregar" },
    save: { iconName: "Save", color: "info", label: "Guardar" },
    upload: { iconName: "CloudUpload", color: "info", label: "Cargar" },
    reset: { iconName: "Restore", color: "warning", label: "Restablecer" },
    confirm: { iconName: "Check", color: "success", label: "Confirmar" },
    cancel: { iconName: "Close", color: "error", label: "Cancelar" },
    cerrar: { iconName: "Close", color: "primary", label: "Cerrar" },
    edit: { iconName: "Edit", color: "secondary", label: "Editar" },
    view: { iconName: "Visibility", color: "primary", label: "Ver" },
    delete: { iconName: "Delete", color: "error", label: "Eliminar" },
    aprobar: { iconName: "Check", color: "success", label: "Aprobar" },
    rechazar: { iconName: "Close", color: "error", label: "Rechazar" },
    observar: { iconName: "ReportProblem", color: "warning", label: "Observar" },
    aumentar: { iconName: "ZoomIn", color: "primary", label: "Zoom In" },
    reducir: { iconName: "ZoomOut", color: "primary", label: "Zoom Out" },
    enviar: { iconName: "Send", color: "primary", label: "Enviar" },
    procesar: { iconName: "MiscellaneousServices", color: "info", label: "Procesar" },
    revisar: { iconName: "Grading", color: "info", label: "Revisar" },
    retroceder: { iconName: "ArrowBack", color: "info", label: "Retroceder" },
    back: { iconName: "SkipPrevious", color: "info", label: "atras" },
    startReview: { iconName: "PlayCircleFilledWhite", color: "primary", label: "Empezar Revision" },
    goTo: { iconName: "NavigateNext", color: "info", label: "Navegar" },
    goTo2: { iconName: "ArrowForward", color: "primary", label: "Navegar" },
    goTo3: { iconName: "ArrowCircleRight", color: "primary", label: "Navegar" },

    goToProformaForm: { iconName: "Description", color: "info", label: "Navegar" },
    goToUploadDocumento: { iconName: "CloudUpload", color: "primary", label: "Navegar" },
    goToDatosParaLaVenta: { iconName: "TextIncrease", color: "primary", label: "Navegar" },

    next: { iconName: "SkipNext", color: "primary", label: "Siguiente" },
    finish: { iconName: "Done", color: "primary", label: "Terminar" },
    codigoPago: { iconName: "Telegram", color: "primary", label: "Codigo Pago" },
    documentosPendientesDeCarga: { iconName: "ContentPaste", color: "primary", label: "Documentos Pendiente" },
    devolver: { iconName: "AssignmentReturn", color: "warning", label: "Devolver" },
    devolver: { iconName: "AssignmentReturn", color: "warning", label: "Devolver" },
    info: { iconName: "Info", color: "info", label: "Información" },
    addDocument: { iconName: "BookmarkAdd", color: "warning", label: "Solicitar Documentos" },
    descartar: { iconName: "FolderDelete", color: "error", label: "Descartar" },
    calendar: { iconName: "CalendarMonth", color: "primary", label: "Calendario" },
    descargar: { iconName: "Download", color: "primary", label: "Descargar" },

};

const IconButtonWithAction = ({ info, config, type, fab, onButtonSelected }) =>
{

    const handleOnButtonSelected = (event) =>
    {
        // event.preventDefault();
        event.stopPropagation()
        if (typeof onButtonSelected === "function")
        {
            onButtonSelected()
        }
        if (info.action)
        {
            info.action(info.data)
        }
    }

    if (fab)
    {
        return (<CustomFabButton
            iconName={config.iconName}
            disabled={info.disabled}
            size={info.size}
            color={info.color ? info.color : config.color}
            onAction={(event) =>
            {
                handleOnButtonSelected(event)
            }}
            sx={info.sx}
            type={type}
        />)

    }
    return (
        <>
            {info.onlyIcon
                ? (<CustomIconButton
                    iconName={config.iconName}
                    disabled={info.disabled}
                    size={info.size}
                    color={info.color ? info.color : config.color}
                    onAction={(event) =>
                    {
                        handleOnButtonSelected(event)
                    }}
                    sx={info.sx}
                    type={type}
                />)
                : (<CustomButtonsWithIconsAndLabel
                    name={config.label}
                    iconName={config.iconName}
                    variant={info.variant}
                    disabled={info.disabled}
                    color={info.color ? info.color : config.color}
                    onAction={(event) =>
                    {
                        handleOnButtonSelected(event)
                    }}
                    sx={info.sx}
                    type={type}
                />)
            }
        </>
    )
}

const CustomButtons = ({
    infoButtons = [],
    sx,
    direction = "row",
    justifyContent = "center",
    alignItems = "center",
    type = "button",
    fab = false,
    onButtonSelected
}) =>
{

    return (
        <Grid
            container
            spacing={1}
            justifyContent={justifyContent}
            alignItems={alignItems}
            direction={direction}
            sx={sx}
        >
            {infoButtons.map((info, index) =>
            {
                const [showTooltip, setShowTooltip] = useState(false);
                const [placement, setPlacement] = useState("top");
                useEffect(() =>
                {
                    if (info?.toolTipInfo?.placement)
                    {
                        const toolTipPlacement = ["top", "top-start", "top-end",
                            "left-start", "left", "left-end",
                            "right-start", "right", "right-end",
                            "bottom-start", "bottom", "bottom-end"]

                        const placement = toolTipPlacement.includes(info.toolTipInfo?.placement) ? info.toolTipInfo?.placement : "top"
                        setPlacement(placement)
                    }

                    if (info?.toolTipInfo?.open)
                    {
                        let timeout;
                        if (info.toolTipInfo?.open)
                        {
                            setShowTooltip(true);
                            timeout = setTimeout(() =>
                            {
                                setShowTooltip(false);
                            }, 1200);
                        }
                        return () =>
                        {
                            if (timeout)
                            {
                                clearTimeout(timeout);
                            }
                        };
                    }
                }, [info?.toolTipInfo]);

                const config = buttonConfigs[info?.type]
                if (!config)
                {
                    return null
                }

                return (
                    <Grid item key={index} onClick={(e) =>
                    {
                        e.preventDefault();
                        e.stopPropagation()
                    }}>
                        {
                            info.toolTipInfo
                                ?
                                <Tooltip
                                    title={info.toolTipInfo?.title ? info.toolTipInfo?.title : config.label}
                                    placement={placement}
                                    open={showTooltip}
                                    sx={{ zIndex: 10000 }}
                                >
                                    <Box onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
                                        <IconButtonWithAction
                                            info={info}
                                            config={config}
                                            type={info?.buttonType || type}
                                            fab={fab}
                                            onButtonSelected={onButtonSelected}
                                        />
                                    </Box>
                                </Tooltip>
                                :
                                <IconButtonWithAction
                                    info={info}
                                    config={config}
                                    type={info?.buttonType || type}
                                    fab={fab}
                                    onButtonSelected={onButtonSelected}
                                />
                        }
                    </Grid>
                )
            })}
        </Grid>
    )
}
export default CustomButtons;


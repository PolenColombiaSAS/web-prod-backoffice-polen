import { useMediaQuery, useTheme } from "@mui/material";
import UseFileApi from "api/UseFileApi";
import UseIntegracionSistemaLegacyApi from "api/UseIntegracionSistemaLegacyApi";
import UseProspectoApi from "api/UseProspectoApi";
import UseTipoDocumento from "api/UseTipoDocumento";
import UseUtilitariosApi from "api/UseUtilitariosApi";
import { useAuthContext } from "context/auth";
import { useDialogContext } from "context/dialog";
import { useLoadingContext } from "context/loading";
import { useSnackBarContext } from "context/snackBar";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import CustomViewFile from "../CustomViewFile";
import CustomViewImage from "../CustomViewImage";
import CustomModalTitle from "../texto/CustomModalTitle";
import CustomTypographyParagraph from "../texto/customTypography/CustomTypographyParagraph";
import CustomButtons from "../button/CustomButtons";
import CustomTypographyTitleModal from "../texto/customTypography/CustomTypographyTitleModal";
import CustomBox from "../materialUI/CustomBox";
import CustomTitle from "../texto/CustomTitle";
import { CustomGUID } from "../CustomGUID";
import DatosProspecto from "@/components/VisualizadorDocumentosProspectoAprobacion/DatosProspectos/DatosProspecto";
import CustomFileUpload from "./CustomFileUpload";
import CustomFloatingActionButton from "../fab/CustomFloatingActionButton";
import NoHabilitadoLaCargaDeDocumentos from "@/components/VisualizadorDocumentosProspectoCarga/NoHabilitadoLaCargaDeDocumentos";
import { ProspectoDocumentosEstadoEnum } from "shared/Enum/ProspectoDocumentosEstadoEnum";
import { EnviarAprobacionForm } from "./EnviarAprobacionForm";

 

const VisualizadorDocumentosProspectoCargaContainer = () => {

  const useTipoDocumento = UseTipoDocumento();
  const useFileApi = UseFileApi();
  const useIntegracionSistemaLegacyApi = UseIntegracionSistemaLegacyApi();
  const useProspectoApi = UseProspectoApi();
  const useUtilitariosApi = UseUtilitariosApi();
  const { loading, showLoading, hideLoading } = useLoadingContext();
  const { showDialog, hideDialog } = useDialogContext();
  const { openSnackBar } = useSnackBarContext();
  const { user } = useAuthContext();

  const [tipoDocumentos, settipoDocumentos] = useState([]);
  const [agrupadoTipoDocumentos, setAgrupadoTipoDocumentos] = useState([]);
  const [prospecto, setProspecto] = useState(null)
  const [vendedor, setVendedor] = useState(null)
  const [elements, setelements] = useState([])
  const [blobFiles, setblobFiles] = useState([])
  const [disabledDragAndDrop, setDisabledDragAndDrop] = useState(false)
  const [elementRemoved, setelementRemoved] = useState(null)
  const [asociado, setAsociado] = useState(null)
  const [metaData, setMetaData] = useState([])
  const [agrupadoProformaAprobada, setAgrupadoProformaAprobada] = useState(null)

  const router = useRouter();
  const { idProspecto } = router.query;

  const formComentario = useRef()


  const theme = useTheme();
  const isDownMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const initialized = useRef(false);
  useEffect(() => {
    if (idProspecto && user && !initialized.current) {
      initialized.current = true;
      ObtenerInformacionDeDocumentosDelProspecto();
    }
  }, [idProspecto, user]);
  useEffect(() => {
    setelements(blobFiles.map((blobFile, i) => {
      return {
        ...blobFile,
        element: blobFile.type === "application/pdf"
          ? <CustomViewFile pdfUrl={blobFile.blobURL} displayToolbar={false} key={i} />
          : <CustomViewImage previewUrls={blobFile.blobURL} key={i} />
      }
    }))
  }, [blobFiles]);
  useEffect(() => {
    const disabledDragAndDrop = ![
      ProspectoDocumentosEstadoEnum.PendienteDeCarga,
      ProspectoDocumentosEstadoEnum.Devuelto,
      ProspectoDocumentosEstadoEnum.AprobadoConObservacion
    ].includes(prospecto?.estadoDocumentoProspecto?.id?.toUpperCase())
    setDisabledDragAndDrop(disabledDragAndDrop)
    if (prospecto?.documentoVendedor && vendedor == null) {
      ObtenerVendedorConectado(prospecto?.documentoVendedor)
    }
  }, [prospecto])

  const ObtenerVendedorConectado = async (vendedorDNI) => {
    try {
      showLoading();
      const [vendedor] = await Promise.all([
        useIntegracionSistemaLegacyApi.getVendedorPorDNI(vendedorDNI)
      ]);
      setVendedor(vendedor)
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      hideLoading();
    }
  };
  const ObtenerInformacionDeDocumentosDelProspecto = async () => {
    try {
      showLoading();
      const [agrupadoTipoDocumento, files, prospecto, asociado, metaData, agrupadoProformaAprobada] = await Promise.all([
        useTipoDocumento.getDocumentosRequeridosPorProspecto(idProspecto),
        useProspectoApi.getFilePorIdProspecto(idProspecto),
        useProspectoApi.getProspectoById(idProspecto),
        useProspectoApi.getAsociadoByIdProspecto(idProspecto),
        useProspectoApi.getMetaDataprospecto(idProspecto),
        useProspectoApi.geAgrupadoProformasAprobada(idProspecto)
      ]);
      const blobFiles = await Promise.all(files.map(file => useUtilitariosApi.obtenerDocumento(file)));
      const tipoDocumento = []
      agrupadoTipoDocumento.forEach(x => {
        tipoDocumento.push(...x.tipoDocumento)
      });


      setblobFiles(
        blobFiles.map(blob => {
          const contentType = blob.blob.headers["content-type"];
          const objectURL = URL.createObjectURL(blob.blob.data);
          return ({
            ...blob,
            imageUploaded: true,
            blobURL: objectURL,
            type: contentType
          })
        })
      )
      setMetaData(metaData)
      setAsociado(asociado)
      setAgrupadoProformaAprobada(agrupadoProformaAprobada)
      setProspecto(prospecto)
      settipoDocumentos(tipoDocumento);
      setAgrupadoTipoDocumentos(agrupadoTipoDocumento)
      documentoRequeridosSweetAlert(agrupadoTipoDocumento)
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      hideLoading();
    }
  };
  const handleUploadImage = (archivos) => {
    const dialogTitle = <CustomModalTitle iconName="CloudUpload" iconSize="large" title={`Subir Archivo - Confirmación`} />
    const dialogContent = <CustomTypographyParagraph>{`¿Está seguro de que desea subir ${archivos.length > 0 ? "los archivos" : "el archivo"} al almacenamiento?`}</CustomTypographyParagraph>

    const infoButtons = [
      { type: "confirm", action: handleUploadFile, data: archivos, onlyIcon: false, },
      { type: "cancel", action: hideDialog, data: null, onlyIcon: false, }
    ]
    const dialogButtons = <CustomButtons infoButtons={infoButtons} />
    showDialog(
      dialogTitle,
      dialogContent,
      dialogButtons
    );
  }
  const handleSendForApproval = (archivos) => {
    const dialogTitle = <CustomModalTitle iconName="CloudUpload" iconSize="large" title={`Enviar a Aprobación`} />

    const dialogContent =
      <>
        <CustomTypographyParagraph >{`Desea agregar un comentario?`}</CustomTypographyParagraph>
        <EnviarAprobacionForm ref={formComentario} />
      </>
    const infoButtons = [
      { type: "confirm", action: onBtnConfirmSendForApproval, data: archivos, onlyIcon: false, },
      { type: "cancel", action: hideDialog, data: null, onlyIcon: false, }
    ]
    const dialogButtons = <CustomButtons infoButtons={infoButtons} type="submit" />
    showDialog(
      dialogTitle,
      dialogContent,
      dialogButtons
    );
  }
  const onBtnConfirmSendForApproval = (archivo) => {
    if (formComentario?.current) {
      formComentario.current.submitForm(handleFormSubmit, archivo);
    }
  };
  const handleFormSubmit = async (formData, archivo) => {
    try {
      showLoading();
      hideDialog()
      const [responseEnviadoAprobacion] = await Promise.all([
        useProspectoApi.enviarAprobacionDocumento(idProspecto, formData.comentario),
      ]);
      if (responseEnviadoAprobacion.success) {
        await ObtenerInformacionDeDocumentosDelProspecto()
        openSnackBar('success', 'El envio a aprobación ha sido exitosa!')
      } else {
        openSnackBar('error', 'Error al enviar a aprobación!')
        const titulo = <CustomTypographyTitleModal sx={{ color: "red" }}>{responseEnviadoAprobacion.message}</CustomTypographyTitleModal>
        documentoRequeridosSweetAlert(responseEnviadoAprobacion.data, null, titulo)

      }
    } catch (error) {
      openSnackBar('error', 'Error al enviar a aprobación!')
    } finally {
      hideLoading();
    }
  };


  const handleUploadFile = async (archivos) => {
    const filesUpload = archivos.dynamicInputs.map(x => {
      return {
        ...x,
        nombreArchivo: archivos.dynamicInputs[x.id]?.nombreArchivo,
        idTipoDocumento: archivos.dynamicInputs[x.id]?.tipoDocumento,
      }
    })
    try {
      showLoading();
      hideDialog()
      const filesToCreate = filesUpload.filter(files => !files.imageUploaded);
      const filesToUpdate = filesUpload.filter(files => files.imageUploaded);
      const uploadPromises = filesToCreate.map(file => {
        return useFileApi.uploadDocumento(file.file, idProspecto, file.idTipoDocumento, file.nombreArchivo);
      });
      const updatePromises = filesToUpdate.map(file => {
        return useFileApi.actualizarDocumento(file.id, file.idTipoDocumento, file.nombreArchivo);
      });
      const allPromises = [...uploadPromises, ...updatePromises];

      if (allPromises.length > 0) {
        const responses = await Promise.all(allPromises);
      }
      await ObtenerInformacionDeDocumentosDelProspecto()

      openSnackBar('success', 'La Subida de archivo ha sido exitosa!')
    } catch (error) {
      openSnackBar('error', 'Error al subir los archivos al Storage!')
      console.error("Error: ", error);
    } finally {
      hideLoading();
    }
  };
  const handleDeleteImage = (element) => {
    if (!element.imageUploaded) {
      setelementRemoved(element)
      return
    }
    const dialogTitle = <CustomModalTitle iconName="Delete" iconSize="large" title={`Eliminar - Confirmación`} />
    const dialogContent = <CustomTypographyParagraph>{`¿Está seguro de que desea eliminar archivo '${element.nombreArchivo}' de la cuenta de almacenamiento?`}</CustomTypographyParagraph>

    const infoButtons = [
      { type: "confirm", action: onDeleteFile, data: element, onlyIcon: false, },
      { type: "cancel", action: hideDialog, data: null, onlyIcon: false, }
    ]
    const dialogButtons = <CustomButtons infoButtons={infoButtons} />
    showDialog(
      dialogTitle,
      dialogContent,
      dialogButtons
    );
  }
  const onDeleteFile = async (element) => {
    try {
      showLoading();
      hideDialog()

      const response = await useFileApi.eliminarDocumento(element.id, idProspecto)
      if (!response) {
        throw new Error("No se pudo eliminar el documento, la respuesta es nula");
      }
      setelementRemoved(element)
      openSnackBar('success', 'La eliminación de archivo ha sido exitosa!')
    } catch (error) {
      openSnackBar('error', "Error al eliminar el archivo")
      console.error("Error: ", error.message);
    } finally {
      hideLoading();
    }
  }
  const handleRetroceder = (row) => {
    router.push(`/admin/prospecto?prospectoId=${idProspecto}`);
  }
  const handleMostrarDocumentosRequeridos = () => {
    documentoRequeridosSweetAlert(agrupadoTipoDocumentos)
  }
  const titleButtons = [
    {
      type: "retroceder",
      action: handleRetroceder,
      onlyIcon: isDownMdScreen ? true : false,
      toolTipInfo: isDownMdScreen && { placement: "left", open: true },
    },
    {
      type: "documentosPendientesDeCarga",
      action: handleMostrarDocumentosRequeridos,
      data: null,
      onlyIcon: true,
      sx: isDownMdScreen && { backgroundColor: "#00008B" },
      toolTipInfo: isDownMdScreen && { placement: "left", open: true },
    }
  ]
  const customButtonsInfo = [
    isDownMdScreen && {
      type: "documentosPendientesDeCarga",
      action: handleMostrarDocumentosRequeridos,
      data: null,
      sx: { backgroundColor: "#00008B" },
      onlyIcon: true,
      toolTipInfo: { placement: "left", open: true },
    }
  ]

  return (
    <>

      <CustomBox sx={{
        maxWidth: "1850px",
        m: "auto"
      }}>

        <CustomTitle
          iconName="FilePresent"
          title={`Digitalización de documentos`}
          subTitle={<CustomGUID id={`${idProspecto}`} />}
          buttons={
            !isDownMdScreen
              ? <CustomButtons
                justifyContent="right"
                infoButtons={titleButtons}
                type="submit" />
              : null
          }
        />
        {
          prospecto &&
          <DatosProspecto
            codigo={idProspecto}
            clienteNombre={`${asociado?.nombres || ""} ${asociado?.apellidos || ""}`}
            clienteTelefono={asociado?.telefonos?.filter(telf => telf?.esPrincipal)[0]?.telefono || ""}
            clienteCorreo={asociado?.emails?.filter(email => email?.esPrincipal)[0]?.email || ""}
            fechaCreacion={prospecto?.fechaCreacion}
            comentarios={prospecto?.comentarios || []}
            estado={prospecto?.estadoDocumentoProspecto}
            codigoVendedor={vendedor?.id || ""}
            nombreVendedor={vendedor?.nombre || ""}
            origen={metaData?.find(objeto => objeto?.key?.toUpperCase() === 'origenString'?.toUpperCase())?.value || ""}
            linea={prospecto?.linea || ""}
          />
        }
        {
          agrupadoProformaAprobada
            ? <CustomFileUpload
              disabledDragAndDrop={disabledDragAndDrop}
              uploadedDocuments={elements}
              tipoDocumentos={tipoDocumentos}
              onSendForApproval={handleSendForApproval}
              onUploadFiles={handleUploadImage}
              handleOnDeleteElement={handleDeleteImage}
              elementRemoved={elementRemoved}
              buttonsPadre={titleButtons}
            />
            : <>
              {(isDownMdScreen) &&
                <CustomFloatingActionButton
                  position={"button-right"}
                  customButtonsInfo={customButtonsInfo}
                />
              }
              <NoHabilitadoLaCargaDeDocumentos />
            </>
        }
      </CustomBox>
    </>
  );
};

export default VisualizadorDocumentosProspectoCargaContainer;
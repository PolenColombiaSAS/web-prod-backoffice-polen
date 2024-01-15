import { useEffect, useRef, useState } from "react"
import { Button, Divider, Grid, } from "@mui/material";
import Swal from 'sweetalert2';
import FormOnly from "shared/ui-components/controles/form/types/FormOnly";
import { formConfigFile } from "./agendaConfigFile";
import CustomModalTitle from "shared/ui-components/texto/CustomModalTitle";
import CustomButtons from "shared/ui-components/button/CustomButtons";
import { emptyValues, objectToQueryParams } from "shared/ui-components/controles/form/formularioUtils";
import UseReporte from "api/UseReporte";
import { useLoadingContext } from "context/loading";


const ReporteContainer = ({ }) => {

    const formRef = useRef(null);
    const [internalFormConfig, setInternalFromConfig] = useState([])
    const [internalFormData, setInternalFormData] = useState({})
    const useReporte = UseReporte()
    const [isEdit, setIsEdit] = useState(false)
    const { loading, showLoading, hideLoading } = useLoadingContext();
    const [reporteData, setReporteData] = useState([])

    useEffect(() => {
        if (typeof onMounted === "function") {
            onMounted(true)
        }
        return () => {
            if (typeof onMounted === "function") {
                onMounted(false)
            }
        };
    }, []);

    useEffect(() => {
        const formConfig = formConfigFile(new Date())
        setInternalFromConfig(formConfig)
    }, []);


    const handleOnSubmit = async (type) => {
        if (formRef?.current) {
            const isValidForm = await new Promise((resolve) => formRef.current.submit(resolve));
            if (!isValidForm.isValid) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error en la validacion, revisar!",
                    customClass: {
                        container: 'custom-zindex-swal-container'
                    }
                })
                return
            }
            const form = isValidForm.form
            const requestDTO = {
                ven_gercod: form.gerente,
                ven_gescod: form.gestor,
                ven_supcod: form.director,
                ven_cod: form.asesor,

                states: form.estado,
                medio: form.medio,
                prioridad: form.prioridad,

                start_at: form.fechaInicio,
                end_at: form.fechaFinal
            }

            console.log("requestDTO", requestDTO);
            const parameters = emptyValues(requestDTO);
            console.log("parameters", parameters);
            const queryParams = objectToQueryParams(parameters)
            console.log("queryParams", queryParams);
            console.log("type", type);
            switch (type) {
                case 1:
                    await ObtenerReporte(queryParams)
                    break;
                case 2:
                    await DescargarReporte(queryParams)
                    break;
                default:
                    break;
            }
        }
    }
    const ObtenerReporte = async (queryParams) => {
        try {
            showLoading();
            const [reporte] = await Promise.all([
                useReporte.getReporte1(queryParams)
            ]);
            if (Array.isArray(reporte?.data)) {
                console.log("reporte", reporte);
                setReporteData(reporte.data)
            }
        } catch (error) {
            console.error("Error: ", error);
        } finally {
            hideLoading();
        }
    }
    const DescargarReporte = async (queryParams) => {
        try {
            showLoading();
            const [response] = await Promise.all([
                useReporte.downloadReporte1(queryParams)
            ]);
            console.log("response", response);
            if (response) {
                // Crear un URL para el Blob
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'reporte.xlsx'); // Nombre del archivo
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url); // Limpia el recurso de URL
                link.remove();
            }
        } catch (error) {
            console.error("Error: ", error);
        } finally {
            hideLoading();
        }
    }

    const handleOnChange = (data) => {
        // console.log("handleOnChange", data);
    }
    const handleOnCancel = () => {
        if (typeof onCancel === "function") {
            onCancel()
        }
    }


    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <CustomModalTitle iconName="Schedule" title={"Reporte de prospectos por vendedor activos en el app"} />
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Grid container rowSpacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <FormOnly
                            ref={formRef}
                            formConfig={internalFormConfig}
                            // onSubmit={handleOnSubmit}
                            onChange={handleOnChange}
                            formData={internalFormData}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <CustomButtons infoButtons={[
                    // { type: "reset", action: handleOnCancel, },
                    // { type: "procesar", action: handleOnSubmit,data:1, variant: "contained" },
                    { type: "descargar", action: (event) => { handleOnSubmit(2) }, variant: "contained" },
                ]}
                    justifyContent={"end"}
                />
            </Grid>
        </Grid>
    )
}

export default ReporteContainer;
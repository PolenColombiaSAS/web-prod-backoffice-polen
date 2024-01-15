import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import ShowForm from "../ShowForm";
import { asignarOpcionesAFormConfig, obtenerApisDeSelect, setFormDataFromObject } from "../formularioUtils";
import CustomTitle from "shared/ui-components/texto/CustomTitle";
import CustomButtons from "shared/ui-components/button/CustomButtons";
import { useLoadingContext } from "context/loading";
import Swal from 'sweetalert2';
import UseApi from "api/UseApi";


const FormSimple = forwardRef(({
    formConfig = [],
    formData,
    onSubmit,
    titleData,
    showButton = true,
    onChange
}, ref) => {
    const [internalFormConfig, setinternalFormConfig] = useState([])

    const { register, control, handleSubmit, watch, formState: { errors, isValid }, reset, trigger, resetField, setValue, getValues } = useForm()

    const { loading, showLoading, hideLoading } = useLoadingContext();
    const useHookApi = UseApi();

    useEffect(() => {
        if (formData && formConfig) {
            setFormDataFromObject(formData, setValue, formConfig)
            reset(getValues());
        }
    }, [formData, formConfig]);

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (type === 'change') {
                handleOnChange({
                    fieldChange: name,
                    valores: {...getValues()}
                })
            }
        });
        return () => subscription.unsubscribe();
    }, [formData]);

    useEffect(() => {
        ObtenerInformacion(formConfig)
    }, [formConfig]);


    const ObtenerInformacion = async (formConfig) => {
        const urls = obtenerApisDeSelect(formConfig) || []
        try {
            showLoading();

            const respuestas = await Promise.all(urls.map(url => useHookApi.getWithUrl(url)));
            const formConfigActualizado = asignarOpcionesAFormConfig(formConfig, respuestas.map(x=>x.data), urls);
            setinternalFormConfig(formConfigActualizado);

        } catch (error) {
            console.error("Error: ", error);
        } finally {
            hideLoading();
        }
    }


    const handleOnSubmit = async (form) => {
        if (typeof onSubmit === "function") {
            onSubmit(form)
        }
    }
    const handleOnChange = (data) => {
        if (typeof onChange === "function") {
            onChange(data)
        }

    }

    const handleProcessFormSubmit = async () => {
        const isFormValid = await trigger();
        handleSubmit((form) => { handleOnSubmit(form) })()
        if (!isFormValid) {
            const errorFields = Object.keys(errors).reduce((acc, key) => {
                acc[key] = errors[key]?.message || 'Invalid value';
                return acc;
            }, {});
            Swal.fire({
                icon: "error",
                title: "Validación Fallida",
                text: "Por favor, revise los campos marcados y complete la información correctamente.",
                customClass: {
                    container: 'custom-zindex-swal-container'
                }
            })
            console.log('====================================');
            console.log("errorFields", errorFields);
            console.log('====================================');
            return errorFields;
        }
        return null
    };


    useImperativeHandle(ref, () => ({
        submit: () => {
            handleProcessFormSubmit();
        },
    }));

    const customButtonsInfo = [
        internalFormConfig.length > 0
        && {
            type: "procesar",
            action: async () => {
                await handleProcessFormSubmit()
            },
        },

    ]
    return (
        <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} rowSpacing={2}>
            {titleData && <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                <CustomTitle
                    iconName={titleData.icon || "Article"}
                    title={titleData.title || "Titulo Defecto"}
                    buttons={(titleData.buttons && showButton) ?
                        <CustomButtons
                            justifyContent="right"
                            infoButtons={[...titleData.buttons, ...customButtonsInfo]}
                            type="submit" /> : null}
                />
            </Grid>}
            <Grid item xs={12}>
                <ShowForm
                    errors={errors}
                    control={control}
                    watch={watch}
                    setValue={setValue}
                    resetField={resetField}
                    formData={formData}
                    seccionFormulario={internalFormConfig}
                />
            </Grid>
            {showButton && <Grid item xs={12}>
                <CustomButtons
                    justifyContent={"flex-end"}
                    infoButtons={customButtonsInfo} />
            </Grid>}
        </Grid>
    )
})

export default FormSimple
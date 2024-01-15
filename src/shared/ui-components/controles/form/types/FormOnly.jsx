import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { asignarOpcionesAFormConfig, obtenerApisDeSelect, setFormDataFromObject } from "../formularioUtils";
import { useLoadingContext } from "context/loading";
import CustomDynamicFormBuilder from "../CustomDynamicFormBuilder";
import UseApi from "api/UseApi";

const FormOnly = forwardRef(({
    formConfig = [],
    formData,
    onSubmit,
    onChange,
    isView
}, ref) => {

    const [internalFormConfig, setinternalFormConfig] = useState([])

    const useHookApi = UseApi();
    const { register, control, handleSubmit, watch, formState: { errors, isValid }, reset, trigger, resetField, setValue, getValues } = useForm()

    const { loading, showLoading, hideLoading } = useLoadingContext();

    useEffect(() => {
        if (formData && formConfig) {
            setFormDataFromObject(formData, setValue, formConfig)
            reset(getValues());
        }
    }, [formData, formConfig]);

    useEffect(() => {
        ObtenerInformacion(formConfig)
    }, [formConfig]);
    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (type === 'change') {
                handleOnChange({
                    fieldChange: name,
                    valores: getValues()
                })
            }
        });
        return () => subscription.unsubscribe();
    }, []);
    useImperativeHandle(ref, () => ({
        submit: (callback) => handleProcessFormSubmit(callback)
    }));

    const handleOnChange = (data) => {
        if (typeof onChange === "function") {
            onChange(data)
        }

    }

    const ObtenerInformacion = async (formConfig) => {
        const newFormConfig = [...formConfig]
        const urls = obtenerApisDeSelect(newFormConfig) || []
        try {
            showLoading();

            const respuestas = await Promise.all(urls.map(url => useHookApi.getWithUrl(url)));
            const formConfigActualizado = asignarOpcionesAFormConfig(newFormConfig, respuestas.map(x=>x.data), urls);
            setinternalFormConfig([...formConfigActualizado]);

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
    const handleProcessFormSubmit = async (callback) => {
        const form=watch()
        const isFormValid = await trigger();
        handleSubmit((form) => {
            handleOnSubmit(form)

        })()
        return callback({ isValid: isFormValid, form: form })
    }
    return (
        <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} rowSpacing={2}>
            {internalFormConfig.map((x, index) => {
                return (
                    <CustomDynamicFormBuilder
                        key={index}
                        control={control}
                        errors={errors}
                        watch={watch}
                        setValue={setValue}
                        resetField={resetField}
                        fieldsConfig={x.fieldsFormConfig}
                        isView={isView}
                    />
                )
            })}
        </Grid>
    )
})

export default FormOnly
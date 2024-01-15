import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomHorizontalNonLinearStepper from "shared/ui-components/CustomHorizontalNonLinearStepper";
import ShowForm from "../ShowForm";
import { asignarOpcionesASteps, obtenerApisDeSelectFromFormSteps, setFormDataFromFormWithStepObject } from "../formularioUtils";
import CustomTitle from "shared/ui-components/texto/CustomTitle";
import CustomButtons from "shared/ui-components/button/CustomButtons";
import { useLoadingContext } from "context/loading";
import UseApi from "api/UseApi";

const FormWithStep = forwardRef(({
    formSteps = [],
    initialStep = 0,
    formData = null,
    onSubmit,
    titleData,
    showButton = true,
    onShowBtnNext,
    onShowBtnPrevious,
    onShowBtnFinish,
}, ref) => {
    const [currentStep, setCurrentStep] = useState(initialStep)
    const [stepLabels, setStepLabels] = useState([])
    const [stepFormConfig, setStepFormConfig] = useState([])
    const { loading, showLoading, hideLoading } = useLoadingContext();
    const stepRef = useRef(null);

    const { register, control, handleSubmit, watch, formState: { errors, isValid }, reset, trigger, resetField, setValue, getValues } = useForm()

    const useHookApi = UseApi();
    useEffect(() => {
        if (formData&&formSteps) {
            setFormDataFromFormWithStepObject(formData, setValue,formSteps)              
            reset(getValues());
        }
    }, [formData,formSteps]);


    useEffect(() => { 
        ObtenerInformacion()
    }, [formSteps]);

    useImperativeHandle(ref, () => ({
        onNext: () => {
            if (stepRef?.current) {
                stepRef.current.onNext();
            }
        },
        onPreview: () => {
            if (stepRef?.current) {
                stepRef.current.onBack();
            }
        },
        onFinish: () => {
            if (stepRef?.current) {
                stepRef.current.onFinish();
            }
        },
    }));

    const ObtenerInformacion = async () => {
        const urls = obtenerApisDeSelectFromFormSteps(formSteps) || []
        try {
            showLoading();

            const respuestas = await Promise.all(urls.map(url => useHookApi.getWithUrl(url)));
            const formConfigActualizado = asignarOpcionesASteps(formSteps, respuestas.map(x=>x.data), urls);
            
            const formStepsSorted = formConfigActualizado.sort((a, b) => a.orden - b.orden);
            const stepsLabel = formStepsSorted.map(x => x.label)
            setStepLabels(stepsLabel)

            const stepsFormConfig = formStepsSorted.map(x => {
                return x.formConfig
            })
            setStepFormConfig(stepsFormConfig)

        } catch (error) {
            console.error("Error: ", error);
        } finally {
            hideLoading();
        }
    }
    const handleOnStepChange = (currentStep) => {
        setCurrentStep(currentStep)
    }

    const handleOnSubmit = async (form) => {
        if (typeof onSubmit === "function") {
            onSubmit(form)
        }
    }
    const handleProcessFormSubmit = async () => {
        handleSubmit((form) => { handleOnSubmit(form) })()
    }

    const handleNextWithValidation = async () => {
        handleProcessFormSubmit();
        const canContinue = await trigger()
        return canContinue
    };
    const stepperContent = (currentStep) => {
        const formulario = stepFormConfig[currentStep]
        return (
            <ShowForm
                errors={errors}
                control={control}
                watch={watch}
                setValue={setValue}
                resetField={resetField}

                seccionFormulario={formulario}
            />
        )

    }
    return (
        <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
            {titleData && <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <CustomTitle
                    iconName={titleData.icon || "Article"}
                    title={titleData.title || "Titulo Defecto"}
                    buttons={titleData.buttons && showButton ? <CustomButtons
                        justifyContent="right"
                        infoButtons={titleData.buttons}
                        type="submit" /> : null}
                />
            </Grid>}
            <Grid item xs={12}>
                <CustomHorizontalNonLinearStepper
                    stepsLabel={stepLabels}
                    onStepChange={handleOnStepChange}
                    onNext={handleNextWithValidation}
                    onTerminar={handleProcessFormSubmit}
                    showButton={showButton}

                    onShowBtnNext={onShowBtnNext}
                    onShowBtnPrevious={onShowBtnPrevious}
                    onShowBtnFinish={onShowBtnFinish}

                    ref={stepRef}
                >
                    {stepperContent(currentStep)}
                </CustomHorizontalNonLinearStepper>
            </Grid>
        </Grid>
    )
})

export default FormWithStep
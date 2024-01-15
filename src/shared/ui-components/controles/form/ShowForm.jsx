import FormWrapper from "shared/ui-components/controles/form/FormWrapper";


const ShowForm = ({ errors, control, watch, setValue, resetField, seccionFormulario=[],formData }) => {

    return (
        <>
            {
                seccionFormulario.map((x, index) => {
                    return (
                        <FormWrapper
                            key={index}
                            errors={errors}
                            control={control}
                            watch={watch}
                            setValue={setValue}
                            resetField={resetField}
                            title={x.title}
                            formData={formData}
                            fieldsConfig={x.fieldsFormConfig}
                        />
                    )
                })
            }
        </>
    )
}

export default ShowForm
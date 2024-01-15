import React from 'react'
import { useForm } from 'react-hook-form';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import CustomControllerTextArea from '../controles/CustomControllerTextArea';


export const EnviarAprobacionForm = forwardRef(({  }, ref) => {

    const { register, handleSubmit, control, formState: { errors }, watch } = useForm();

    useImperativeHandle(ref, () => ({
        submitForm: (onSubmit,...otrosParametros) => {
            handleSubmit((e)=>onSubmit(e,...otrosParametros))();
        }
    }));

    return (
        <form 
        // onSubmit={handleSubmit(onSubmitInternal)}
        >
            <CustomControllerTextArea
                label="Comentario"
                name="comentario"
                placeholder="Ingrese la descripción aquí"
                control={control}
                errors={errors}
                defaultValue=""
                rows={8}
            />
        </form>
    );
});
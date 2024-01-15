import { Grid, TextField } from '@mui/material';
import { Controller } from "react-hook-form";
import CustomControllerSelect from 'shared/ui-components/controles/select/CustomControllerSelect';
const GridItemFormFilePreview = ({ control, errors,setValue, nombreArchivo, idTipoDocumento = "", disabled, elementId, tipoDocumentos = [] }) => {
    return (
        <>

            <Grid
                container
                spacing={{ xs: 1 }}
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                sx={{ py: 2, px: 1 }}
            >
                <Grid item >
                    <Controller
                        name={`dynamicInputs[${elementId}].nombreArchivo`}
                        control={control}
                        defaultValue={nombreArchivo || ""}
                        render={({ field }) =>
                            <TextField
                                {...field}
                                disabled={disabled}
                                label="Nombre Archivo"
                                placeholder='Ingrese el nombre del Archivo'
                                variant="outlined"
                                fullWidth
                                error={Boolean(errors?.dynamicInputs?.[elementId]?.nombreArchivo)}
                                helperText={errors?.dynamicInputs?.[elementId]?.nombreArchivo && "Nombre de Archivo es requerido"}
                            />
                        }
                        rules={{ required: true }}
                    />
                </Grid>
                <Grid item >
                    <CustomControllerSelect 
                        name={`dynamicInputs[${elementId}].tipoDocumento`}
                        control={control}
                        defaultValue={tipoDocumentos.length > 0 && idTipoDocumento ? idTipoDocumento : ""}
                        rules={{ required: true }}
                        label={"Tipo Documento"}
                        valueProperty={"id"}
                        nameProperty={"descripcion"}
                        setValue={setValue}
                        errors={errors?.dynamicInputs?.[elementId]?.tipoDocumento}
                        options={tipoDocumentos}
                        disabled={disabled}
                        errorMessage="Seleccione un Tipo de Documento"
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default GridItemFormFilePreview
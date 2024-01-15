import { Box, TextField, Button, Grid } from '@mui/material';
import { useForm } from "react-hook-form";

const btnstyle = { margin: '8px 0' }

const LoginForm = ({ handleOnSubmit, loading }) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    })
    return (
        <form
            onSubmit={handleSubmit(handleOnSubmit)}
        >
            <Grid
                container
                direction="column"
                sx={{ height: "100%", width: "100%" }}
                rowSpacing={5}
            >
                <Grid item>
                    <Grid
                        container
                        direction="column"
                        sx={{ height: "100%", width: "100%" }}
                        rowSpacing={2}
                    >
                        <Grid item>
                            <TextField
                                label='Usuario'
                                placeholder='Ingrese su usuario'
                                variant="outlined"
                                fullWidth
                                {...register("email", {
                                    required: "Este Campo es requerido",
                                    // pattern: {
                                    //     value: /^[0-9\s]+$/, // Permitir números y espacios en blanco
                                    //     message: "Este Campo solo acepta números"
                                    // }
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label='Contraseña'
                                placeholder='Ingrese su contraseña'
                                type='password'
                                variant="outlined"
                                fullWidth
                                {...register("password", {
                                    required: "Este Campo es requerido",
                                    minLength: { value: 4, message: "Minimo 4 caracteres" }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                    </Grid>



                </Grid>
                <Grid item>
                    <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        style={btnstyle}
                        fullWidth
                        disabled={Object.keys(errors).length > 0}
                    >
                        {loading ? "Cargando" : "Ingresar"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default LoginForm
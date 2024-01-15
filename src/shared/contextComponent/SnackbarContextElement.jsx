import { Snackbar, Alert, Slide } from "@mui/material";
import { useSnackBarContext } from "../../context/snackBar";
function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}
const SnackbarContextElement = () => {
    const { isOpen, message, severity="success", closeSnackBar } = useSnackBarContext();

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={6000}
            onClose={closeSnackBar}
            severity={severity}
            TransitionComponent={SlideTransition}
            sx={{zIndex:6000}}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={closeSnackBar} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
export default SnackbarContextElement
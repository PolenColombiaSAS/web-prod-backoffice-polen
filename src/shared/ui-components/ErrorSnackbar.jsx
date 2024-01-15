
import MuiAlert from '@mui/material/Alert';
import { Stack } from '@mui/material';

const ErrorSnackbar = ({ open, message, severity }) => {
    return (
        <>
            {open && <Stack spacing={2} sx={{ width: '100%' }}>
                <MuiAlert elevation={6} variant="filled" severity={severity} >
                    {message}
                </MuiAlert>
            </Stack>}
        </>
    );
};
export default ErrorSnackbar
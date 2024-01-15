import * as React from 'react';
import { Button, Dialog, AppBar, Toolbar, IconButton, Slide, Box, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDialogFullScreenContext } from '../../context/dialogFullScream';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialogContextElement = () => {
    const {
        isDialogFullScreenOpen,
        hideDialogFullScreenOpen,
        dialogFullScreenTitle,
        dialogFullScreenContent,
        dialogFullScreenActions
    } = useDialogFullScreenContext();

    return (
        <Dialog
            fullScreen
            open={isDialogFullScreenOpen}
            onClose={hideDialogFullScreenOpen}
            TransitionComponent={Transition}
            sx={{ zIndex: 2000 }}
        >
            <Grid
                sx={{ width: "100%" }}
                container
                direction="column"
            >
                <Grid item >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            {dialogFullScreenTitle}

                            {dialogFullScreenActions || (
                                <Button sx={{ mx: 2 }} autoFocus color="inherit" onClick={hideDialogFullScreenOpen}>
                                    Cerrar
                                </Button>
                            )}
                            <IconButton edge="start" color="inherit" onClick={hideDialogFullScreenOpen} aria-label="close">
                                <CloseIcon />
                            </IconButton>

                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item >
                    <Box sx={{ p: 3,  }}>
                        {dialogFullScreenContent}
                    </Box>
                </Grid>
            </Grid>
        </Dialog>
    );
}

export default FullScreenDialogContextElement;

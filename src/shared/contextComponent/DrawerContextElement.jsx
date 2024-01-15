import { useDrawerContext } from 'context/drawer';
import { Box, Drawer } from '@mui/material';



const DrawerContextElement = () => {
  const { isDrawerOpen, hideDrawer, drawerContent,anchor } = useDrawerContext();

  const handleClose = () => {
    hideDrawer()
  }
  return (
    <Drawer
      anchor={anchor}
      open={isDrawerOpen}
      onClose={handleClose}
      sx={{zIndex:3000}}
    >
      <Box sx={{
        minWidth:{ xs: "80vw", sm: "66vw", md: "45vw", lg: "35vw", xl: "25vw" },
        maxWidth:"80vw"

      }}>
        {drawerContent}
      </Box>
    </Drawer>
  );
}

export default DrawerContextElement;

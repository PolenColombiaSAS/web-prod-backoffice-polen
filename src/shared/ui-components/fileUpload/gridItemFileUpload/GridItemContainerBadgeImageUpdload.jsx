import Badge from '@mui/material/Badge';
import { Box } from '@mui/system';

const GridItemContainerBadgeImageUpdload = ({imageUploaded=false}) => {
  return (
      <Badge
        color={imageUploaded?"warning":"primary"}
        badgeContent={
            <Box
              style={{
                width: 100, 
                padding: '4px 0', 
                textAlign: 'center',
                fontSize: 12, 
              }}
            >
              {imageUploaded ? "Imagen Guardada" : "En Espera"}
            </Box>
          }
        overlap="rectangular"
        sx={{
            position: 'absolute',
            top: 20, 
            left: 20, 
            transform: 'rotate(-45deg)',
            zIndex:"2"
        }}
      >
      </Badge>
  );
};

export default GridItemContainerBadgeImageUpdload;
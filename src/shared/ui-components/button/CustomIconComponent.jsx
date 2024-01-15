import React from 'react';
import * as Icons from '@mui/icons-material';

const CustomIconComponent = ({ iconName, fontSize="medium", color="primary",onClick }) => {
  if (!Icons[iconName]) {
    console.warn(`El icono "${iconName}" no está soportado.`);
    iconName="Crop"
  }
  const Icon = Icons[iconName];
  return <Icon
    fontSize={fontSize}
    color={color}
    onClick={onClick}
  />;
};
/**
'inherit' | 'action' | 'disabled' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
'inherit' | 'large' | 'medium' | 'small' | string
 */
export default CustomIconComponent;
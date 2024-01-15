import React from 'react';
import { Typography, Box } from '@mui/material';

const LabeledValue = ({ label, value }) => {
  return (
    <Box display="block">
      <Typography variant="subtitle2" display="inline">
        {label}
      </Typography>
      <Typography variant="subtitle1" display="inline">
        {value}
      </Typography>
    </Box>
  );
};

export default LabeledValue;

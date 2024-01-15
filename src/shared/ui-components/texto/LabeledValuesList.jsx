import React from 'react';
import { Typography, Box } from '@mui/material';

const LabeledValuesList = ({ items }) => {
  return (
    <Box display="block">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Typography variant="subtitle1" color="primary.main" display="inline">
            {item.label}
          </Typography>
          <Typography variant="body2" color="text.secondary" display="inline">
            {`: ${item.value}`}
          </Typography>
          {index < items.length - 1 && (
            <Typography variant="body2" color="text.primary" display="inline" sx={{ mx: 1 }}>
              -
            </Typography>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default LabeledValuesList;

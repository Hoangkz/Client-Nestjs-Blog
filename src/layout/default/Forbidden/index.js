import { Box } from '@chakra-ui/react';
import React from 'react';
import './Error403.css';

const Error403 = () => {
  return (
    <Box className="error-page">
      <h1 className="error-heading">Error 403: Forbidden</h1>
      <p className="error-message">You do not have permission to access this page.</p>
    </Box>
  );
};

export default Error403;

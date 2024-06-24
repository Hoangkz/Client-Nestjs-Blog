import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Error403.css';

const Error403 = () => {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate("/")
  }
  const handleClickLogin = () => {
    navigate("/auth/login")
  }

  return (
    <Box className="error-page">
      <h1 className="error-heading">Error 403: Forbidden</h1>
      <p className="error-message">You do not have permission to access this page.</p>
      <Flex justify={"space-around"}>
        <Button w={"100px"} color={"#fff"} _hover={{ "opacity": "0.7" }} background='#ea4d2d' m="16px" onClick={handleClickHome}>Home</Button>
        <Button w={"100px"} type="submit" colorScheme='pink' m={"16px"} onClick={handleClickLogin}>Login</Button>
      </Flex>
    </Box >
  );
};

export default Error403;

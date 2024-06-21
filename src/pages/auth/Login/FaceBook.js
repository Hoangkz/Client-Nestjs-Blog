import { Box, Icon } from '@chakra-ui/react';
import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import "./facebook.css";
import FacebookLogin from 'react-facebook-login';

export default function Facebook() {

  return (
    <Box margin="0px">
      <FacebookLogin
        appId="210311564990021"
        fields="name,email,picture"
        cssClass="facebook"
        icon={<Icon className='iconFacebook' color={"#4c69ba"} as={FaFacebook} />}
        textButton={<Box fontWeight="500" fontFamily="Google Sans, arial,sans-serif" color="#3c4043" letterSpacing="0.25px" textOverflow="ellipsis">Connect with Facebook</Box>}
      />
    </Box>
  )
}




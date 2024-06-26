import { Box, Button, Flex, Icon, Input } from "@chakra-ui/react";
import { TiHomeOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import "../auth.css"
import React, { startTransition } from 'react';
import { useState } from "react";
import authApi from "../../../API/authApi";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import authSlice from '../../../components/auth';
import Google from "./Google"
import Facebook from "./FaceBook"
import ForgotPassword from "./ForgotPassword"
export default function SignUp() {

    const dispatch = useDispatch();
    const handleClickGoBack = () => {
        startTransition(() => {
            window.history.back();
        });
    }

    const navigate = useNavigate();

    const [formEmail, setFormEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");

    const handleChangeFormEmail = (e) => {
        const value = e.target.value;
        setFormEmail(value);
    }

    const handleChangeFormPassword = (e) => {
        const value = e.target.value;
        setFormPassword(value);
    }
    const handSubmitForm = (e) => {
        e.preventDefault();

        const formData = {
            email: formEmail,
            password: formPassword
        }
        authApi.login(formData)
            .then(response => {
                toast.success("Login successfully");
                const token = response?.data?.accesstoken;
                localStorage.setItem("token", token);
                const decoded = jwt_decode(token);
                localStorage.setItem("user", JSON.stringify(decoded));
                const urlParams = new URLSearchParams(window.location.search);
                const nextPage = urlParams.get('next-page');
                if (nextPage) {
                    navigate(urlParams.get('next-page'));
                }
                else {
                    navigate('/');
                }
                dispatch(authSlice.actions.login({ checkLogin: true, user: decoded, token: token }));
            })
            .catch(error => {
                console.log(error)
                toast.error(error?.response?.data.message);
            })
    }

    return (
        <>
            <Box boxSizing="inherit">
                <Flex position={"fixed"} top="0" left="0" bottom="0" right="0" backgroundColor={'antiquewhite'} >
                    <Box zIndex={"-1"} position={"absolute"} w="100%" h={"100%"} backgroundColor="rgba(0,0,0,0.1)" >

                    </Box>
                    <Box m={"auto"} backgroundColor="#fff" borderRadius={6}>
                        <form onSubmit={handSubmitForm}>
                            <Box width={400} margin="32px auto">
                                <Box>
                                    <Link to={"/"}>
                                        <Box textAlign={"center"}>
                                            <Icon fontSize="32px" color={"#fe6433"} as={TiHomeOutline} />
                                            <Box color={"#fe6433"} fontSize="20px" fontWeight="700" >
                                                Home
                                            </Box>
                                        </Box>
                                    </Link>
                                </Box>
                                <Box m={"0 8px 20px"}>
                                    <Flex justify={"space-between"} mt="18px" mb="32px">
                                        <Box fontWeight={600} fontSize="18px">
                                            Login
                                        </Box>
                                        <Box _hover={{ "opacity": '0.6' }}>
                                            <a href={"/auth/signup"}>
                                                <Box fontWeight={700} fontSize="15px" color={"#ea4d2d"}>
                                                    Register
                                                </Box>
                                            </a>
                                        </Box>
                                    </Flex>
                                </Box>
                                <Box>
                                    <Box m={"12px 0"}>
                                        <Input onChange={handleChangeFormEmail} placeholder="Email" border={"2px solid #ccc"} />
                                    </Box>
                                    <Box m={"12px 0"}>
                                        <Input onChange={handleChangeFormPassword} placeholder="Password" type={"password"} border={"2px solid #ccc"} />
                                    </Box>
                                </Box>
                                <Box position={"relative"} fontSize="16px" textAlign={"end"} color={"black"}>
                                    <ForgotPassword />
                                    <Box className="boderIcon" display="initial"></Box>
                                    <Link className="linkSupport" to={"/"} style={{ 'margin': "0 8px", "color": "#939393", "fontWeight": "700" }}>
                                        Help
                                    </Link>
                                </Box>
                                <Flex justify={"end"} m="36px 0 32px">
                                    <Button onClick={handleClickGoBack} w={140} colorScheme='gray' size='md' variant={"outline"}>
                                        Back
                                    </Button>
                                    <Box m={2}></Box>
                                    <Button type="submit" w={140} backgroundColor="#ea4d2d" color={"#fff"} _hover={{ "opacity": "0.7" }} size='md' >
                                        Login
                                    </Button>
                                </Flex>
                            </Box>
                            <Box w="500px" backgroundColor={"#f5f5f5"} borderRadius={6}>
                                <Box h={2}></Box>
                                <Flex justify={"space-around"} boxSizing="revert" p={"4px 12px"}>
                                    <Facebook />
                                    <Google />
                                </Flex>
                                <Box h={2}></Box>
                            </Box>
                        </form>
                    </Box>
                </Flex>
            </Box>
        </>
    )
}
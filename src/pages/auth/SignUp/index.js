import { Box, Button, Flex, Icon, Input, Select, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import "../auth.css"
import { useState, startTransition, useEffect } from "react";
import authApi from "../../../API/authApi";
import { toast } from "react-toastify";
import Google from "../Login/Google"
import Facebook from "../Login/FaceBook"
import { TiHomeOutline } from "react-icons/ti";
export default function SignUp() {
    const handleClickGoBack = () => {
        startTransition(() => {
            window.history.back();
        });
    }
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const [formPasswordComfirm, setFormPasswordComfirm] = useState("");

    const [passwordError, setPasswordError] = useState(false);
    const [passwordComfirmError, setPasswordComfirmError] = useState(false);

    const [checkPasswordForm, setCheckPasswordForm] = useState(false);

    const [lastname, setLastName] = useState("")
    const [firstname, setFirstName] = useState("")
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [gender, setGender] = useState("male")

    const handleChangeFormPassword = (e) => {
        const value = e.target.value;
        setFormPassword(value);
        if (value.length < 6) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    }

    const handleChangeFormPasswordComfirm = (e) => {
        const value = e.target.value;
        setFormPasswordComfirm(value);
        if (value.length < 6) {
            setPasswordComfirmError(true);
        } else {
            setPasswordComfirmError(false);
        }
    }

    useEffect(() => {
        if (formPassword !== formPasswordComfirm) {
            setCheckPasswordForm(true)
        }
        else {
            setCheckPasswordForm(false)
        }
    }, [formPassword, formPasswordComfirm])

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (formPassword.length >= 6 && formPasswordComfirm === formPassword && firstname && lastname && email) {
            if (phone.length != 10 && phone) {
                toast.error("The phone number must contain 10 characters");
                return
            }
            const formData = {
                email,
                'password': formPassword,
                firstname,
                lastname,
                email,
                address,
                phone,
                gender
            }
            authApi.signup(formData)
                .then(response => {
                    toast.success(response.data.message);
                    navigate('/auth/login');
                })
                .catch(error => {
                    toast.error(error.response.data.message);
                })
        }
        else {
            toast.error("Please fill in all the fields")
        }


    };

    return (
        <>
            <Box boxSizing="inherit">

                <Flex position={"fixed"} top="0" left="0" bottom="0" right="0" backgroundColor={'antiquewhite'} >
                    <Box zIndex={"-1"} position={"absolute"} w="100%" h={"100%"} backgroundColor="rgba(0,0,0,0.1)" >

                    </Box>
                    <Box m={"auto"} backgroundColor="#fff" borderRadius={6}>
                        <form onSubmit={handleSubmitForm}>
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
                                <Box m={"0 8px 12px"}>
                                    <Flex justify={"space-between"} mt="18px" mb="12px">
                                        <Box fontWeight={600} fontSize="18px">
                                            Register
                                        </Box>
                                        <Box _hover={{ "opacity": '0.6' }}>
                                            <a href={"/auth/login"}>
                                                <Box fontWeight={700} fontSize="15px" color={"#ea4d2d"}>
                                                    Login
                                                </Box>
                                            </a>
                                        </Box>
                                    </Flex>
                                </Box>
                                <Box>
                                    <Box position="relative">
                                        <Text m="auto">Email</Text>
                                        <Input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" border={"2px solid #ccc"} />
                                    </Box>
                                    <Flex w="100%" m={"12px 0"} position="relative" justify={"space-between"}>
                                        <Box w="45%">
                                            <Text m="auto">First Name</Text>
                                            <Input onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" border={"2px solid #ccc"} />
                                        </Box>
                                        <Box w="45%">
                                            <Text m="auto">Last Name</Text>
                                            <Input onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" border={"2px solid #ccc"} />
                                        </Box>
                                    </Flex>
                                    <Flex m={"12px 0"} position="relative" justify={"space-between"}>
                                        <Box w="28%">
                                            <Text m="auto">Gender</Text>
                                            <Select border={"2px solid #ccc"} defaultValue="male" onChange={(e) => setGender(e.target.value)}>
                                                <option value='male'>Male</option>
                                                <option value='female'>Female</option>
                                                <option value='other'>Other</option>
                                            </Select>
                                        </Box>
                                        <Box w="35%">
                                            <Text m="auto">Phone</Text>
                                            <Input type="number" maxW={150} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" border={"2px solid #ccc"} />
                                        </Box>
                                        <Box w="35%">
                                            <Text m="auto">Address</Text>
                                            <Input maxW={150} onChange={(e) => setAddress(e.target.value)} placeholder="Address" border={"2px solid #ccc"} />
                                        </Box>
                                    </Flex>
                                    <Box m={"12px 0"} position="relative">
                                        <Text m="auto">Password</Text>
                                        <Input onChange={handleChangeFormPassword} placeholder="Password" type={"password"} border={"2px solid #ccc"} />
                                        {passwordError && <span style={{ color: 'red', fontSize: "13px", position: "absolute", bottom: "-20px", left: "1px" }}>Password must have at least 6 characters!</span>}
                                    </Box>
                                    <Box mt="18px" position="relative">
                                        <Text m="auto">Confirm Password</Text>
                                        <Input onChange={handleChangeFormPasswordComfirm} placeholder="Confirm Password" type={"password"} border={"2px solid #ccc"} />
                                        {passwordComfirmError && <span style={{ color: 'red', fontSize: "13px", position: "absolute", bottom: "-20px", left: "1px" }}>Password must have at least 6 characters!</span>}
                                        {(checkPasswordForm && !passwordComfirmError) && <span style={{ color: 'red', fontSize: "13px", position: "absolute", bottom: "-20px", left: "1px" }}>Password and confirm password do not match!
                                        </span>}
                                    </Box>
                                </Box>
                                <Box mt={8} fontSize="12px" textAlign={"center"} color={"black"}>
                                    <span>
                                        By registering, you agree to META APP
                                    </span>
                                    <Link to={"/"} style={{ 'margin': "0 2px", "color": "#ea4d2d", "fontWeight": "700" }} className="linkSupport">
                                        Terms of Service
                                    </Link>
                                    <span>&</span>
                                    <Text>
                                        <Link className="linkSupport" to={"/"} style={{ 'margin': "0 2px", "color": "#ea4d2d", "fontWeight": "700" }}>
                                            Privacy Policy
                                        </Link>
                                    </Text>
                                </Box>
                                <Flex justify={"end"} m="36px 0 32px">
                                    <Button onClick={handleClickGoBack} w={140} colorScheme='gray' size='md' variant={"outline"}>
                                        Back
                                    </Button>
                                    <Box m={2}></Box>
                                    <Button type="submit" w={140} backgroundColor="#ea4d2d" color={"#fff"} _hover={{ "opacity": "0.7" }} size='md' >
                                        Register
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
                </Flex >
            </Box >
        </>
    )
}
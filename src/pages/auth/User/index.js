import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import usersApi from "../../../API/usersApi";
import { tokenRemainingSelector } from "../../../redux/selectors";
import "./user.css"
import ChangePassword from "./ChangePassword"
import { Box, Button, Flex, Heading, Input, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
export default function User() {
    const dataUser = useSelector(tokenRemainingSelector).user;
    const [click, setClick] = useState(true)
    const [gender, setGender] = useState(dataUser?.gender)
    const [birthday, setBirthday] = useState(dataUser?.birthday)
    const [address, setAddress] = useState(dataUser?.address)

    const [email, setEmail] = useState(dataUser.email || '');
    const [firstname, setFirstname] = useState(dataUser.firstname || '');
    const [lastname, setLastname] = useState(dataUser.lastname || '');
    const [phone, setPhone] = useState(dataUser.phone || '');
    console.log(dataUser)
    const handleClickSubmitForm = (e) => {
        e.preventDefault();
        setClick(!click)
        if (click === false) {
            const data = { id: dataUser.id, email, phone, lastname, firstname, gender, birthday, address }
            usersApi.updateUser(data)
                .then((response) => {
                    localStorage.setItem("refreshToken", response.data.refreshToken)
                    toast.success(response.data.message)
                    setClick(!click)
                })
                .catch((error) => { toast.error(error.response.data.message) })
        }
    }
    return (
        <>
            <Box backgroundColor="#fff" maxW="80%" mx={"auto"}>
                <Box mb={"16px"} ml="46px" position={"relative"}>
                    <Heading fontSize="1.25rem" lineHeight={1.2} fontWeight="400" p="16px" m={0}>
                        My profile
                        <Text fontSize="14px" mt={"4px"}>Manage profile information for account security</Text>
                    </Heading>
                    <Box position={"absolute"} top="16px" right={20} >
                        <ChangePassword id={dataUser?.id} />
                    </Box>
                    <Box m={"0 auto"} w={"80%"} backgroundColor="rgb(234, 222, 222)" h={"0.6px"}></Box>
                </Box>

                {(true) ?
                    <Box>
                        <form onSubmit={handleClickSubmitForm}>
                            <Flex m="8px">
                                <Box className="col" textAlign="end" p="0" m="0">
                                    <Box m="8px 0 16px">Email</Box>
                                </Box>
                                <Box className="col-9" ml="24px">
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        size="md"
                                        maxW="400px"
                                        w="60%"
                                    />
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign="end" p="0" m="0">
                                    <Box m="8px 0 16px">Firstname</Box>
                                </Box>
                                <Box className="col-9" ml="24px">
                                    <Input
                                        placeholder="Firstname"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        size="md"
                                        maxW="400px"
                                        w="60%"
                                    />
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign="end" p="0" m="0">
                                    <Box m="8px 0 16px">Lastname</Box>
                                </Box>
                                <Box className="col-9" ml="24px">
                                    <Input
                                        placeholder="Lastname"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        size="md"
                                        maxW="400px"
                                        w="60%"
                                    />
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign="end" p="0" m="0">
                                    <Box m="8px 0 16px">Gender</Box>
                                </Box>
                                <Box className="col-9" ml="24px">
                                    <RadioGroup mt="10px" value={gender} onChange={setGender}>
                                        <Stack direction="row" flexWrap="wrap">
                                            <Radio value="male">Male</Radio>
                                            <Radio value="female">Female</Radio>
                                            <Radio value="other">Other</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign="end" p="0" m="0">
                                    <Box m="8px 0 16px">Birthday</Box>
                                </Box>
                                <Box className="col-9" ml="24px">
                                    <Input
                                        placeholder="Ngày sinh"
                                        type="date"
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)}
                                        size="md"
                                        maxW="150px"
                                        w="60%"
                                    />
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign="end" p="0" m="0">
                                    <Box m="8px 0 16px">Phone</Box>
                                </Box>
                                <Box className="col-9" ml="24px">
                                    <Input
                                        placeholder="Phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        size="md"
                                        maxW="400px"
                                        w="60%"
                                    />
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign="end" p="0" m="0">
                                    <Box m="8px 0 16px">Address</Box>
                                </Box>
                                <Box className="col-9" ml="24px">
                                    <Input
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        size="md"
                                        maxW="400px"
                                        w="60%"
                                    />
                                </Box>
                            </Flex>
                            <Flex pb={10} mt="24px">
                                <Box className="col"></Box>
                                <Box className="col-9" ml="24px">
                                    <Button colorScheme="teal" type="submit" maxW="140px">
                                        Submit
                                    </Button>
                                </Box>
                            </Flex>
                        </form>
                    </Box>

                    : (<Box h={100}>
                        <Text textAlign={"center"} fontSize="22px">
                            Not data
                        </Text>
                    </Box>)
                }

            </Box>
        </>
    )
}
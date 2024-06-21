import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import usersApi from "../../../API/usersApi";
import { tokenRemainingSelector } from "../../../redux/selectors";
import "./user.css"
import ChangePassword from "./ChangePassword"
import jwt_decode from "jwt-decode";
import authSlice from '../../../components/auth';

import { Box, Button, Flex, Heading, Image, Input, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
export default function User() {
    const dispatch = useDispatch();
    const dataUser = useSelector(tokenRemainingSelector).user;

    console.log(dataUser)

    const [click, setClick] = useState(true)
    const [gender, setGender] = useState(dataUser?.gender || "other")
    const [birthday, setBirthday] = useState(dataUser?.birthday || "")
    const [address, setAddress] = useState(dataUser?.address || "")

    const [firstname, setFirstname] = useState(dataUser?.firstname || '');
    const [lastname, setLastname] = useState(dataUser?.lastname || '');
    const [phone, setPhone] = useState(dataUser?.phone || '');
    const handleClickSubmitForm = (e) => {
        e.preventDefault();
        setClick(!click)
        if (click === false) {
            const data = { id: dataUser.id, phone, lastname, firstname, gender, birthday, address }
            usersApi.updateUser(data)
                .then((response) => {
                    toast.success(response?.data.message)
                    setClick(!click)
                    const token = response.data.token
                    console.log(response.data)
                    localStorage.setItem("token", JSON.stringify(token));
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                })
                .catch((error) => { toast.error(error.response?.data.message) })
        }
    }

    const handleImageChange = (e) => {

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
                    <Box >
                        <form onSubmit={handleClickSubmitForm}>
                            <Flex m="8px">
                                <Box className="col" textAlign="end" p="0" m="0">
                                    <Box m="8px 0 16px">Email</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Box fontWeight="bold" m={"8px 0 16px"}>{dataUser?.email || ''}</Box>
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign="end" p="0" m="0">
                                    <Box m="8px 0 16px">Firstname</Box>
                                </Box>
                                <Flex className="col-9">
                                    <Box ml="24px">
                                        <Input
                                            placeholder="Firstname"
                                            value={firstname}
                                            onChange={(e) => setFirstname(e.target.value)}
                                            size="md"
                                            maxW="160px"
                                        />
                                    </Box>
                                    <Box textAlign="end" p="0" m="0" ml={30}>
                                        <Box m="8px 0 16px">Lastname</Box>
                                    </Box>
                                    <Box ml="24px">
                                        <Input
                                            placeholder="Lastname"
                                            value={lastname}
                                            onChange={(e) => setLastname(e.target.value)}
                                            size="md"
                                            maxW="160px"
                                        />
                                        <Box mr="20px" mt="20px" h="450px" maxW="400px" position="absolute">
                                            <Image src="http://localhost:8080/uploads/items/a.png" />
                                            <Input
                                                id="img"
                                                type="file"
                                                accept="image/*"
                                                backgroundColor='#fff'
                                                mt="10px"
                                                onChange={handleImageChange}
                                                border={"none"}
                                            />
                                        </Box>
                                    </Box>
                                </Flex>
                            </Flex>
                            <Flex m="8px">

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
                                        placeholder="Birthday"
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
                                        maxW="200px"
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
                                        maxW="200px"
                                    />
                                </Box>
                            </Flex>
                            <Flex pb={10} mt="24px">
                                <Box className="col"></Box>
                                <Box className="col-9" ml="24px">
                                    <Box className="col-9">
                                        <Button colorScheme={click ? "green" : "teal"} type={"submit"} className="col-9" maxW={"140px"}>{click ? "Update" : "Save"}</Button>
                                    </Box>
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
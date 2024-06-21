import { Box, Button, Flex, Heading, Input, Radio, RadioGroup, Select, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import usersApi from "../../../API/usersApi";
export default function UpdateUser() {
    const { slug } = useParams();
    const [user, setUser] = useState()

    const [click, setClick] = useState(true)

    const [email, setEmail] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [phone, setPhone] = useState()
    const [gender, setGender] = useState()
    const [role, setRole] = useState()
    const [birthday, setBirthday] = useState()
    const [address, setAddress] = useState()
    const [imageUser, setImageUser] = useState()
    const [imageDefault, setImageDefault] = useState()

    useEffect(() => {
        usersApi.getUserById(slug)
            .then((response) => {
                const data = response.data;
                console.log(data)
                setUser(data);
                setEmail(data?.email)
                setFirstName(data?.firstname)
                setLastName(data?.lastname)
                setPhone(data?.phone)
                setGender(data?.gender)
                setRole(data?.role)
                setBirthday(data?.birthday)
                setAddress(data?.address)
                setImageUser(data?.image)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleClickSubmitForm = (e) => {
        e.preventDefault();
        setClick(!click)
        if (click === false) {
            const data = { id: user.id, firstname: firstName, lastname: lastName, phone, gender, birthday, address, role }
            usersApi.updateUser(data)
                .then((response) => {
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
                        <span style={{ color: "#fe6433" }} >{email}</span>
                        <Text fontSize="14px" mt={"4px"}>Manage profile information for account security</Text>
                    </Heading>
                    <Box m={"0 auto"} w={"80%"} backgroundColor="rgb(234, 222, 222)" h={"0.6px"}></Box>
                </Box>

                {(user) ?
                    <Box>
                        <form onSubmit={handleClickSubmitForm}>
                            <Flex m="8px">
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Email</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Box fontWeight="bold" m={"8px 0 16px"}>{email}</Box>
                                </Box>
                            </Flex>
                            <Flex m={"8px"}>
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>First Name</Box>
                                </Box>
                                <Flex className="col-9" ml="24px">
                                    <Box >
                                        <Input placeholder="Firstname" disabled={click} defaultValue={firstName} onChange={(e) => { setFirstName(e.target.value) }} size='md' maxW="160px" />
                                    </Box>
                                    <Box m={"8px 0 16px 16px"}>Last Name</Box>
                                    <Box ml={"24px"}>
                                        <Input placeholder="Last Name" disabled={click} defaultValue={lastName} onChange={(e) => { setLastName(e.target.value) }} size='md' maxW="160px" />

                                    </Box>
                                </Flex>
                            </Flex>

                            <Flex m="8px">

                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Gender</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <RadioGroup mt="10px" value={gender} onChange={(e) => { setGender(e) }} readOnly={true}>
                                        <Stack direction='row' flexWrap={"wrap"}>
                                            <Radio value='Male' isDisabled={click}>Male</Radio>
                                            <Radio value='Female' isDisabled={click}>Female</Radio>
                                            <Radio value='Other' isDisabled={click}>Other</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Birthday</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Input placeholder="Birthday" type="date" disabled={click} defaultValue={birthday} onChange={(e) => { setBirthday(e.target.value) }} size='md' maxW="150px" w={"60%"} />
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Phone</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Input placeholder="Phone" type={"number"} disabled={click} defaultValue={phone} onChange={(e) => { setPhone(e.target.value) }} size='md' maxW="200px" />
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Role</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"} >
                                    <Select defaultValue={role} w="200px" isDisabled={click} onChange={(e) => setRole(e.target.value)}>
                                        <option value='1'>Customer</option>
                                        <option value='2'>Staff</option>
                                        <option value='3'>Admin</option>
                                    </Select>
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Address</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Input placeholder="Address" type="text" disabled={click} defaultValue={address} onChange={(e) => { setAddress(e.target.value) }} size='md' maxW="150px" w={"60%"} />
                                </Box>
                            </Flex>
                            <Flex pb={10} mt="24px">
                                <Box className="col"></Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Button colorScheme={click ? "green" : "teal"} type={"submit"} className="col-9" maxW={"140px"}>{click ? "Update" : "Save"}</Button>
                                </Box>
                            </Flex>

                        </form>
                    </Box>

                    : (<Box h={100}>
                        <Text textAlign={"center"} fontSize="22px">
                            Chưa có dữ liệu
                        </Text>
                    </Box>)
                }

            </Box>
        </>
    )
}
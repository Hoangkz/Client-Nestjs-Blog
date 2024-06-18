import { Box, Button, Flex, Heading, Input, Radio, RadioGroup, Select, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import usersApi from "../../../API/usersApi";
import { tokenRemainingSelector } from "../../../redux/selectors";
export default function UpdateUss() {
    const { slug } = useParams();
    const dataUser = useSelector(tokenRemainingSelector).user;
    const [user, setUser] = useState()

    const [click, setClick] = useState(true)

    const [fullname, setFullName] = useState()
    const [tell, setTell] = useState()
    const [extname, setExtname] = useState()
    const [gender, setGender] = useState()
    const [role, setRole] = useState()
    const [birthday, setBirthday] = useState()
    const [address, setAddress] = useState()

    useEffect(()=>{
        const formData = new FormData();
        formData.append('admin', dataUser?._id);
        formData.append('user', slug);
        usersApi.getUser(formData)
        .then((response)=>{
            const data = response.data.user;
            setUser(data);
            setFullName(data?.fullname)
            setTell(data?.tell)
            setExtname(data?.extname)
            setGender(data?.gender)
            setRole(data?.role)
            setBirthday(data?.birthday)
            setAddress(data?.address)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])

    const handleClickSubmitForm = (e) => {
        e.preventDefault();
        setClick(!click)
        if (click === false) {
            const data = { id: user._id, fullname, tell, extname, gender, birthday, address, role }
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
                        Hồ sơ của <span style={{color:"#fe6433"}} >{fullname||user?.username}</span> 
                        <Text fontSize="14px" mt={"4px"}>Quản lý thông tin hồ sơ để bảo mật tài khoản</Text>
                    </Heading>
                    <Box m={"0 auto"} w={"80%"} backgroundColor="rgb(234, 222, 222)" h={"0.6px"}></Box>
                </Box>

                {(user) ?
                    <Box>
                        <form onSubmit={handleClickSubmitForm}>
                            <Flex m="8px">
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Tên đăng nhập</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Box m={"8px 0 16px"}>{user?.username}</Box>
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Họ và tên</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Input placeholder="Họ và tên" disabled={click} defaultValue={fullname} onChange={(e) => { setFullName(e.target.value) }} size='md' maxW="400px" w={"60%"} />
                                </Box>
                            </Flex>

                            <Flex m="8px">
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Số điện thoại</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Input placeholder="Số điện thoại" disabled={click} defaultValue={tell} onChange={(e) => { setTell(e.target.value) }} size='md' maxW="400px" w={"60%"} />
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Email</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Input placeholder="Email" type={"email"} disabled={click} defaultValue={extname} onChange={(e) => { setExtname(e.target.value) }} size='md' maxW="400px" w={"60%"} />
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Role</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"} >
                                    <Select defaultValue={role} w="200px" isDisabled={click} onChange={(e)=>setRole(e.target.value)}>
                                        <option value='1'>Khách hàng</option>
                                        <option value='2'>Nhân viên</option>
                                        <option value='3'>Admin</option>
                                    </Select>
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Giới tính</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <RadioGroup  mt="10px" value={gender} onChange={(e)=>{setGender(e)}} readOnly={true}>
                                        <Stack direction='row'flexWrap={"wrap"}>
                                            <Radio value='nam' isDisabled={click}>Nam</Radio>
                                            <Radio value='nữ' isDisabled={click}>Nữ</Radio>
                                            <Radio value='khác' isDisabled={click}>Khác</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Ngày sinh</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Input placeholder="Ngày sinh" type="date" disabled={click} defaultValue={birthday} onChange={(e) => { setBirthday(e.target.value) }} size='md' maxW="150px" w={"60%"} />
                                </Box>
                            </Flex>
                            <Flex >
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Địa chỉ</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Input defaultValue={address} onChange={(e) => { setAddress(e.target.value) }} disabled={click} placeholder="Địa chỉ" size='md' maxW="400px" w={"60%"} />
                                </Box>
                            </Flex>
                            <Flex pb={10} mt="24px">
                                <Box className="col"></Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Button colorScheme='teal' type={"submit"} className="col-9" maxW={"140px"}>{click ? "Update" : "Save"}</Button>
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
import { Box, Button, Flex, Heading, Input, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import usersApi from "../../../API/usersApi";
import { tokenRemainingSelector } from "../../../redux/selectors";
import "./user.css"
import ChangePassword from "./ChangePassword"
export default function User(){
    const dataUser = useSelector(tokenRemainingSelector).user;
    const [click, setClick] = useState(true)
    const [fullname, setFullName] = useState(dataUser?.fullname)
    const [tell, setTell] = useState(dataUser?.tell)
    const [extname, setExtname] = useState(dataUser?.extname)
    const [gender, setGender] = useState(dataUser?.gender)
    const [birthday, setBirthday] = useState(dataUser?.birthday)
    const [address, setAddress] = useState(dataUser?.address)
    
    const handleClickSubmitForm = (e)=>{
        e.preventDefault();
        setClick(!click)
        if(click === false){
            const data = {id:dataUser._id,fullname,tell,extname,gender,birthday,address}
            usersApi.updateUser(data)
            .then((response)=>{
                localStorage.setItem("refreshToken",response.data.refreshToken)
                toast.success(response.data.message)
                setClick(!click)
            })
            .catch((error)=>{toast.error(error.response.data.message)})
        }
    }
    return(
        <>
            <Box backgroundColor="#fff" maxW="80%" mx={"auto"}>
                <Box mb={"16px"} ml="46px" position={"relative"}>
                    <Heading fontSize="1.25rem" lineHeight={1.2} fontWeight="400" p="16px" m={0}>
                        Hồ sơ của tôi
                        <Text fontSize="14px" mt={"4px"}>Quản lý thông tin hồ sơ để bảo mật tài khoản</Text>
                    </Heading>
                    <Box position={"absolute"} top="16px" right={20} >
                        <ChangePassword id={dataUser?._id}/>
                    </Box>
                    <Box m={"0 auto"} w={"80%"} backgroundColor="rgb(234, 222, 222)" h={"0.6px"}></Box>
                </Box>
                
                {(dataUser)?
                    <Box>
                        <form onSubmit={handleClickSubmitForm}>
                            <Flex m="8px">
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Tên đăng nhập</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Box m={"8px 0 16px"}>{dataUser?.username}</Box>
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Họ và tên</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Input placeholder="Họ và tên" disabled={click} defaultValue={fullname} onChange={(e)=>{setFullName(e.target.value)}}  size='md' maxW="400px" w={"60%"}/>
                                </Box>
                            </Flex>
                            
                            <Flex m="8px">
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Số điện thoại</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Input placeholder="Số điện thoại" disabled={click} defaultValue={tell} onChange={(e)=>{setTell(e.target.value)}} size='md' maxW="400px" w={"60%"}/>
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Email</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Input placeholder="Email" type={"email"} disabled={click} defaultValue={extname} onChange={(e)=>{setExtname(e.target.value)}}  size='md' maxW="400px" w={"60%"}/>
                                </Box>
                            </Flex>
                            <Flex m="8px">
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Giới tính</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <RadioGroup  mt="10px" defaultValue={gender} onChange={(e)=>{setGender(e)}} readOnly={true}>
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
                                    <Input placeholder="Ngày sinh"type="date" disabled={click} defaultValue={birthday} onChange={(e)=>{setBirthday(e.target.value)}} size='md' maxW="150px" w={"60%"}/>
                                </Box>
                            </Flex>
                            <Flex >
                                <Box className="col" textAlign={"end"} p="0" m="0">
                                    <Box m={"8px 0 16px"}>Địa chỉ</Box>
                                </Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Input defaultValue={address} onChange={(e)=>{setAddress(e.target.value)}} disabled={click}  placeholder="Địa chỉ"  size='md' maxW="400px" w={"60%"}/>
                                </Box>
                            </Flex>
                            <Flex pb={10} mt="24px">
                                <Box className="col"></Box>
                                <Box className="col-9" ml={"24px"}>
                                    <Button colorScheme='teal' type={"submit"} className="col-9" maxW={"140px"}>{click?"Update":"Save"}</Button>
                                </Box>
                            </Flex>

                </form>
                    </Box>

                :(<Box h={100}>
                    <Text textAlign={"center"} fontSize="22px">
                        Chưa có dữ liệu
                    </Text>
                </Box>)
                }
                
            </Box>
        </>
    )
}
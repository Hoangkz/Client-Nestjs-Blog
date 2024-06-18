import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Box, Button, Checkbox, Flex, Heading, Text, Icon, useDisclosure, Input } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import usersApi from "../../../API/usersApi";
import { tokenRemainingSelector } from "../../../redux/selectors";
import { useSelector } from "react-redux";
import { format } from 'date-fns';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import { toast } from "react-toastify";


export default function ListUser() {
  
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [checkboxList, setCheckboxList] = useState([]);
    const [checkDelete, setCheckDelete] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const user = useSelector(tokenRemainingSelector).user;
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState([])

    const [search, setSearch] = useState("")

    const [checkSearch, setCheckSearch] = useState(false);


    function handlePageClick(selectedPage) {
        setCurrentPage(selectedPage.selected + 1);
    }
    useEffect(() => {
        (async () => {
            setCheckDelete(false)
            try {
                const formData = new FormData();
                formData.append('id', user?._id);
                formData.append('search', search);
                const res = await usersApi.listUser(formData, currentPage);
                const listCheckBox = res.data.user.map(user => {
                    return {
                        ...user,
                        isChecked: false
                    }
                })
                setIsCheckedAll(false)
                setCheckboxList(listCheckBox)
                setDataUser(res.data);
                
            } catch (error) {
                toast.error(error.response.data.message)
                if (error.response.status === 403) {
                    navigate('/forbidden');
                }
                setDataUser("")
            }
        })();
    }, [deleteAccount,currentPage,checkSearch]);

    const handleSearchAccount = ()=>{
        setCheckSearch(!checkSearch)
    }
    const handleCheckboxChange = (event, index) => {
        const { checked } = event.target;
        const newCheckboxList = [...checkboxList];
        newCheckboxList[index].isChecked = checked;
        setCheckboxList(newCheckboxList);
        setIsCheckedAll(newCheckboxList.every((checkbox) => checkbox.isChecked));
        for (let i = 0; i < newCheckboxList.length; i++) {
            if (newCheckboxList[i].isChecked === true) {
                setCheckDelete(true)
                i = newCheckboxList.length
            }
            else {
                setCheckDelete(false)
            }
        }
    };

    const handleCheckboxAllChange = (event) => {
        const { checked } = event.target;
        const newCheckboxList = checkboxList.map((checkbox) => {
            checkbox.isChecked = checked;
            return checkbox;
        });
        setCheckboxList(newCheckboxList);
        setIsCheckedAll(checked);
        for (let i = 0; i < newCheckboxList.length; i++) {
            if (newCheckboxList[i].isChecked === true) {
                setCheckDelete(true)
                i = newCheckboxList.length
            }
            else {
                setCheckDelete(false)
            }
        }
    };

    const handleClickUpdate = (e) => {
        navigate(`/admin/update-user/${e}`);
    }
    const handleClickDelete = (e) => {
        const listDelete = checkboxList.filter(checkbox => checkbox.isChecked)
        const list_id = listDelete.map(checkbox => checkbox._id)
        const formData = new FormData();
        formData.append("listId", list_id)
        formData.append("id", user?._id)
        usersApi.deleteUser(formData)
        .then((response) => {
            onClose()
            toast.success(response.data.message)
            setDeleteAccount(!deleteAccount)
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            if (error.response.status === 403) {
                navigate('/forbidden');
            }
        });
    }
    return (
        <>
            <Box maxW="90%" mx={"auto"}>
                <Box backgroundColor="#fff" position={"relative"}>
                    <Box color="rgb(149, 147, 147);">
                        <Heading fontSize="1.25rem" lineHeight={1.2} fontWeight="500" p="16px">DANH SÁCH ACCOUNT</Heading>
                    </Box>
                    {checkDelete &&
                        <Button onClick={onOpen} style={{ position: "absolute", top: "16px", right: "30%" }} _hover={{ opacity: "0.8" }}>
                            <Icon fontSize={"24px"} as={RiDeleteBin6Line} />
                        </Button>
                    }
                    <Flex style={{ position: "absolute", top: "16px", right: "10px" }}>
                        <Input placeholder="Tên đăng nhập" onChange={(e)=>setSearch(e.target.value)} />
                        <Button ml={"2px"} onClick={handleSearchAccount}>Search</Button>
                    </Flex>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Xoá tài khoản</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text>
                                    Bạn có muốn các tài khoản đã đánh dấu hay không?
                                </Text>
                            </ModalBody>

                            <ModalFooter>
                                <Button onClick={handleClickDelete} colorScheme='red' mr={3} >Xoá</Button> 
                                <Button variant='ghost' onClick={onClose}>Huỷ</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    {checkboxList ?
                        <>
                            <TableContainer mt={"16px"}>
                                <Table variant='simple' size={"md"}>
                                    <Thead>
                                        <Tr>
                                            <Th p={"4px 16px"}>
                                                <Checkbox
                                                    isChecked={isCheckedAll}
                                                    onChange={handleCheckboxAllChange}>
                                                </Checkbox>
                                            </Th>
                                            <Th p={"8px 12px"} >STT</Th>
                                            <Th p={"8px 12px"}>Tên đăng nhập</Th>
                                            <Th>Họ và tên</Th>
                                            <Th>Ngày sinh</Th>
                                            <Th maxW={"150px"}>Email</Th>
                                            <Th>Số điện thoại</Th>
                                            <Th>Loại tài khoản</Th>
                                            <Th textAlign={"center"}></Th>
                                        </Tr>
                                    </Thead>
                                    {checkboxList.map((user, index) => {
                                        const date = user?.birthday || null
                                        return (
                                            <Tbody key={index}>
                                                <Tr>
                                                    <Td p={"4px 16px"}>
                                                        <Checkbox
                                                            isChecked={user.isChecked}
                                                            onChange={(event) => handleCheckboxChange(event, index)}
                                                        ></Checkbox>
                                                    </Td>
                                                    <Td p={"8px 16px"}>{index + 1}</Td>
                                                    <Td p={"8px 12px"} fontWeight={"500"} _hover={{ textDecoration: "underline" }} color="blue" ><Link >{user.username}</Link></Td>
                                                    <Td>{user.fullname}</Td>
                                                    <Td>{date && format(new Date(date), 'dd/MM/yyyy')}</Td>
                                                    <Td whiteSpace="break-spaces">{user.extname}</Td>
                                                    <Td>{user.tell}</Td>
                                                    <Td>{user.role === 3 ? "Admin" : user.role === 2 ? "Nhân viên" : "Khách hàng"}</Td>
                                                    <Td>
                                                        <Button colorScheme='green' onClick={() => { handleClickUpdate(user._id) }} mr={"10px"}>Update</Button>
                                                    </Td>
                                                </Tr>
                                            </Tbody>
                                        )
                                    })}
                                </Table>
                            </TableContainer>
                            <Flex p="4" justify={"center"}>
                                <ReactPaginate
                                    previousLabel={'<<'}
                                    nextLabel={'>>'}
                                    breakLabel={"..."}
                                    pageCount={dataUser?.pageLength}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={3}
                                    onPageChange={handlePageClick}
                                    containerClassName={"pagination"}
                                    pageClassName={"page-item"}
                                    pageLinkClassName={"page-link"}
                                    activeClassName={"active"}
                                />
                            </Flex>
                        </> :
                        (<Box h={100}>
                            <Text textAlign={"center"} fontSize="22px">
                                Chưa có dữ liệu
                            </Text>
                        </Box>)
                    }
                </Box>
            </Box>
        </>

    );
}

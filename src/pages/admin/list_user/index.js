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
                const res = await usersApi.listAllUser(currentPage, search);
                const listCheckBox = res?.data.users.map(user => {
                    return {
                        ...user,
                        isChecked: false
                    }
                })
                setIsCheckedAll(false)
                setCheckboxList(listCheckBox)
                setDataUser(res.data);

            } catch (error) {
                toast.error(error.response?.data?.message)
                if (error.status === 403) {
                    navigate('/forbidden');
                }
                setDataUser("")
            }
        })();
    }, [deleteAccount, currentPage, checkSearch]);

    const handleSearchAccount = () => {
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
        const list_id = listDelete.map(checkbox => checkbox.id)
        const formData = {
            listid: [...list_id]
        }
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
                        <Heading fontSize="1.25rem" lineHeight={1.2} fontWeight="500" p="16px">LIST ACCOUNT</Heading>
                    </Box>
                    {checkDelete &&
                        <Button onClick={onOpen} style={{ position: "absolute", top: "16px", right: "30%" }} _hover={{ opacity: "0.8" }}>
                            <Icon fontSize={"24px"} as={RiDeleteBin6Line} />
                        </Button>
                    }
                    <Flex style={{ position: "absolute", top: "16px", right: "10px" }}>
                        <Input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                        <Button ml={"2px"} onClick={handleSearchAccount}>Search</Button>
                    </Flex>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Delete Acount</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text>
                                    Do you want to delete the marked accounts?
                                </Text>
                            </ModalBody>

                            <ModalFooter>
                                <Button onClick={handleClickDelete} colorScheme='red' mr={3} >Delete</Button>
                                <Button variant='ghost' onClick={onClose}>Cancel</Button>
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
                                            <Th p={"8px 12px"} >No.</Th>
                                            <Th p={"8px 12px"}>Email</Th>
                                            <Th>First name</Th>
                                            <Th>Last name</Th>
                                            <Th>Gender</Th>
                                            <Th maxW={"150px"}>birthday</Th>
                                            <Th>Phone</Th>
                                            <Th>Role</Th>
                                            <Th>Create At</Th>
                                            <Th>Update At</Th>
                                            <Th textAlign={"center"}></Th>
                                        </Tr>
                                    </Thead>
                                    {checkboxList.map((user, index) => {
                                        const date = user?.birthday || null
                                        const date1 = user?.createdAt || null
                                        const date2 = user?.updatedAt || null
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
                                                    <Td p={"8px 12px"} fontWeight={"500"} _hover={{ textDecoration: "underline" }} color="blue" ><Link >{user.email}</Link></Td>
                                                    <Td>{user.firstname}</Td>
                                                    <Td>{user.lastname}</Td>
                                                    <Td>{user.gender}</Td>
                                                    <Td>{date && format(new Date(date), 'dd/MM/yyyy')}</Td>
                                                    <Td>{user.phone}</Td>
                                                    <Td>{user.role === 3 ? "Admin" : user.role === 2 ? "Nhân viên" : "Khách hàng"}</Td>
                                                    <Td>{date1 && format(new Date(date1), 'dd/MM/yyyy')}</Td>
                                                    <Td>{date2 && format(new Date(date2), 'dd/MM/yyyy')}</Td>
                                                    <Td>
                                                        <Button colorScheme='green' onClick={() => { handleClickUpdate(user.id) }} mr={"10px"}>Update</Button>
                                                    </Td>
                                                </Tr>
                                            </Tbody>
                                        )
                                    })}
                                </Table>
                            </TableContainer>
                            {
                                dataUser?.pagination?.pageLength > 0 ?
                                    <Flex p="4" justify={"center"}>
                                        <ReactPaginate
                                            previousLabel={'<<'}
                                            nextLabel={'>>'}
                                            breakLabel={"..."}
                                            pageCount={dataUser?.pagination?.pageLength}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={3}
                                            onPageChange={handlePageClick}
                                            containerClassName={"pagination"}
                                            pageClassName={"page-item"}
                                            pageLinkClassName={"page-link"}
                                            activeClassName={"active"}
                                        />
                                    </Flex>
                                    :
                                    <Box mt={50} h={100}>
                                        <Text textAlign={"center"} fontSize="22px">
                                            Not data
                                        </Text>
                                    </Box>
                            }

                        </> :
                        (<Box h={100}>
                            <Text textAlign={"center"} fontSize="22px">
                                Not data
                            </Text>
                        </Box>)
                    }
                </Box>
            </Box>
        </>

    );
}

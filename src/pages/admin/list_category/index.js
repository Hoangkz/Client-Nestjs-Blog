import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Box, Button, Checkbox, Flex, Heading, Text, Icon, useDisclosure, Input } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
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
import itemApi from "../../../API/itemApi";

import update_items from "../../../components/update_items"

export default function ListCategory() {

    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [checkboxList, setCheckboxList] = useState([]);
    const [checkDelete, setCheckDelete] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [dataItems, setDataItems] = useState([])

    const [search, setSearch] = useState("")

    const [checkSearch, setCheckSearch] = useState(false);


    function handlePageClick(selectedPage) {
        setCurrentPage(selectedPage.selected + 1);
    }
    useEffect(() => {
        (async () => {
            setCheckDelete(false)
            try {

                if (checkSearch) {
                    setCheckSearch(!checkSearch)
                    setCurrentPage(1)
                }
                const res = await itemApi.GetAllCategoryAdmin(currentPage, search);
                const listCheckBox = res?.data?.listCategory.map(item => {
                    return {
                        ...item,
                        isChecked: false,
                    }
                })
                setIsCheckedAll(false)
                setCheckboxList(listCheckBox)
                setDataItems(res.data);

            } catch (error) {
                toast.error(error?.response?.data?.message)
                if (error?.response?.status === 403) {
                    navigate('/forbidden');
                    console.log(error)
                }
                setDataItems("")
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
    const dispatch = useDispatch()

    const handleClickUpdate = (e) => {
        dispatch(update_items.actions.update(e))
        navigate(`/admin/update-category`);
    }
    const handleClickDelete = (e) => {
        const listDelete = checkboxList.filter(checkbox => checkbox.isChecked)
        const list_id = listDelete.map(checkbox => checkbox.id)
        const formData = {
            listid: [...list_id]
        }
        itemApi.delete_Category(formData)
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

    const handleClickCreate = (e) => {
        navigate('/admin/create-category');
    }
    return (
        <>
            <Box maxW="90%" mx={"auto"}>
                <Box backgroundColor="#fff" position={"relative"}>
                    <Box color="rgb(149, 147, 147);">
                        <Heading fontSize="1.25rem" lineHeight={1.2} fontWeight="500" p="16px">LIST CATEGORY</Heading>
                    </Box>
                    <Flex style={{ position: "absolute", top: "16px", right: "10px" }}>
                        <Box>
                            {checkDelete &&
                                <Button onClick={onOpen} _hover={{ opacity: "0.8" }}>
                                    <Icon fontSize={"24px"} as={RiDeleteBin6Line} />
                                </Button>
                            }
                        </Box>
                        <Box m={"0 8px"}>
                            <Button onClick={handleClickCreate} colorScheme={"blue"}>Create Category</Button>
                        </Box>
                        <Flex>
                            <Input placeholder="Category" onChange={(e) => setSearch(e.target.value)} />
                            <Button ml={"2px"} onClick={handleSearchAccount}>Search</Button>
                        </Flex>
                    </Flex>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Delete Category</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text>
                                    Do you want to delete marked Category?
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
                                            <Th p={"8px 12px"}>Name item</Th>
                                            <Th>Image</Th>
                                            <Th>Create At</Th>
                                            <Th>Update At</Th>
                                            <Th p={0} ></Th>
                                        </Tr>
                                    </Thead>
                                    {checkboxList.map((item, index) => {
                                        const date = item?.createdAt || null
                                        const date1 = item?.updatedAt || null
                                        return (
                                            <Tbody key={index}>
                                                <Tr>
                                                    <Td p={"4px 16px"}>
                                                        <Checkbox
                                                            isChecked={item.isChecked}
                                                            onChange={(event) => handleCheckboxChange(event, index)}
                                                        ></Checkbox>
                                                    </Td>
                                                    <Td p={"8px 16px"}>{index + 1}</Td>
                                                    <Td p={"8px 12px"} fontWeight={"500"} _hover={{ textDecoration: "underline" }} color="blue" ><Link to={`/list-items/${item.id}`} >{item.name}</Link></Td>
                                                    <Td ><img width="50px" src={`${process.env.REACT_APP_API_URL}/${item?.thumbnail}`} /></Td>

                                                    <Td>{date && format(new Date(date), 'dd/MM/yyyy')}</Td>
                                                    <Td>{date && format(new Date(date1), 'dd/MM/yyyy')}</Td>
                                                    <Td p={"0"}>
                                                        <Button colorScheme='green' onClick={() => { handleClickUpdate(item) }} mr={"10px"}>Update</Button>
                                                    </Td>
                                                </Tr>
                                            </Tbody>
                                        )
                                    })}
                                </Table>
                            </TableContainer>
                            {dataItems?.pagination?.pageLength > 0 ?
                                <Flex p="4" justify={"center"}>
                                    <ReactPaginate
                                        previousLabel={'<<'}
                                        nextLabel={'>>'}
                                        breakLabel={"..."}
                                        pageCount={dataItems?.pagination?.pageLength}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={3}
                                        onPageChange={handlePageClick}
                                        containerClassName={"pagination"}
                                        pageClassName={"page-item"}
                                        pageLinkClassName={"page-link"}
                                        activeClassName={"active"}
                                    />
                                </Flex>
                                : (<Box mt={100} h={100}>
                                    <Text textAlign={"center"} fontSize="22px">
                                        Not data
                                    </Text>
                                </Box>)

                            }

                        </> :
                        (<Box h={100}>
                            <Text textAlign={"center"} fontSize="22px">
                                Not data
                            </Text>
                        </Box>)
                    }
                </Box>
            </Box >
        </>

    );
}

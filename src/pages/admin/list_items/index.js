import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Box, Button, Checkbox, Flex, Heading, Text, Icon, useDisclosure, Input } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { tokenRemainingSelector } from "../../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
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

export default function ListUser() {

    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [checkboxList, setCheckboxList] = useState([]);
    const [checkDelete, setCheckDelete] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const user = useSelector(tokenRemainingSelector).user;

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
                // const formData = new FormData();
                // formData.append('id', user?.id);
                // formData.append('search', search);

                if (checkSearch) {
                    setCheckSearch(!checkSearch)
                    setCurrentPage(1)
                }
                const res = await itemApi.GetListItems(currentPage);
                const listCheckBox = res?.data?.data.map(item => {
                    return {
                        ...item,
                        isChecked: false
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
        navigate(`/admin/update-items`);
    }
    const handleClickDelete = (e) => {
        const listDelete = checkboxList.filter(checkbox => checkbox.isChecked)
        const list_id = listDelete.map(checkbox => checkbox._id)
        const formData = new FormData();
        formData.append("listId", list_id)
        formData.append("id", user?._id)
        itemApi.delete_Items(formData)
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
        navigate('/admin/create-items');
    }
    return (
        <>
            <Box maxW="90%" mx={"auto"}>
                <Box backgroundColor="#fff" position={"relative"}>
                    <Box color="rgb(149, 147, 147);">
                        <Heading fontSize="1.25rem" lineHeight={1.2} fontWeight="500" p="16px">LIST ITEMS</Heading>
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
                            <Button onClick={handleClickCreate} colorScheme={"blue"}>Thêm vật phẩm</Button>
                        </Box>
                        <Flex>
                            <Input placeholder="Tên vật phẩm" onChange={(e) => setSearch(e.target.value)} />
                            <Button ml={"2px"} onClick={handleSearchAccount}>Search</Button>
                        </Flex>
                    </Flex>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Xoá vật phẩm</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text>
                                    Bạn có muốn các vật phẩm đã đánh dấu hay không?
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
                                            <Th p={"8px 12px"} >No.</Th>
                                            <Th p={"8px 12px"}>Name item</Th>
                                            <Th>Quatity</Th>
                                            <Th>Description</Th>
                                            <Th>Create At</Th>
                                            <Th>Update At</Th>
                                            <Th p={0} ></Th>
                                        </Tr>
                                    </Thead>
                                    {checkboxList.map((item, index) => {
                                        console.log(item)
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
                                                    <Td p={"8px 12px"} fontWeight={"500"} _hover={{ textDecoration: "underline" }} color="blue" ><Link >{item.name}</Link></Td>
                                                    <Td>{item.quatity}</Td>
                                                    <Td>{item.description}</Td>
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

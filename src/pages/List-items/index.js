import { Box, Flex, Heading, Image, Icon, Text } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import "./List-items.css";
import { useEffect, useState } from "react";
import itemApi from "../../API/itemApi";
import ReactPaginate from "react-paginate";
export default function ListItems() {
    const { slug } = useParams();
    const slugUrl = slug
    const [dataItem, setDataItem] = useState()
    console.log("Vao day")
    const [currentPage, setCurrentPage] = useState(1);

    function handlePageClick(selectedPage) {
        setCurrentPage(selectedPage.selected + 1);
    }
    useEffect(() => {
        (async () => {
            try {
                const res = await itemApi.GetListItems(slugUrl, currentPage);
                setDataItem(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [currentPage]);
    return (
        <>
            <Box maxW="80%" mx={"auto"}>
                <Flex>
                    <Box>
                        <Link className="homeItem" to="/" style={{ "color": "#fe6433", "marginLeft": "12px", "fontSize": "16px" }}>Home</Link>
                    </Box>
                    <Box>
                        <Icon as={AiOutlineRight} />
                    </Box>
                    <Box>
                        Danh sách
                    </Box>
                </Flex>
                <Box backgroundColor="#fff">
                    <Box color="rgb(149, 147, 147);">
                        <Heading fontSize="1.25rem" lineHeight={1.2} fontWeight="500" p="16px">DANH SÁCH SẢN PHẨM</Heading>
                    </Box>
                    {(dataItem?.items) ?
                        <>
                            {
                                dataItem?.pageLength ?
                                    <>
                                        <Flex flexWrap={"wrap"} mx="1px">
                                            {dataItem?.items.map((item, index) => {
                                                return (
                                                    <Box m={2} key={index} className="danhmuchover" border="1px solid rgba(0,0,0,.125)" w="180px" borderRadius="0.25rem">
                                                        <Link to={`/items/${item?.name}`}>
                                                            <Image src={item?.img} minH="180px" minW="180px" w="180px" alt={item?.name} border="1px solid #ccc"></Image>
                                                            <Box fontSize="1.2rem" fontWeight={500} className="col" w="180px" textAlign={"center"} color="black">
                                                                {item?.name}
                                                            </Box>
                                                            <Text color="rgb(142, 138, 138)" m="4px auto" textAlign={"center"}>{item?.description}</Text>
                                                            <Text className="item_gia" fontSize="1rem" color="black" fontWeight={500} textAlign={"center"}>Giá: {item?.gia}</Text>
                                                        </Link>
                                                    </Box>
                                                )
                                            })}
                                        </Flex>
                                        <Flex p="4" justify={"center"}>
                                            <ReactPaginate
                                                previousLabel={'<<'}
                                                nextLabel={'>>'}
                                                breakLabel={"..."}
                                                pageCount={dataItem?.pageLength}
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
                        </>
                        : (<Box h={100}>
                            <Text textAlign={"center"} fontSize="22px">
                                Chưa có dữ liệu
                            </Text>
                        </Box>)
                    }
                </Box>
            </Box>
        </>
    )
}
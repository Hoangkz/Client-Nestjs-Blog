import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./home.css"
import shopApi from "../../API/itemApi";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
export default function Home() {

    const [dataItem, setDataItem] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected + 1);
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await shopApi.home(currentPage);
                setDataItem(res.data);
            } catch (error) {
                setDataItem(null);
            }
        })();
    }, [currentPage]);
    return (
        <>
            <Box pt={5}>
                <Box backgroundColor="#fff" maxW="80%" mx={"auto"}>
                    <Box color="rgb(149, 147, 147);">
                        <Heading fontSize="1.25rem" lineHeight={1.2} fontWeight="500" p="16px" m={0}>DANH MỤC</Heading>
                    </Box>
                    <Flex flexWrap={"wrap"} justify="space-around">
                        {/* {dataDanhMuc.map((item, index) => {
                            return (
                                <Box key={index} className="danhmuchover" border="1px solid rgba(0,0,0,.125)" w="126px" borderRadius="0.25rem">
                                    <Link to={`/list-items/${item?.desc}`}>
                                        <Image src={item?.img} w="124px"></Image>
                                        <Box className="col" w="124px" textAlign={"center"} color="black">
                                            {item?.desc}
                                        </Box>
                                    </Link>
                                </Box>
                            )
                        })} */}
                    </Flex>
                </Box>
            </Box>

            <Box backgroundColor="antiquewhite" pt={50} >
                <Box backgroundColor="#fff" maxW="80%" mx={"auto"}>
                    <Box color="rgb(149, 147, 147);">
                        <Heading fontSize="1.25rem" lineHeight={1.2} fontWeight="500" p="16px" m={0}>DANH SÁCH SẢN PHẨM</Heading>
                    </Box>
                    {(dataItem?.items) ?
                        <>
                            {currentPage - 1 < dataItem?.pageLength ?
                                <>
                                    <Flex flexWrap={"wrap"} m="0 30px">
                                        {dataItem?.items.map((item, index) => {
                                            return (
                                                <Box m="0 2px" key={index} className="danhmuchover" border="1px solid rgba(0,0,0,.125)" w="135px" borderRadius="0.25rem">
                                                    <Link to={`/items/${item?.name}`}>
                                                        <Image border="1px solid #ccc" src={item?.img} minH="135px" minW="135px" w="135px" alt={item?.name}></Image>
                                                        <Box mt={8} className="col" w="135px" textAlign={"center"} color="black">
                                                            {item?.name}
                                                        </Box>
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
                                </> : ((<Box h={150}>
                                    <Text textAlign={"center"} fontSize="22px">
                                        Chưa có dữ liệu
                                    </Text>
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
                                </Box>))
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
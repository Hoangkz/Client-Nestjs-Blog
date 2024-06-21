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
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNation, setPageNation] = useState(1);
    const [catogery, setcatogery] = useState("List");

    function handlePageClick(selectedPage) {
        setCurrentPage(selectedPage.selected + 1);
    }
    useEffect(() => {
        (async () => {
            try {

                const res = await itemApi.GetItemByCategoryId(slugUrl, currentPage);
                setDataItem(res.data.items);
                setcatogery(res.data?.category?.name)
                setPageNation(res.data.pagination)
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
                        {catogery}
                    </Box>
                </Flex>
                <Box backgroundColor="#fff">
                    <Box color="rgb(149, 147, 147);">
                        <Heading fontSize="1.25rem" lineHeight={1.2} fontWeight="500" p="16px">LIST ITEM</Heading>
                    </Box>
                    {(dataItem) ?
                        <>
                            {
                                pageNation?.pageLength ?
                                    <>
                                        <Flex flexWrap={"wrap"} mx="1px" ml={8} justify={dataItem.length >= 7 ? "center" : "start"} >
                                            {dataItem.map((item, index) => {
                                                return (
                                                    <Box m={2} key={index} className="danhmuchover" border="1px solid rgba(0,0,0,.125)" w="180px" borderRadius="0.25rem">
                                                        <Link to={`/items/${item?.id}`}>
                                                            <Image src={process.env.REACT_APP_API_URL + "/" + item?.imageitem} minH="180px" minW="180px" w="180px" alt={item?.name} border="1px solid #ccc"></Image>
                                                            <Box fontSize="1.2rem" fontWeight={500} className="col" w="180px" textAlign={"center"} color="black">
                                                                {item?.name}
                                                            </Box>
                                                            <Text color="rgb(142, 138, 138)" m="4px auto" textAlign={"center"}>{item?.description}</Text>
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
                                                pageCount={pageNation?.pageLength}
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
                                            Not Data
                                        </Text>
                                    </Box>)
                            }
                        </>
                        : (<Box h={100}>
                            <Text textAlign={"center"} fontSize="22px">
                                Not Data
                            </Text>
                        </Box>)
                    }
                </Box>
            </Box>
        </>
    )
}
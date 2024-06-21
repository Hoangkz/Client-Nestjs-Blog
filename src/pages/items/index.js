import { Box, Flex, Image, Icon, Text } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { AiFillLike, AiOutlineRight } from "react-icons/ai";
import "./item.css";
import { useEffect, useState } from "react";
import itemApi from "../../API/itemApi";
import { BsFacebook, BsInstagram, BsMessenger, BsTwitter } from "react-icons/bs";
export default function ListItems() {
    const { slug } = useParams();
    const [dataItem, setDataItem] = useState()
    const [isActive, setIsActive] = useState(false);

    const toggleClass = () => {
        setIsActive(!isActive);
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await itemApi.get_items(slug);
                setDataItem(res.data);
                console.log(res.data)
            } catch (error) {
                console.log(error);
            }
        })();
    }, [slug]);
    return (
        <>
            <Box>
                <Box maxW="80%" mx={"auto"}>
                    <Flex>
                        <Box >
                            <Link className="homeItem" to="/" style={{ "color": "#fe6433", "marginLeft": "12px", "fontSize": "16px" }}>Home</Link>
                        </Box>
                        <Box>
                            <Icon as={AiOutlineRight} />
                        </Box>
                        {dataItem?.category?.id ?
                            <>
                                <Box>
                                    <Link className="homeItem" to={`/list-items/${dataItem?.category.id}`} style={{ "color": "#fe6433", "fontSize": "16px" }}>{dataItem?.category.name}</Link>
                                </Box>
                                <Box>
                                    <Icon as={AiOutlineRight} />
                                </Box>
                            </> : (null)
                        }
                        <Box>
                            {dataItem?.name ? dataItem?.name : (slug)}
                        </Box>
                    </Flex>
                    <Box backgroundColor="#fff" minW="400px">
                        {(dataItem) ?
                            <>
                                <Flex flexWrap={"wrap"} minW="400px">
                                    <Box w="45%" minW="400px">
                                        <Flex justify={"center"} m={"3rem"}>
                                            <Image w="100%" maxW="400px" minW="200px"
                                                src={process.env.REACT_APP_API_URL + "/" + dataItem?.imageitem}
                                            />
                                        </Flex>
                                        <Box mt="-30px" textAlign={"center"} mb="50px">
                                            <Flex textAlign={"center"} alignItems="center" justify={"center"}>
                                                <Box fontWeight={500}>Chia sẻ :</Box>
                                                <Link to="https://www.facebook.com/messages" rel="noreferrer">
                                                    <Icon fontSize={24} m="0 6px" mt="-10px" color="blue" as={BsFacebook} />
                                                </Link>
                                                <Link to="https://www.facebook.com" rel="noreferrer">
                                                    <Icon fontSize={24} m="0 6px" mt="-10px" color="blue" as={BsMessenger} />
                                                </Link>
                                                <Link to="https://www.instagram.com/" rel="noreferrer">
                                                    <Icon fontSize={24} m="0 6px" mt="-10px" color="red" as={BsInstagram} />
                                                </Link>
                                                <Link to="https://twitter.com" rel="noreferrer">
                                                    <Icon fontSize={24} m="0 6px" mt="-10px" color="#007bff" as={BsTwitter} />
                                                </Link>
                                                <Box onClick={toggleClass} cursor={"pointer"} m="0 12px">
                                                    <Icon fontSize={24} m="0 6px" mt="-10px" className={isActive ? 'colorBlue' : (null)} color={"#bdb8b8"} as={AiFillLike} />
                                                    <span fontWeight={500} fontSize="1.3rem" color={"Black"}>Like</span>
                                                </Box>
                                            </Flex>
                                        </Box>
                                    </Box>
                                    <Box w="55%" backgroundColor="rgb(255, 250, 250)" minW={400}>
                                        <Box m={"12px 24px"} >
                                            <Text textAlign={"center"} fontSize="2rem" fontWeight={500}>
                                                {dataItem?.name}
                                            </Text>
                                            <Flex>
                                                <Box m="8px 32px 16px 0">Description</Box>
                                                <Box color="rgb(171, 165, 165)" fontSize="1.75rem" fontWeight={600} lineHeight={1.2}>{dataItem?.description}</Box>
                                            </Flex>

                                            <Flex>
                                                <Box m="8px 32px 16px 0">Số lượng</Box>

                                                <Box ml="24px" mt={2} fontWeight={"bold"}>{dataItem?.quatity}</Box>
                                            </Flex>

                                        </Box>
                                    </Box>
                                </Flex>
                            </>
                            : (<Box h={100}>
                                <Text textAlign={"center"} fontSize="22px">
                                    Chưa có dữ liệu
                                </Text>
                            </Box>)
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}
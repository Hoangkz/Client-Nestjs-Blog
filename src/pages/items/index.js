import { Box, Flex, Image, Icon, Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Stack } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { AiFillLike, AiOutlineRight } from "react-icons/ai";
import "./item.css";
import { useEffect, useState } from "react";
import shopApi from "../../API/shopApi";
import { BsFacebook, BsInstagram, BsMessenger, BsTwitter } from "react-icons/bs";
import ModalAddItems from "./modal_add_items"
import ModalBuyItems from "./modal_buy_items"
import { tokenRemainingSelector } from "../../redux/selectors";
import { useSelector } from "react-redux";
export default function ListItems() {
    const { slug } = useParams();
    const [dataItem, setDataItem] = useState()
    const [isActive, setIsActive] = useState(false);
    const [countItem, setCountItem] = useState(1);
    const userName = useSelector(tokenRemainingSelector)?.user;
    const toggleClass = () => {
        setIsActive(!isActive);
    }
    const handleChangeValue = (e) => {
        setCountItem(e)
    }
    useEffect(() => {
        (async () => {
            try {
                const res = await shopApi.showItems(slug);
                setDataItem(res.data);
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
                        {dataItem?.item?.loai ?
                            <>
                                <Box>
                                    <Link className="homeItem" to={`/list-items/${dataItem?.item?.loai}`} style={{ "color": "#fe6433", "fontSize": "16px" }}>{dataItem?.item?.loai}</Link>
                                </Box>
                                <Box>
                                    <Icon as={AiOutlineRight} />
                                </Box>
                            </> : (null)
                        }
                        <Box>
                            {dataItem?.item?.name ? dataItem?.item?.name : (slug)}
                        </Box>
                    </Flex>
                    <Box backgroundColor="#fff" minW="400px">
                        {(dataItem?.item) ?
                            <>
                                <Flex flexWrap={"wrap"} minW="400px">
                                    <Box w="45%" minW="400px">
                                        <Flex justify={"center"} m={"3rem"}>
                                            <Image w="100%" maxW="400px" minW="200px"
                                                src={dataItem?.item?.img}
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
                                                {dataItem?.item?.name}
                                            </Text>
                                            <Flex>
                                                <Box m="8px 32px 16px 0">Giá</Box>
                                                <Box color="#fe6433" fontSize="1.75rem" fontWeight={500} lineHeight={1.2}>{dataItem?.item?.gia}đ</Box>
                                            </Flex>
                                            <Flex>
                                                <Box m="8px 32px 16px 0">Chi tiết</Box>
                                                <Box color="rgb(171, 165, 165)" fontSize="1.75rem" fontWeight={600} lineHeight={1.2}>{dataItem?.item?.description}</Box>
                                            </Flex>
                                            <Flex>
                                                <Box m="8px 32px 16px 0">Vân chuyển</Box>
                                                <Box mt={2} fontSize="1.2rem" lineHeight={1.1}>{userName?.address?(userName?.address?.charAt(0).toUpperCase()+userName?.address.slice(1)):"??"}</Box>
                                            </Flex>
                                            <Flex>
                                                <Box m="8px 32px 16px 0">Số lượng</Box>
                                                <Stack shouldWrapChildren direction='row'>
                                                    <NumberInput size='md' onChange={handleChangeValue} maxW={20} defaultValue={1} min={0} max={dataItem?.item?.soluong}>
                                                        <NumberInputField />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                </Stack>
                                                <Box ml="24px" mt={4} fontWeight={350}>{dataItem?.item?.soluong} Sản phẩm có sẵn</Box>
                                            </Flex>
                                            <Flex mt={2}>
                                                <Box m="8px 32px 16px 0">Phí ship</Box>
                                                <Box color="#28a745" fontSize="1.75rem" fontWeight={600} lineHeight={1.2}>Miễn phí</Box>
                                            </Flex>
                                            <Flex my={4}>
                                                <ModalAddItems user ={userName} item = {dataItem?.item} count ={countItem} />
                                                <Box m={"0 8px"}></Box>
                                                <ModalBuyItems user ={userName} item = {dataItem?.item} count ={countItem}/>
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
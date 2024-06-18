import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button, Select } from '@chakra-ui/react'
import { startTransition, useState } from "react";
import { toast } from "react-toastify";
import shopApi from "../../../API/shopApi";
import { tokenRemainingSelector } from "../../../redux/selectors";
import { useSelector } from "react-redux";
export default function CreateItems() {
    const [nameSP, setNameSP] = useState();
    const [descSP, setDescSP] = useState();
    const [linkIMG, setLinkIMG] = useState();
    const [donGia, setDonGia] = useState();
    const [soLuong, setSoLuong] = useState();

    const [checkDonGia, setCheckDonGia] = useState(false);
    const [checkSoLuong, setCheckSoLuong] = useState(false);
    const dataUser = useSelector(tokenRemainingSelector).user;

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (!donGia) {
            setCheckDonGia(true)
        }
        else {
            setCheckDonGia(false)

        }
        if (!soLuong) {
            setCheckSoLuong(true)
        }
        else {
            setCheckSoLuong(false)
        }

        if (nameSP && descSP && linkIMG && donGia && soLuong) {
            const formData = new FormData();
            formData.append('id', dataUser._id)
            formData.append('name', nameSP)
            formData.append('description', descSP)
            formData.append('img', linkIMG)
            formData.append('gia', donGia)
            formData.append('soluong', soLuong)
            shopApi.create_Items(formData)
                .then((response) => {
                    toast.success(response.data.message)
                })
                .catch((error) => {
                    toast.error(error.response.data.message)
                });
        }
        else {
            toast.error("Hãy nhập đầy đủ các trường")
        }
    }

    const handleClickGoBack = () => {
        startTransition(() => {
            window.history.back();
        });
    }
    return (
        <>
            <Box>
                <form onSubmit={handleSubmitForm}>
                    <Box w="80%" maxW="800px" mx={"auto"}>
                        <Text fontSize={"28px"} fontWeight={600} >Đăng Sản Phẩm</Text>
                        <Box mt={"10px"}>
                            <label htmlFor="name" fontSize={"16px"} >Tên sản phẩm</label>
                            <Input id="name" onChange={(e) => setNameSP(e.target.value)} backgroundColor='#fff' mt={"10px"} />
                        </Box>
                        <Box mt={"10px"}>
                            <label htmlFor="desc" fontSize={"16px"} >Mô tả</label>
                            <Input id="desc" backgroundColor='#fff' onChange={(e) => setDescSP(e.target.value)} mt={"10px"} />
                        </Box>
                        <Box mt={"10px"}>
                            <label htmlFor="loaisp" fontSize={"16px"} >Loại sản phẩm</label>
                            {/* <Select id="loaisp" backgroundColor='#fff' onChange={(e) => setLoaiSP(e.target.value)} mt={"10px"}>
                                {danhmuc && danhmuc.map((data, index) => {
                                    return (
                                        <option value={data?.desc} key={index}>{data?.desc}</option>
                                    )
                                })}
                            </Select> */}
                        </Box>
                        <Box mt={"10px"}>
                            <label htmlFor="img" fontSize={"16px"} >Link ảnh</label>
                            <Input id="img" backgroundColor='#fff' onChange={(e) => setLinkIMG(e.target.value)} mt={"10px"} />
                        </Box>
                        <Box mt={"10px"}>
                            <label htmlFor="gia" fontSize={"16px"} >Đơn giá</label>
                            <Input isInvalid={checkDonGia} id="gia" backgroundColor='#fff' onChange={(e) => setDonGia(parseInt(e.target.value))} mt={"10px"} />
                        </Box>
                        <Box mt={"10px"}>
                            <label htmlFor="soluong" fontSize={"16px"} >Số lượng</label>
                            <Input isInvalid={checkSoLuong} id="soluong" backgroundColor='#fff' onChange={(e) => setSoLuong(parseInt(e.target.value))} mt={"10px"} />
                        </Box>
                        <Flex>
                            <Button type="submit" colorScheme='teal' mt={"10px"}>Thêm sản phẩm</Button>
                            <Button mt={"10px"} ml="8px" onClick={handleClickGoBack}>Trở lại</Button>
                        </Flex>
                    </Box>
                </form>
            </Box>
        </>
    )

}
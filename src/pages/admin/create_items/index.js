import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button, Select } from '@chakra-ui/react'
import { startTransition, useEffect, useState } from "react";
import { toast } from "react-toastify";
import itemApi from "../../../API/itemApi";
export default function CreateItems() {
    const [nameSP, setNameSP] = useState('');
    const [descSP, setDescSP] = useState('');
    const [category, setCategory] = useState();
    const [linkIMG, setLinkIMG] = useState(null);
    const [soLuong, setSoLuong] = useState(0);
    const [checkSoLuong, setCheckSoLuong] = useState(false);

    const [imageDefault, setImageDefault] = useState(null);

    const [listCategory, setListCategory] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await itemApi.GetAllCategory();
            setListCategory(res.data);
            setCategory(listCategory[0]?.id || null)
        })();
    }, [])

    useEffect(() => {
        if (listCategory.length > 0) {
            setCategory(listCategory[0]?.id || '');
        }
    }, [listCategory]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLinkIMG(file);
            setImageDefault(URL.createObjectURL(file))
        } else {
            console.log("No file selected");
        }
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (!soLuong) {
            setCheckSoLuong(true)
        }
        else {
            setCheckSoLuong(false)
        }

        if (nameSP && descSP) {
            const formData = new FormData();
            formData.append('name', nameSP);
            formData.append('description', descSP);
            formData.append('category', category);
            formData.append('imageitem', linkIMG);
            formData.append('quatity', soLuong);

            itemApi.create_Items(formData)
                .then((response) => {
                    toast.success(response.data.message)
                    setNameSP("")
                    setDescSP("")
                    setSoLuong(0)
                })
                .catch((error) => {
                    toast.error(error.response.data.message)
                });
        }
        else {
            toast.error("Please fill in all the fields")
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
                        <Text fontSize={"28px"} fontWeight={600} >Create Item</Text>
                        <Box mt={"10px"}>
                            <label htmlFor="name" fontSize={"16px"} >Name item</label>
                            <Input id="name" value={nameSP} onChange={(e) => setNameSP(e.target.value)} backgroundColor='#fff' mt={"10px"} />
                        </Box>
                        <Box mt={"10px"}>
                            <label htmlFor="desc" fontSize={"16px"} >Description</label>
                            <Input id="desc" value={descSP} backgroundColor='#fff' onChange={(e) => setDescSP(e.target.value)} mt={"10px"} />
                        </Box>
                        <Box mt={"10px"}>
                            <label htmlFor="loaisp" fontSize={"16px"} >Category</label>
                            <Select id="loaisp" backgroundColor='#fff' onChange={(e) => setCategory(e.target.value)} mt={"10px"}>
                                {listCategory && listCategory.map((data, index) => {
                                    return (
                                        <option value={data?.id} key={index}>{data?.name}</option>
                                    )
                                })}
                            </Select>
                        </Box>
                        <Box mt="10px">
                            <label htmlFor="img" style={{ fontSize: "16px" }}>Choose image</label>
                            {imageDefault && (
                                <Box tranpetion mt="10px">
                                    <img src={imageDefault} alt="Selected" style={{ width: '200px', maxWidth: '200px' }} />
                                </Box>
                            )}
                            <Input
                                id="img"
                                type="file"
                                accept="image/*"
                                backgroundColor='#fff'
                                onChange={handleImageChange}
                                border="1px solid transparent"
                                mt="10px"
                            />
                        </Box>
                        <Box mt={"10px"}>
                            <label htmlFor="soluong" fontSize={"16px"} >Quatity</label>
                            <Input isInvalid={checkSoLuong} value={soLuong} id="soluong" backgroundColor='#fff' onChange={(e) => setSoLuong(parseInt(e.target.value))} mt={"10px"} />
                        </Box>
                        <Flex>
                            <Button type="submit" colorScheme='teal' mt={"10px"}>Submit</Button>
                            <Button mt={"10px"} ml="8px" onClick={handleClickGoBack}>Back</Button>
                        </Flex>
                    </Box>
                </form>
            </Box>
        </>
    )

}
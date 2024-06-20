import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button } from '@chakra-ui/react'
import { startTransition, useState } from "react";
import { toast } from "react-toastify";
import { updateItemsSelector } from "../../../redux/selectors";
import { useSelector } from "react-redux";
import itemApi from "../../../API/itemApi";
export default function UpdateCategory() {

    const dataItems = useSelector(updateItemsSelector);
    console.log(dataItems)
    const [nameSP, setNameSP] = useState(dataItems?.name);
    const [linkIMG, setLinkIMG] = useState();
    const [imageDefault, setImageDefault] = useState(process.env.REACT_APP_API_URL + "/" + dataItems?.thumbnail);

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

        if (nameSP) {
            const formData = new FormData();
            formData.append('name', nameSP)
            formData.append('thumbnail', linkIMG)
            itemApi.update_Category(dataItems.id, formData)
                .then((response) => {
                    toast.success(response?.data?.message)
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.message)
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
                        <Text fontSize={"28px"} fontWeight={600} color={"#fe6433"} >{nameSP}</Text>
                        <Box mt={"10px"}>
                            <label htmlFor="name" fontSize={"16px"} >Name item</label>
                            <Input id="name" defaultValue={nameSP} onChange={(e) => setNameSP(e.target.value)} backgroundColor='#fff' mt={"10px"} />
                        </Box>
                        <Box mt={"10px"}>
                            {imageDefault && (
                                <Box mt="10px">
                                    <img src={imageDefault} alt="Selected" style={{ width: '200px', maxWidth: '200px' }} />
                                </Box>
                            )}
                            <label htmlFor="img" style={{ fontSize: "16px" }}>Choose image</label>

                            <Input
                                id="img"
                                type="file"
                                accept="image/*"
                                backgroundColor='#fff'
                                onChange={handleImageChange}
                                mt="10px"
                            />

                        </Box>
                        <Flex>
                            <Button type="submit" colorScheme='teal' mt={"10px"}>Update</Button>
                            <Button mt={"10px"} ml="8px" onClick={handleClickGoBack}>Back</Button>
                        </Flex>
                    </Box>
                </form>
            </Box>
        </>
    )

}
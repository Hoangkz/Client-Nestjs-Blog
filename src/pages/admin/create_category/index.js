import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button, Select } from '@chakra-ui/react'
import { startTransition, useEffect, useState } from "react";
import { toast } from "react-toastify";
import itemApi from "../../../API/itemApi";
import { tokenRemainingSelector } from "../../../redux/selectors";
import { useSelector } from "react-redux";
export default function CreateCategory() {
    const [nameSP, setNameSP] = useState('');
    const [linkIMG, setLinkIMG] = useState(null);


    const dataUser = useSelector(tokenRemainingSelector).user;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLinkIMG(file);
        } else {
            console.log("No file selected");
        }
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (nameSP) {
            const formData = new FormData();
            formData.append('name', nameSP);
            formData.append('thumbnail', linkIMG);

            itemApi.create_Category(formData)
                .then((response) => {
                    toast.success(response.data.message)
                    setNameSP("")
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
                        <Text fontSize={"28px"} fontWeight={600} >Create Category</Text>
                        <Box mt={"10px"}>
                            <label htmlFor="name" fontSize={"16px"} >Name category</label>
                            <Input id="name" value={nameSP} onChange={(e) => setNameSP(e.target.value)} backgroundColor='#fff' mt={"10px"} />
                        </Box>

                        <Box mt="10px">
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
                            <Button type="submit" colorScheme='teal' mt={"10px"}>Submit</Button>
                            <Button mt={"10px"} ml="8px" onClick={handleClickGoBack}>Back</Button>
                        </Flex>
                    </Box>
                </form>
            </Box>
        </>
    )

}
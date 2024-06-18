import { Button, Input, ModalFooter } from "@chakra-ui/react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import usersApi from "../../../API/usersApi";

export default function ForgotPassword() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const [email, setEmail] = useState("");
    const [account, setAccount] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if(email && account){
            const formData = new FormData();
            formData.append('email', email);
            formData.append('account', account);
            usersApi.forgotpassword(formData)
                .then(response => {
                    toast.success(response.data.message);
                    setEmail("")
                    onClose();
                })
                .catch(error => {
                    toast.error(error.response.data.message);
                })
            }
        else{
            toast.error("Hãy nhập email tài khoản của bạn");
        }
    };

    return (
        <>
            <Link onClick={onOpen} type="none" style={{ 'margin': "0 8px", "color": "#ea4d2d", "fontWeight": "700" }} className="linkSupport">
                Quên mật khẩu
            </Link>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Quên mật khẩu</ModalHeader>
                    <ModalCloseButton />
                        <ModalBody>
                            <label htmlFor="email">Tên tài khoản</label>
                            <Input
                                id="email"
                                type="text"
                                placeholder="Tên tài khoản"
                                onChange={(e) => setAccount(e.target.value)}
                                mt="10px"
                                mb="10px"
                            />
                            <label htmlFor="email">Email</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                mt="10px"
                            />
                        </ModalBody>
                        <ModalFooter >
                            <Button onClick={handleSubmit} colorScheme='blue' mr={3}>Lấy lại</Button>
                            <Button onClick={onClose}>
                                Đóng
                            </Button>
                        </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}

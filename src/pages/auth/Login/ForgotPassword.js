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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            const formData = new FormData();
            formData.append('email', email);
            usersApi.forgotpassword(formData)
                .then(response => {
                    toast.success(response.data.message);
                    setEmail("")
                    onClose();
                })
                .catch(error => {
                    console.log(error)
                    toast.error(error.response.data.message);
                })
        }
        else {
            toast.error("Please enter your account email");
        }
    };

    return (
        <>
            <Link onClick={onOpen} type="none" style={{ 'margin': "0 8px", "color": "#ea4d2d", "fontWeight": "700" }} className="linkSupport">
                Forgot Password
            </Link>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> Forgot Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <label htmlFor="email">Email</label>
                        <Input
                            id="email"
                            type="text"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            mt="10px"
                            mb="10px"
                        />

                    </ModalBody>
                    <ModalFooter >
                        <Button onClick={handleSubmit} colorScheme='blue' mr={3}>Reset Password</Button>
                        <Button onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}

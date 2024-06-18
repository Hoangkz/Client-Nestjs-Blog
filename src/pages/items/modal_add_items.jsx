import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Icon,
  Box,
  Flex,
  Image,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import buyApi from "../../API/buyApi";

export default function ManualClose(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if(props.user){
      const id_user = props?.user?._id;
      const id_item = props?.item?._id;
      const soluong = props?.count;
      const gia = props?.item?.gia;
      const tong_gia = props?.item?.gia * props?.count;
      const formData = new FormData();
      formData.append("user_id", id_user);
      formData.append("item_id", id_item);
      formData.append("soluong", soluong);
      formData.append("gia", gia);
      formData.append("tong_gia", tong_gia);
      buyApi.Cart_Items(formData)
        .then((response) => {
          toast.success(response.data.message);
          onClose();
          navigate(`/carts`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
    else{
      toast.error("Bạn cần phải đăng nhập trước")
      navigate(`/auth/login?next-page=${location.pathname}`);
    }
  };

  return (
    <>
      <Button
        colorScheme="teal"
        size="lg"
        onClick={props?.count > 0 ? onOpen : null}
      >
        <Icon as={AiOutlineShoppingCart} mr="2px" />
        Thêm vào giỏ hàng
      </Button>
      <Modal isOpen={isOpen} size="lg" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={"#fe6433"}> {props?.item?.name}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmitForm}>
            <ModalBody pb={"12px"}>
              <Flex>
                <Box margin={"15px auto"}>
                  <Image w={"200px"} src={props?.item?.img} />
                </Box>
                <Box margin={"auto"} fontSize="16px">
                  <Box m={"16px 0"}>
                    Số lượng:{" "}
                    <span style={{ color: "#28a745", fontWeight: "700" }}>
                      {props?.count}
                    </span>
                  </Box>
                  <Box m={"16px 0"}>
                    Đơn giá:{" "}
                    <span style={{ color: "#28a745", fontWeight: "700" }}>
                      {props?.item?.gia}
                    </span>
                  </Box>
                  <Box m={"16px 0"}>
                    Phí ship:{" "}
                    <span style={{ color: "#28a745", fontWeight: "700" }}>
                      {props?.item?.ship ? props?.item?.ship : "Miễn phí"}
                    </span>
                  </Box>
                  <Box m={"18px 0"}>
                    Tổng giá:{" "}
                    <span
                      style={{
                        color: "#fe6433",
                        fontWeight: "700",
                        fontSize: "30px",
                      }}
                    >
                      {props?.item?.gia * props?.count}
                    </span>
                  </Box>
                </Box>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Thêm vào giỏ hàng
              </Button>
              <Button onClick={onClose}>Huỷ</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

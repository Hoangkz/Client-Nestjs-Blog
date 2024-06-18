import {
  Box,
  Flex,
  List,
  ListItem,
  Icon,
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  Image,
} from "@chakra-ui/react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import searchSlice from "../../../components/search";
import shopApi from "../../../API/itemApi";
import authSlice from '../../../components/auth';
import { tokenRemainingSelector } from "../../../redux/selectors";
import { toast } from "react-toastify";
import authApi from "../../../API/authApi";

export default function Header(props) {


  const [search, setSearch] = useState("");
  const isLogined = useSelector(tokenRemainingSelector).checkLogin;
  const [dataItem, setDataItem] = useState([]);
  const [checkdataItem, setCheckDataItem] = useState(false);
  const handleChangeInput = (e) => {
    setSearch(e.target.value);
  };
  const userName = props.username
  const myElementRef = useRef(null);
  function handleClickFormSearch() {
    return myElementRef.current?.getBoundingClientRect() || 0;
  }

  const handleClickLink = (e) => {
    setCheckDataItem(false)
  };

  useEffect(() => {
    function handleClick(event) {
      const x = event.clientX;
      const y = event.clientY;
      const rect = handleClickFormSearch();
      if (rect) {
        if (
          (x > rect.x && y < rect.y) ||
          (x < rect.x && y > rect.y) ||
          (x > rect.x && y > rect.y)
        ) {
          setCheckDataItem(false)
        }
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (search.trim()) {
          const res = await shopApi.searchClient(search.trim());
          setDataItem(res.data.items);
          setCheckDataItem(true)
        } else {
          setDataItem([]);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [search]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickLogOut = (e) => {
    authApi.logout()
      .then((response) => {
        toast.success(response.data.message);
        dispatch(authSlice.actions.logout());
        localStorage.setItem("token", "null");
        localStorage.setItem("refresh_token", "null");
        localStorage.setItem("user", "null");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
  };
  const location = useLocation();
  const handleClickButton = (e) => {
    dispatch(searchSlice.actions.searchFilterChange(search));
    if (location.pathname !== "/search") {
      navigate("/search");
    }
  };
  const locationHref = location.pathname === "/" ? null : `?next-page=${location.pathname}`

  const role = userName?.role;
  return (
    <>
      <Box
        position={"fixed"}
        w="100%"
        zIndex={1}
        background={"linear-gradient(0, #fe6433, #f53e2d);"}
      >
        <Box w="75%" margin="auto" fontSize={14}>
          <Flex justify={"space-between"}>
            <List style={{ display: "flex" }} margin="0" padding={0}>
              <ListItem margin="8px" className="navItem">
                <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                  Home
                </Link>
              </ListItem>
              <ListItem className="navItem" margin="8px">
                <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                  Tải ứng dụng
                </Link>
              </ListItem>
              <ListItem margin="8px" color="#fff" cursor={"inherit"}>
                Kết nối
              </ListItem>
              <ListItem className="navItem" color="#fff" fontSize="20px">
                <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                  <Icon as={FaFacebook} />
                </Link>
              </ListItem>
              <ListItem className="navItem" color="#fff" fontSize="20px">
                <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                  <Icon as={FaGoogle} />
                </Link>
              </ListItem>
            </List>
            <List style={{ display: "flex" }} margin="0" padding={0}>
              <ListItem className="navItem" margin="8px">
                <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                  Thông báo
                </Link>
              </ListItem>
              <ListItem className="navItem" margin="8px">
                <Link
                  to="tel:0968823201"
                  target={"_blank"}
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Hỗ trợ
                </Link>
              </ListItem>
              {!isLogined && !userName ? (
                <>
                  <ListItem className="navItem" margin="8px">
                    <a
                      href="/auth/signup"
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      Đăng ký
                    </a>
                  </ListItem>
                  <ListItem className="navItem" margin="8px">
                    <a
                      href={`/auth/login${locationHref ? locationHref : ""}`}
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      Đăng nhập
                    </a>
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem className="navItem" margin="8px"></ListItem>
                  <ListItem margin="8px" position={"relative"}>
                    <Popover>
                      <PopoverTrigger>
                        <Button mt={"-5px"} fontSize="18px"
                          variant={"link"}
                          _hover={{ textDecoration: "none", opacity: "0.6" }}
                          color="#fff"
                        >
                          {userName?.username?.charAt(0)?.toUpperCase() + userName?.username?.slice(1)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent w={"220px"}>
                        <PopoverArrow />
                        <List>
                          <ListItem className="navItem_hover">
                            <Link
                              to="/auth/user"
                              style={{
                                display: "block",
                                color: "black",
                                fontSize: "1rem",
                              }}
                            >
                              <PopoverHeader>Tài khoản</PopoverHeader>
                            </Link>
                          </ListItem>
                          {role === 1 ? (
                            <>
                              <ListItem className="navItem_hover">
                                <Link
                                  to="/carts"
                                  style={{
                                    display: "block",
                                    color: "black",
                                    fontSize: "1rem",
                                  }}
                                >
                                  <PopoverHeader p={"12px 16px"}>
                                    Giỏ hàng của tôi
                                  </PopoverHeader>
                                </Link>
                              </ListItem>
                              <ListItem className="navItem_hover">
                                <Link
                                  to="/carts-order"
                                  style={{
                                    display: "block",
                                    color: "black",
                                    fontSize: "1rem",
                                  }}
                                >
                                  <PopoverHeader p={"12px 16px"}>
                                    Đơn hàng của tôi
                                  </PopoverHeader>
                                </Link>
                              </ListItem>
                            </>
                          ) : role === 2 ? (
                            <ListItem className="navItem_hover">
                              <Link
                                to="/admin/list-cart-order"
                                style={{
                                  display: "block",
                                  color: "black",
                                  fontSize: "1rem",
                                }}
                              >
                                <PopoverHeader p={"12px 16px"}>
                                  Quản lý đơn hàng
                                </PopoverHeader>
                              </Link>
                            </ListItem>
                          ) : role === 3 ? (
                            <>
                              <ListItem className="navItem_hover">
                                <Link
                                  to="/admin/list-cart-order"
                                  style={{
                                    display: "block",
                                    color: "black",
                                    fontSize: "1rem",
                                  }}
                                >
                                  <PopoverHeader p={"12px 16px"}>
                                    Quản lý đơn hàng
                                  </PopoverHeader>
                                </Link>
                              </ListItem>
                              <ListItem className="navItem_hover">
                                <Link
                                  to="/admin/list-user"
                                  style={{
                                    display: "block",
                                    color: "black",
                                    fontSize: "1rem",
                                  }}
                                >
                                  <PopoverHeader p={"12px 16px"}>
                                    Danh sách Account
                                  </PopoverHeader>
                                </Link>
                              </ListItem>
                              <ListItem className="navItem_hover">
                                <Link
                                  to="/admin/list-item"
                                  style={{
                                    display: "block",
                                    color: "black",
                                    fontSize: "1rem",
                                  }}
                                >
                                  <PopoverHeader p={"12px 16px"}>
                                    Danh sách sản phẩm
                                  </PopoverHeader>
                                </Link>
                              </ListItem>
                            </>
                          ) : null}
                          <ListItem className="navItem_hover" cursor={"pointer"}>
                            <Box
                              style={{
                                display: "block",
                                color: "black",
                                fontSize: "1rem",
                              }}
                              onClick={handleClickLogOut}
                            >
                              <PopoverHeader p={"12px 16px"}>
                                Đăng xuất
                              </PopoverHeader>
                            </Box>
                          </ListItem>
                        </List>
                      </PopoverContent>
                    </Popover>
                  </ListItem>
                </>
              )}
            </List>
          </Flex>
        </Box>
        <Box w="80%" margin="auto" mt={4} pb={0}>
          <Flex justify={"space-between"}>
            <Box fontSize="2.5rem" color="#fff" position="relative">
              <Link to={"/"} style={{ color: "#fff" }} className="navItem">
                <Icon as={BsFillBagCheckFill} mt="-15px" bg="" color="#fff" />
                Dalziel
              </Link>
            </Box>
            <Box w="75%">
              <Flex>
                <Input
                  onChange={handleChangeInput}
                  // ref={inputRef}
                  w="75%"
                  placeholder="Search"
                  outline="none"
                  backgroundColor={"#fff"}
                  tabIndex="2"
                />
                {search.length > 0 && checkdataItem ? (
                  <Box
                    ref={myElementRef}
                    onClick={handleClickFormSearch}
                    position={"fixed"}
                    backgroundColor="white"
                    overflow={"scroll"}
                    w="45%"
                    maxH={400}
                    top="100"
                  >
                    <Box p={"10px 18px"} backgroundColor="#ddd">
                      Từ khoá tìm kiếm "{search}"
                    </Box>
                    <List>
                      <ListItem>
                        {dataItem
                          ? dataItem?.map((data, index) => {
                            return (
                              <Link
                                key={index}
                                onClick={handleClickLink}
                                tabIndex="100"
                                to={`/items/${data?.name}`}
                              >
                                <Box
                                  _hover={{
                                    backgroundColor: "#fafaf8",
                                    color: "black",
                                    border: "1px solid #b3b2b2",
                                  }}
                                  style={{
                                    display: "flex",
                                    padding: "12px 15px",
                                  }}
                                >
                                  <Image
                                    src={data?.img}
                                    alt={data?.name}
                                    style={{ width: "60px" }}
                                  />
                                  <Box
                                    _hover={{ color: "black" }}
                                    m={"auto 16px"}
                                  >
                                    {data?.name}
                                  </Box>
                                </Box>
                              </Link>
                            );
                          })
                          : null}
                      </ListItem>
                    </List>
                  </Box>
                ) : null}
                <Button
                  onClick={handleClickButton}
                  mx={4}
                  backgroundColor="transparent"
                  color="#fff"
                  variant="outline"
                  _hover={{ backgroundColor: "#f53e2d" }}
                >
                  Search
                </Button>
              </Flex>
            </Box>
            <Link to={"/carts"}>
              <Box fontSize="2.5rem" color="#fff" className="navItem">
                <Icon as={AiOutlineShoppingCart} />
              </Box>
            </Link>
          </Flex>
        </Box>
        <Box h={4}></Box>
      </Box>
    </>
  );
}

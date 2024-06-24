import Header from "./header";
import Footer from "./footer";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { tokenRemainingSelector } from "../../redux/selectors";
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";
import axiosClient from "../../API/axiosClient";
import authSlice from '../../components/auth';
import { useLocation, useNavigate } from "react-router-dom";


export default function Default({ children }) {
    const dispatch = useDispatch();
    const token = useSelector(tokenRemainingSelector)?.token || null;
    const userName = useSelector(tokenRemainingSelector)?.user || null;
    const location = useLocation();
    const navigate = useNavigate();

    const locationHref = location.pathname === "/" ? null : `?next-page=${location.pathname}`
    if (token) {
        const decoded = jwt_decode(token);
        if (decoded.exp < Date.now() / 1000) {
            axiosClient.post('/auth/refresh-token', { id: userName?.id })
                .then(response => {
                    const new_token = response.data.token;
                    localStorage.setItem("token", new_token);
                    const decoded = jwt_decode(new_token);
                    const dataUser = JSON.stringify(decoded)
                    const userNewToken = JSON.parse(dataUser)

                    localStorage.setItem("user", dataUser);
                    dispatch(authSlice.actions.login({ checkLogin: true, user: userNewToken, token: new_token }));
                })
                .catch(async error => {
                    localStorage.setItem("token", "null");
                    localStorage.setItem("user", "null");
                    dispatch(authSlice.actions.login({ checkLogin: false, user: null, token: null }));
                    console.log("error: " + error)
                    toast.warning(error.response?.data.message);
                    navigate(`/auth/login${locationHref ? locationHref : ''}`);

                })
        }
    }
    return (
        <Box>
            <Header username={userName} />
            <Box backgroundColor="antiquewhite" pt={170}>
                {children}
            </Box>
            <Box backgroundColor="antiquewhite" pt={50} ></Box>
            <Footer />
        </Box>
    )

}
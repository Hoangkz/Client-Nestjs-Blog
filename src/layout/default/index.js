import Header from "./header";
import Footer from "./footer";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { tokenRemainingSelector } from "../../redux/selectors";
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";
import axiosClient from "../../API/axiosClient";
import authSlice from '../../components/auth';


export default function Default({ children }) {
    const dispatch = useDispatch();
    const token = useSelector(tokenRemainingSelector)?.token||null;
    const refresh_token = useSelector(tokenRemainingSelector)?.refresh_token||null;
    const userName = useSelector(tokenRemainingSelector)?.user||null;
    if(token) {
        const decoded = jwt_decode(token);
        if (decoded.exp < Date.now() / 1000) {
            axiosClient.post('/auth/refresh-token', { refresh_token: refresh_token })
                .then(response => {
                    const new_token = response.data.token;
                    localStorage.setItem("refresh_token", refresh_token);
                    const decoded = jwt_decode(token);
                    const dataUser = JSON.stringify(decoded.data)
                    const userNewToken = JSON.parse(dataUser)
                    // console.log(decoded);
                    localStorage.setItem("user", dataUser);
                    localStorage.setItem('token', new_token);
                    dispatch(authSlice.actions.login({ checkLogin: true, user: userNewToken, token: new_token, refresh_token: refresh_token }));
                })
                .catch(error => {
                    localStorage.setItem("token", "null");
                    localStorage.setItem("refresh_token", "null");
                    localStorage.setItem("user", "null");        
                    dispatch(authSlice.actions.login({ checkLogin: false, user: null, token: null, refresh_token: null }));
                    toast.warning(error.response.data.message);
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
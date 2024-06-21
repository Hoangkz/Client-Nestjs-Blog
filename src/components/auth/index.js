import { createSlice } from "@reduxjs/toolkit"

let token = localStorage.getItem("token") || null
let user = JSON.parse(localStorage.getItem("user")) || null
if (token === "null" || token === "undefined") {
    token = null
}


if (user === "null" || user === "undefined") {
    user = null
}

let checkLogin = false
if (token && user) {
    checkLogin = true
}
export default createSlice({
    // name
    name: 'auth',
    // biến khởi tạo
    initialState: {
        checkLogin: checkLogin,
        user: user,
        token: token,
    },
    // các action thực hiện
    reducers: {

        login: (state, action) => {
            // xử lý trả dữ liệu
            // console.log(action)
            state.checkLogin = action.payload.checkLogin
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logout: (state, action) => {
            state.checkLogin = false
            state.user = null
            state.token = null
        }
    }
})
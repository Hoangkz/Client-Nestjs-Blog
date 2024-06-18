import { createSlice } from "@reduxjs/toolkit"
export default createSlice({
    // name
    name: 'searchHeader',
    // biến khởi tạo
    initialState:{
        search:""
    },
    // các action thực hiện
    reducers:{
        searchFilterChange:(state, action)=>{
            // xử lý trả dữ liệu
            state.search = action.payload
        },
    }
})
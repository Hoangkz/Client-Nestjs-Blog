import { createSlice } from "@reduxjs/toolkit"

export default createSlice({
    // name
    name: 'filters',
    // biến khởi tạo
    initialState:{
        search:"",
        status:"All",
        priorities:[]
    },
    // các action thực hiện
    reducers:{
        searchFilterChange:(state, action)=>{
            // xử lý trả dữ liệu
            state.search = action.payload
        },
        statusFilterChange:(state, action)=>{
            state.status = action.payload
        },
        prioritiesFilterChange:(state, action)=>{
            state.priorities = action.payload
        },
        searchTextHeaderAction:(state, action)=>{
            state.search = action.payload
        },
    }
})
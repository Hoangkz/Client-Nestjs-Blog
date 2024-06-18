import { createSlice } from "@reduxjs/toolkit"

export default createSlice({
    // name
    name: 'update_items',
    // biến khởi tạo
    initialState:{
        items:null
    },
    // các action thực hiện
    reducers:{
        update:(state, action)=>{
            state.items = action.payload
        }
    }
})
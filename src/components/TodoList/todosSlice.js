import { createSlice } from "@reduxjs/toolkit"

export default createSlice({
    // name
    name: 'todoList',
    // biến khởi tạo
    initialState:[
        {id:1,name:"Learn Yoga", completed:false,priority:"Medium"},
        {id:2,name:"Learn Java", completed:true,priority:"High"},
        {id:3,name:"Learn JavaScript", completed:false,priority:"Low"},
    ],
    // các action thực hiện
    reducers:{
        addTodo:(state, action)=>{
            // xử lý trả dữ liệu
            state.push(action.payload);
        },
        toggleTodoStatus:(state, action)=>{
            // xử lý trả dữ liệu
            const currentTodo = state.find(todo=>todo.id === action.payload)
            currentTodo.completed=!currentTodo.completed;
        }
    }
})
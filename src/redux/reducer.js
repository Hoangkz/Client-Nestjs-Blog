// initState là giá trị mặc định
const initState ={
    filter:{
        search: ""
    }
}
const roothReducer = (state = initState, action)=>{
//    xử lý
    switch(action.type){
        case "search/todoList":
            return {
                ...state,
                filter:{
                    ...state.filter,
                    search:action.payload
                },
            }
        default:
            return state
    }
}

export default roothReducer
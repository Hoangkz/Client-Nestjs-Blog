
import { configureStore } from "@reduxjs/toolkit";
import filtersSlice from "../components/Filters/filtersSlice";
import todosSlice from "../components/TodoList/todosSlice";
import searchSlice from "../components/search";
import authSlice from "../components/auth";
import updateItemsSlice from "../components/update_items";
 
export default configureStore({
    reducer: {
        filters: filtersSlice.reducer,
        todoList: todosSlice.reducer,
        searchHeader:searchSlice.reducer,
        authSlice:authSlice.reducer,
        updateItemsSlice:updateItemsSlice.reducer,
    }
})


// các dùng
// tạo một components import nó vào store
// lưu ý name của actions
// name của actions là biến trả về bên selectors

// dispatch(searchSlice.actions.searchFilterChange(search)) ===> đưa dữ liệu vào
// export const searchHeaderSelector = (state)=>state.searchHeader.search ==> lấy dữ liệu ra
// searchHeader là tên của actions, search là biến lưu trữ




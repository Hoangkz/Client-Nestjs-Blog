import { createSelector } from "@reduxjs/toolkit";
export const searchTextSelector = (state)=>state.filters.search;
export const checkAccountSelector = (state)=>state.authSlice.checkLogin;
export const userSelector = (state)=>state.authSlice.user;
export const TokenSelector = (state)=>state.authSlice.token;
export const refresh_tokenSelector = (state)=>state.authSlice.refresh_token;
export const searchHeaderSelector = (state)=>state.searchHeader.search;
export const filterStatusSelector = (state)=>state.filters.status;
export const filterPrioritiesSelector = (state)=>state.filters.priorities;
export const todoListSelector = (state)=>state.todoList;
export const todosRemainingSelector = createSelector(
    todoListSelector,
    filterStatusSelector,
    searchTextSelector,
    filterPrioritiesSelector,
    (todoList, status, searchText,priorities)=>{
        return todoList.filter((todo)=>{
            if(status ==="All"){
                return priorities.length?todo.name.includes(searchText) && priorities.includes(todo.priority):todo.name.includes(searchText);
            }
            
            return todo.name.includes(searchText) && (status==="Completed"?todo.completed:!todo.completed)&& (priorities.length? priorities.includes(todo.priority):true);
        })}
    )

export const tokenRemainingSelector = createSelector(
    checkAccountSelector,
    userSelector,
    TokenSelector,
    refresh_tokenSelector,
    (checkLogin,user,token,refresh_token)=>{
        return {
            checkLogin,user,token,refresh_token
        }}
    )
export const updateItemsSelector = (state)=>state.updateItemsSlice.items;

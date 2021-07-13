import { createSlice } from "@reduxjs/toolkit";


const isAdminReducer =  createSlice({
    name : 'isAdmin',
    initialState: false,
    reducers:{
        isAdmin : (state ,  payload)=>{
            console.log('haha');
            return true
        },
        isUser : (state , payload)=>{
            return false
        }
    }
})

const { actions  , reducer } = isAdminReducer;

export const { isAdmin , isUser } = actions;

export default reducer;
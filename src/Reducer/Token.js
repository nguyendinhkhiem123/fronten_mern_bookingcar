import { createSlice } from "@reduxjs/toolkit";


const isAdminReducer =  createSlice({
    name : 'token',
    initialState: false,
    reducers:{
        addToken : ( state , payload )=>{
            console.log('action' , state);
           return true
        },
        removeToken : (state , payload )=>{
          return false
        }
    }
})

const { actions  , reducer } = isAdminReducer;

export const { addToken ,  removeToken } = actions;

export default reducer;
import { createSlice } from "@reduxjs/toolkit";


const currentUser =  createSlice({
    name : 'currentUser',
    initialState: {},
    reducers:{
        addUser : ( state , action )=>{
           console.log(action);
           return action.payload;
        },
        removeUser : (state , action )=>{
          return {}
        }
    }
})

const { actions  , reducer } = currentUser;

export const { addUser ,  removeUser} = actions;

export default reducer;
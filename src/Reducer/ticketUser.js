import { createSlice } from "@reduxjs/toolkit";



const ticketUser =  createSlice({
    name : 'ticketUser',
    initialState: [],
    reducers:{
        addTicket : ( state , action )=>{ 
           return action.payload;
        },
        removeOneTicket : (state , action)=>{
            let b = state.filter(value=>{
               return value._id !== action.payload
            });
            return b;
        },
        defaultTicket : (state , action )=>{
          return [];
        }
    }
})

const { actions  , reducer } = ticketUser;

export const { addTicket ,  removeOneTicket , defaultTicket } = actions;

export default reducer;
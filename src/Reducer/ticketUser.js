import { createSlice } from "@reduxjs/toolkit";


const ticketUser =  createSlice({
    name : 'ticketUser',
    initialState: [],
    reducers:{
        addTicket : ( state , action )=>{
    
           return action.payload;
        },
        removeOneTicket : (state , action)=>{
            let list = [...state]     
            return list.filter((value)=>{
                return value._id !== action.payload
            })
        },
        defaultTicket : (state , action )=>{
          return [];
        }
    }
})

const { actions  , reducer } = ticketUser;

export const { addTicket ,  removeOneTicket , defaultTicket } = actions;

export default reducer;
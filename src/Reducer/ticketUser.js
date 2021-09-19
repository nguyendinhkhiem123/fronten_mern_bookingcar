import { createSlice } from "@reduxjs/toolkit";



const ticketUser =  createSlice({
    name : 'ticketUser',
    initialState: [],
    reducers:{
        addTicket : ( state , action )=>{ 
           return action.payload;
        },
        removeOneTicket : (state , action)=>{
            let i;

            for(i = 0 ; i < state.length ; i++){
                if(state[i]._id === action.payload) break;
            }
            console.log(i);
            state[i].trangthaive = 'DAHUY';
        },
        defaultTicket : (state , action )=>{
          return [];
        }
    }
})

const { actions  , reducer } = ticketUser;

export const { addTicket ,  removeOneTicket , defaultTicket } = actions;

export default reducer;
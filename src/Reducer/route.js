import { createSlice } from "@reduxjs/toolkit";


const route =  createSlice({
    name : 'route',
    initialState: [],
    reducers:{
        addRoute : ( state , action )=>{
            
           return action.payload;
        },
        removeRoute : (state , action )=>{
          return []
        }
    }
})

const { actions  , reducer } = route;

export const { addRoute ,  removeRoute} = actions;

export default reducer;
import { createSlice } from "@reduxjs/toolkit";


const route =  createSlice({
    name : 'route',
    initialState: [],
    reducers:{
        addRoute : ( state , action )=>{
            
           return action.payload;
        },
        changeStatus : ( state , action)=>{
            console.log(action);
            let indexOne , indexTwo = -1; 
           
            state.forEach((value, ind)=>{
              if(value._id === action.payload.chuyendi) indexOne = ind
            });
            state.forEach((value, ind)=>{
              if(value._id === action.payload.chuyenve) indexTwo = ind
            });
            state[indexOne].trangthai = action.payload.trangthai;
            state[indexTwo].trangthai = action.payload.trangthai;
        },
        addNewRoute : (state , action)=>{
            state.push(action.payload.newRoute);
            state.push(action.payload.newRouteRes);
        },
        updateRoute : (state , action)=>{
            console.log(action.payload);
            let i , j = -1 ;
            const bodyOne = {
              _id :  action.payload.chuyendi,
              matuyen : action.payload.value.matuyen,
              noidi :  action.payload.value.noidi ,
              noiden :  action.payload.value.noiden ,
              quangduong :  action.payload.value.quangduong,
              thoigian :   action.payload.value.thoigian,
              trangthai : action.payload.value.trangthai,
              hinhanh :  action.payload.value.hinhanh ? action.payload.value.hinhanh   : ''
            }
            const bodyTwo = {
              _id :  action.payload.chuyenve,
              matuyen : action.payload.value.matuyen,
              noidi :  action.payload.value.noiden ,
              noiden :  action.payload.value.noidi ,
              quangduong :  action.payload.value.quangduong,
              thoigian :   action.payload.value.thoigian,
              trangthai : action.payload.value.trangthai,
              hinhanh :  action.payload.value.hinhanh ? action.payload.value.hinhanh   : ''
            }
            i = findIndex(state ,action.payload.chuyendi);
            j = findIndex(state ,action.payload.chuyenve);
            console.log(i , j)
            state[i] = bodyOne ;
            state[j] = bodyTwo;
        },
        removeRoute : (state , action )=>{
             const list = [...state];

             const newList = list.filter(value =>{
                return (value._id !== action.payload.idOne) 
             })

             const resultList = newList.filter(value =>{
              return (value._id !== action.payload.idTwo) 
            })
             return resultList
        },
        removeRouteList : (action , payload)=>{
          return [];
        }
    }
})
const findIndex = (state , id)=>{

  for(let j = 0 ; j < state.length ; j++){
    if(state[j]._id === id) return j;
  }
  return -1;
}
const { actions  , reducer } = route;

export const { addRoute ,  removeRoute , changeStatus , addNewRoute , updateRoute ,removeRouteList} = actions;

export default reducer;
import { createSlice } from "@reduxjs/toolkit";


const car =  createSlice({
    name : 'car',
    initialState: [],
    reducers:{
        addCar : ( state , action )=>{
            
           return action.payload;
        },
        changeStatus : ( state , action)=>{
            console.log(action);
            let indexOne 
           
            state.forEach((value, ind)=>{
              if(value._id === action.payload.id) indexOne = ind
            });
           
            state[indexOne].trangthai = action.payload.trangthai;
        },
        addNewCar : (state , action)=>{
            state.push(action.payload.values);
        },
        updateCar : (state , action)=>{
            let i = -1; 
            const body = {
                _id : action.payload.id,
                biensoxe : action.payload.biensoxe,
                trangthai : action.payload.trangthai,
                soluongghe : action.payload.soluongghe,
                hinhanh : action.payload.hinhanh? action.payload.hinhanh : ''
            }
            i = findIndex(state , action.payload.id);
            state[i] = body
        },
        removeCar : (state , action )=>{
          const listNew =  state.filter(value =>{
            return value._id !== action.payload
          })
          return listNew
        },
        removeCarList : (state , action)=>{
          return []
        }
    }
})
const findIndex = (state , id)=>{

  for(let j = 0 ; j < state.length ; j++){
    if(state[j]._id === id) return j;
  }
  return -1;
}
const { actions  , reducer } = car;

export const { addCar,  removeCar, changeStatus , addNewCar, updateCar , removeCarList } = actions;

export default reducer;
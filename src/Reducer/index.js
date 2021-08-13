
import { configureStore , combineReducers} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

import isAdmin from './isAdminReducer';
import token from './Token'
import currentUser from './currentUser';
import route from './route';
import listTicket from './ticketUser'
import car from './car'
// const persistConfig = {
//     key: 'root',
//     storage,
    
//   }
const reducer =combineReducers({
    isAdmin,
    token,
    currentUser,
    route,
    listTicket,
    car
})
// const persistedReducer = persistReducer(persistConfig, reducer) 

// const store = configureStore({
//      reducer : persistedReducer
// })
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['isAdmin', 'token','route','currentUser','car','route'] //
}
   
const persistedReducer = persistReducer(persistConfig, reducer)
let store = configureStore({reducer : persistedReducer})
let persistor = persistStore(store)
export default  {
   
    store, persistor 
}
// export const persistor = persistStore(store);
// export default store;
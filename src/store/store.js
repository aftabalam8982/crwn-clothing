//  import { compose, applyMiddleware  } from "redux";
   import { configureStore} from "@reduxjs/toolkit";
 import {persistReducer, persistStore} from 'redux-persist';
 import storage from 'redux-persist/lib/storage'
 import logger from "redux-logger";
 import { rootReducer } from "./root-reducer";
import thunk from "redux-thunk";




 const persistConfig = {
    key:'root',
    storage,
    blackList:['user']
 }

  const persistedReducer = persistReducer(persistConfig,rootReducer);


 const middleWares = [process.env.NODE_ENV ==='development' && logger,thunk].filter(Boolean);  // this statement means if the condition is true then the logger middleware will be true.


 export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }).concat(...middleWares),
    
 })


 export const persistor = persistStore(store);
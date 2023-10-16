// import { fetchCategoriesSuccess } from "./categories.action";
// import { CATEGORIES_ACTION_TYPES } from "./categories.types";

import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    categories:[], 
    isLoading: false,  
    error : null,
};

export const categoriesSlice = createSlice({
   name: 'categories',
   initialState: INITIAL_STATE,
   reducers:{
       fetchCategoriesStart(state, action){
         state.isLoading=true;
         state.error = null;
       },
       fetchCategoriesSuccess(state, action){
          state.categories = action.payload;
          state.isLoading=false;
          state.error = null;
       },
       fetchCategoriesFailed(state, action){
         state.isLoading=false;
         state.error = action.payload;
       }
   },
});

export const {fetchCategoriesStart,fetchCategoriesSuccess,fetchCategoriesFailed} = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;

// export const categoriesReducer = (state = INITIAL_STATE, action) =>{
//    const {type, payload} = action;
//    switch(type){
//       case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
//          return{
//             ...state, isLoading:true, error:null,
//          }
//      case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
//         return{
//            ...state,
//            categories:payload,
//            isLoading:false,
//            error:null,
//         }
//      case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
//       return{
//          ...state, error:payload, isLoading:false,
//       }   
//         default:
//          return state;
//    }
// };
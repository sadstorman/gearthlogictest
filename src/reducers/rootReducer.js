import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./authReducer";
import { productReducer } from "./productReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    products: productReducer,
    ui: uiReducer
})
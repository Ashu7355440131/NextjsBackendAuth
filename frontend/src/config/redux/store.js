/*
step for state management
submit action
handle action and its reducer
register in store Reducer
*/

import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducer/authReducer"


export const store=configureStore({
    reducer:{
        auth:authReducer
    }
})
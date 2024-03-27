import {combineReducers, configureStore} from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice.ts";
import chatReducer from "./slices/chatSlice.ts";
import messagesReducer from "./slices/messageSlice.ts"
import authReducer from "./slices/authSlice.ts";
import {socialAppApi} from "../services/socialAppService.ts";
const rootReducer = combineReducers({
    modalReducer,
    chatReducer,
    messagesReducer,
    authReducer,
    [socialAppApi.reducerPath]: socialAppApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(socialAppApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']